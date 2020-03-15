import { Entity, model, property} from '@loopback/repository';

@model()
export class User extends Entity {

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true,
    }
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  phonenumber: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}