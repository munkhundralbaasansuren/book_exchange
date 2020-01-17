import { DefaultCrudRepository, HasManyRepositoryFactory, repository } from '@loopback/repository';
import { User, UserRelations, Book } from '../models';
import { UserDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { BookRepository } from './book.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
  > {
  // login: (username: any, password: any, fn: any) => void;
  encrypt(user: User) {
    throw new Error("Method not implemented.");
  }

  public readonly books: HasManyRepositoryFactory<
    Book,
    typeof User.prototype.id
  >;

  constructor(
    @inject('datasources.user') dataSource: UserDataSource,
    @repository.getter('BookRepository')
    getBookRepository: Getter<BookRepository>,
  ) {
    super(User, dataSource);
    //add this line to register inclusion resolver
    this.books = this.createHasManyRepositoryFactoryFor(
      'books',
      getBookRepository,
    );
    // add this line to register inclusion resolver
    this.registerInclusionResolver('books', this.books.inclusionResolver);
  }
}
