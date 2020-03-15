import { get, post, getModelSchemaRef, requestBody, param } from '@loopback/rest';
import { BookRepository, UserRepository } from '../repositories';
import { repository, Filter } from '@loopback/repository';
import { Book } from '../models';

export class BookController {
  constructor(
    @repository(BookRepository)
    public bookRepository: BookRepository,

    @repository(UserRepository)
    public userRepository: UserRepository,

  ) { }

  @post('/books', {
    responses: {
      '200': {
        description: 'book model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Book) } },
      },
    },
  })
  async createBook(
    @requestBody({
      description: 'Get accessToken and refreshToken',
      content: {
        'application/json': {
          schema: {
            type: 'object', properties: {
              name: { type: 'string', example: 'bookIdAddressxxxxxxxxxxx' },
              isbn: { type: 'string', example: '555555555555' },
              bookvol: { type: 'string', example: 'vot 5' },
              bookauthor: { type: 'string', example: 'dorj' },
              userId: {type: 'number'}, 
            },
            required: ['name', 'isbn', 'bookvol', 'bookauthor', 'userId'],
          }
        }
      }
    }) book: Book): Promise<String> {
    this.bookRepository.create(book);  
    return ""  
  }
  // @post('/user/{id}/book')
  // async createOrder(
  //   @param.path.number('id') userId: typeof User.prototype.id,
  //   @requestBody() bookData: Book,
  // ): Promise<Book> {
  //   return this.userRepository.books(userId).create(bookData);
  // }

  @get('/books', {
    responses: {
      '200': {
        description: 'book model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Book) } },
      },
    },

  })
  async getBooks(
    @param.query.string('filter') filter?: Filter<Book>): Promise<Book[]> {
    let books = await this.bookRepository.find({where: {name: {like: '%' + filter + '%'}}})
    console.log(books)
    return books;
  }
}
