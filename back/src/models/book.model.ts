import { Entity, model, property } from '@loopback/repository'

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

  @property({
    type: 'number', 
    required: true,
  })
  userId: number; 

  constructor(data?: Partial<Book>) {
    super(data);
  }
}
export interface BookRelations {
  // describe navigational properties here
}