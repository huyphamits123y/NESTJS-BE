import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';
import { UserSignInDto } from './dto/user-signin.dto';
import { access } from 'fs';
import { UserUpdateDto } from './dto/user-update.dto';
import { CurrentUser } from 'src/utility/decorators/current-user.decorators';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizeRoles } from 'src/utility/decorators/authorize-roles.decorators';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';
import { Roles } from 'src/utility/common/user-roles.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // @Post('signup')
  // async signup(@Body() userSignUp: UserSignUp) {
  //   return await this.usersService.signup(userSignUp);

  // }
  @Post('signup')
  async signup(@Body() userSignUpDto: UserSignUpDto): Promise<{ user: UserEntity }> {

    return { user: await this.usersService.signup(userSignUpDto) };

  }
  @Post('signin')
  async signin(@Body() userSignInDto: UserSignInDto): Promise<{ user: UserEntity, accessToken: string }> {
    const user = await this.usersService.signin(userSignInDto);
    const accessToken = await this.usersService.accessToken(user);

    return { user, accessToken };
  }
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // return this.usersService.create(createUserDto);
    return 'hi';
  }


  // Kiểm tra xem người dùng có signin chưa và có tồn tại currentUser hay không
  @UseGuards(AuthenticationGuard)
  @Get('profile')
  getProfile(@CurrentUser() currentUser: UserEntity) {
    return currentUser;
  }
  // @AuthorizeRoles(Roles.ADMIN)
  // @UseGuards(AuthenticationGuard, AuthorizeGuard)

  // @AuthorizeRoles(Roles.ADMIN)
  // Kiểm tra có tồn tại currentUser hay không và kiếm tra role của user có trùng với Roles.ADMIN truyền vào
  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Get('all')
  async findAll(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserEntity> {
    return await this.usersService.findOne(id);
  }
 


  @Patch('update/:id')
  async update(@Param('id') id: number, @Body() userUpdateDto: UserUpdateDto) {
    await this.usersService.update(+id, userUpdateDto);
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: number) {
    await this.usersService.remove(id)

  }


}
