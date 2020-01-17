// Uncomment these imports to begin using these cool features!
// import {inject} from '@loopback/context';
import { get, post, getModelSchemaRef, requestBody, HttpErrors } from '@loopback/rest';
import { UserRepository } from '../repositories';
import { repository } from '@loopback/repository';
import { User } from '../models';
import { threadId } from 'worker_threads';


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
              phonenumber: { type: 'string', example: '12345' },
              password: { type: 'string', example: 'password' },
            },
            required: ['name', 'phonenumber', 'password'],
          }
        }
      }
    }) user: User): Promise<String> {

    try {
      let existsUser = await this.userRepository.findOne({ where: { name: user.name, password: user.password } })

      if (existsUser) {
        throw new HttpErrors.BadRequest('user already registered')
      }

      await this.userRepository.create(user)
    }
    catch (error) {
      throw new HttpErrors.BadRequest('user already registered')
    }

    return ''
  }


  @post('/userlogin', {
    responses: {
      '200': {
        description: 'User model instance',
        content: { 'application/json': { schema: getModelSchemaRef(User) } },
      },
    },
  })
  async login(
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

    try {
      let existsUser = await this.userRepository.findOne({ where: { name: user.name, password: user.password } })

      if (!existsUser) {
        throw new HttpErrors.BadRequest('user already registered')
      }

      // await this.userRepository.create(user)
    }
    catch (error) {
      throw new HttpErrors.BadRequest('user already registered')
    }

    return ''
  }


}
