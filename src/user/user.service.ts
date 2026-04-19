import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}
  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto)
      await this.userRepository.save(user);
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Error al crear usuario')
    }
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({id})
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no existe`)
    }
    return user;
}

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no existe`)
    }
    try {
      await this.userRepository.save(user)
      return user;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Error al actualizar usuario')
    }
  }

  async remove(id: string) {
    const user = await this.findOne( id );
    await this.userRepository.remove(user)
    return 'Usuario eliminado con exito'
  }
}
