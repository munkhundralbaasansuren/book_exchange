import {DefaultCrudRepository} from '@loopback/repository';
import {Exchanges} from '../models';
import {UserDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ExchangesRepository extends DefaultCrudRepository<
  Exchanges,
  typeof Exchanges.prototype.id
> {
  constructor(
    @inject('datasources.user') dataSource: UserDataSource,
  ) {
    super(Exchanges, dataSource);
  }
}


