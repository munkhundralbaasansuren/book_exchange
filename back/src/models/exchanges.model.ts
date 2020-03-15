import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Exchanges extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number', 
    bookId: true, 
  })
  bookId: number; 

  @property({
    type: 'number', 
    userId: true, 
  })
  userId: number; 

  // @property({
  //   type: 'string', 
  //   status: true, 
  // })
  // status: string; 

  [prop: string]: any;

  constructor(data?: Partial<Exchanges>) {
    super(data);
  }
}

export interface ExchangesRelations {
  // describe navigational properties here
}

