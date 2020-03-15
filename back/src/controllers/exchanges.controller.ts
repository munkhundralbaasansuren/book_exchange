import { repository } from "@loopback/repository";
import { ExchangesRepository, UserRepository, BookRepository } from "../repositories";
import { Exchanges, Book } from "../models";
import { getModelSchemaRef, post, requestBody, get, HttpErrors } from "@loopback/rest";


export class ExchangesController {
  constructor(
    @repository(ExchangesRepository)
    public exchangesRepository: ExchangesRepository,
    @repository(BookRepository)
    public bookRepository: BookRepository, 
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @post('/exchanges', {
    responses: {
      '200': {
        description: 'exchanges model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Exchanges) } },
      },
    },
  })
  async createExchanges(
    @requestBody({
      description: 'Get accessToken and refreshToken',
      content: {
        'application/json': {
          schema: {
            type: 'object', properties: {
              userId: { type: 'number' },
              bookId: { type: 'number', },
              // status: { type: 'string', },
            },
            required: ['userId', 'bookId'],
          }
        }
      }
    }) exchanges: Exchanges): Promise<String> {
    
      try {
        let bookExchan = await this.exchangesRepository.findOne({ where: { userId: exchanges.userId, bookId: exchanges.bookId } })
  
        if (!bookExchan) {
          await this.exchangesRepository.create(exchanges)
        }
      }
      catch (error) {
        console.log(error)
      }
      return ''  
  }

  @post('/exchanges_data', {
    responses: {
      '200': {
        description: 'exchanges model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Exchanges) } },
      },
    },

  })
  async getExchanges(@requestBody({
    description: 'Get accessToken and refreshToken',
    content: {
      'application/json': {
        schema: {
          type: 'object', properties: {
            userId: { type: 'number' },
          },
          required: ['userId'],
        }
      }
    }
  }) exchange: Exchanges): Promise<Book[]>{
    let bookIds: number[] = [];
    let books:Book[] = [];
    // console.log("USERID ::" + userId)
    let exchangebooks: Exchanges[] = await this.exchangesRepository.find({where: {userId: exchange.userId}})
    if (exchangebooks.length != 0) {
      for (let exchangebook of exchangebooks) {
        bookIds.push(exchangebook.bookId)
      }
      console.log(bookIds)
      books = await this.bookRepository.find({where: {id: {inq: bookIds }}})
    }
    return books;
  }
}
