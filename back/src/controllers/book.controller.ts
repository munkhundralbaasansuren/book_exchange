// Uncomment these imports to begin using these cool features!
// import {inject} from '@loopback/context';
import { get, post, getModelSchemaRef, requestBody, param } from '@loopback/rest';
import { BookRepository } from '../repositories';
import { repository, Filter } from '@loopback/repository';
import { Book } from '../models';

export class BookController {
  constructor(
    @repository(BookRepository)
    public bookRepository: BookRepository,
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
            },
            required: ['name', 'ISBN', 'bookvol', 'bookauthor'],
          }
        }
      }
    }) book: Book): Promise<String> {
    this.bookRepository.create(book);
    return ""
  }

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
    return this.bookRepository.find(filter);
  }

}
