import { DefaultCrudRepository } from '@loopback/repository';
import { Book, BookRelations } from '../models';
import { UserDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class BookRepository extends DefaultCrudRepository<
  Book,
  typeof Book.prototype.id,
  BookRelations
  > {
  constructor(
    @inject('datasources.user') dataSource: UserDataSource,
  ) {
    super(Book, dataSource);
  }
}

