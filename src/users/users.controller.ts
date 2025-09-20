import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HelperService } from 'src/helper/helper.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly helperService: HelperService,
  ) {}

  @Post('/sign-up')
  async create(@Body() createUserDto: CreateUserDto) {
    const response = await this.usersService.create(createUserDto);
    return this.helperService.createResponse(response);
  }

  @Post('/sign-in')
  async signIn(@Body() signinDto: SignInDto) {
    const response = await this.usersService.signin(signinDto);
    return this.helperService.createResponse(response);
  }
}
