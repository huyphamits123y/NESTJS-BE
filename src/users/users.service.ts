import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSignUpDto } from './dto/user-signup.dto';
import { hash } from 'bcrypt'
import { UserSignInDto } from './dto/user-signin.dto';
import { compare } from 'bcrypt';
import { config } from 'dotenv';
import { sign } from 'jsonwebtoken';
import { UserUpdateDto } from './dto/user-update.dto';
config();
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) { }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  // async signup(body: any) {
  //   const user = this.usersRepository.create(body);
  //   return await this.usersRepository.save(user)
  // }
  async signup(userSignUpDto: UserSignUpDto): Promise<UserEntity> {
    const userExists = await this.findUserByEmail(userSignUpDto.email)
    if (userExists) throw new BadRequestException('Email is not available.')
    userSignUpDto.password = await hash(userSignUpDto.password, 10)
    let user = this.usersRepository.create(userSignUpDto);
    user = await this.usersRepository.save(user)
    // delete user.password
    return user;
  }
  async signin(userSignInDto: UserSignInDto): Promise<UserEntity> {
    const userExists = await this.findUserByEmail(userSignInDto.email)

    console.log('dsds', userExists)
    
    if (userExists) {
      console.log('userexit', userExists.password);
      console.log('pass', userSignInDto.password)

      const isPasswordValid = await compare(userSignInDto.password, userExists.password);
      if (isPasswordValid) {
        return userExists;
      } else {
        throw new BadRequestException('Password is not correct')
      }
    }
    throw new BadRequestException('Email is not correct')

  }

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async update(id: number, userUpdateDto: UserUpdateDto): Promise<UserEntity> {
    const user = this.findOne(id)
    if (!user) throw new BadRequestException('user not found')
    await this.usersRepository.update(id, {
      name: userUpdateDto.name,
      password: userUpdateDto.password,
    });
    return await this.findOne(id);
  }

  async remove(id: number) {
    const user = this.findOne(id)
    if (!user) throw new BadRequestException('user not found')
    await this.usersRepository.delete(id)
  }
  async findUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });

  }

  async accessToken(user: UserEntity) {
    console.log('Access Token Secret Key:', process.env.ACCESS_TOKEN_SECRET_KEY);
    console.log('Access Token Expiry Time:', process.env.ACCESS_TOKEN_EXPIRE_TIME);

    if (!process.env.ACCESS_TOKEN_SECRET_KEY) {
      throw new Error('Secret key not found'); // Corrected to throw an error if the secret key is not found
    }

    return sign({
      id: user.id,
      email: user.email
    }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME });
  }
}
