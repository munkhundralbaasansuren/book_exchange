import { DefaultCrudRepository, repository } from '@loopback/repository';
import { User } from '../models';
import { UserDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { BookRepository } from './book.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id
  > {
  // login: (username: any, password: any, fn: any) => void;
  encrypt(user: User) {
    throw new Error("Method not implemented.");
  }

  constructor(
    @inject('datasources.user') dataSource: UserDataSource,
    @repository.getter('BookRepository')
    getBookRepository: Getter<BookRepository>,
  ) {
    super(User, dataSource);
  }
}
