// Uncomment these imports to begin using these cool features!
// import {inject} from '@loopback/context';
import { get, post, getModelSchemaRef, requestBody } from '@loopback/rest';
import { UserRepository } from '../repositories';
import { repository } from '@loopback/repository';
import { User } from '../models';


export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @post('/users', {
    responses: {
      '200': {
        description: 'User model instance',
        content: { 'application/json': { schema: getModelSchemaRef(User) } },
      },
    },
  })
  async createUser(
    @requestBody({
      description: 'Get accessToken and refreshToken',
      content: {
        'application/json': {
          schema: {
            type: 'object', properties: {
              name: { type: 'string', example: 'userIdAddress' },
              password: { type: 'string', example: 'password' },
            },
            required: ['name', 'password'],
          }
        }
      }
    }) user: User): Promise<String> {
    this.userRepository.create(user);
    return ""
  }

}
