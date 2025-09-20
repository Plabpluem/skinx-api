import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.prismaService.users.findFirst({
        where: { username: createUserDto.username },
      });
      if (user) {
        throw new Error('มีชื่อผู้ใช้นี้แล้ว');
      }
      const hasedPassword = await bcrypt.hash(createUserDto.password, 10);

      const response = await this.prismaService.users.create({
        data: {
          username: createUserDto.username,
          password: hasedPassword,
        },
      });
      return response;
    } catch (error) {
      throw new HttpException({message:error.message,code:400},400)
    }
  }

  async signin(userDto: CreateUserDto) {
    try {
      const user = await this.prismaService.users.findFirst({
        where: { username: userDto.username },
      });
      if (!user) {
        throw new Error('ไม่เจอ username นี้');
      }

      const passwordMatch = await bcrypt.compare(
        userDto.password,
        user.password,
      );
      if (!passwordMatch) {
        throw new Error('รหัสผ่านไม่ตรงกัน');
      }
      const payload = {
        username: user.username,
        uuid: user.uuid,
      };
      const token = await this.jwtService.signAsync(payload);
      const updateUser = await this.prismaService.users.update({
        where: { uuid: user.uuid },
        data: {
          access_token: token,
        },
      });
      if (!updateUser) {
        throw new Error('ไม่พบข้อมูล user');
      }
      return { ...payload, token };
    } catch (error) {
      throw new HttpException({message:error.message,code:400},400)
    }
  }
}
