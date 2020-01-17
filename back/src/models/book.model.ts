import { Entity, model, property, belongsTo } from '@loopback/repository'
import { User } from './user.model';

@model()
export class Book extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  bookvol: string;

  @property({
    type: 'string',
    required: true,
  })
  bookauthor: string;

  @property({
    type: 'string',
    required: true,
  })
  isbn: string;

  @belongsTo(() => User, { name: 'user' })
  UserId: number;

  // @belongsTo(() => User)
  // userId: number;

  constructor(data?: Partial<Book>) {
    super(data);
  }
}

export interface BookRelations {
  // describe navigational properties here
}

export type BookWithRelations = Book & BookRelations;
