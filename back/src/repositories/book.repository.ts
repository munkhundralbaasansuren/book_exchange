import { DefaultCrudRepository, repository, BelongsToAccessor } from '@loopback/repository';
import { Book, BookRelations, User } from '../models';
import { UserDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { UserRepository } from './user.repository';

export class BookRepository extends DefaultCrudRepository<
  Book,
  typeof Book.prototype.id,
  BookRelations
  > {

  public readonly user: BelongsToAccessor<User, typeof Book.prototype.id>;

  constructor(
    @inject('datasources.user') dataSource: UserDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Book, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}

