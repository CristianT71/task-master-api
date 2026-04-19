import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}
  async create(createTaskDto: CreateTaskDto) {
    const { userId, ...taskData } = createTaskDto;

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${userId} no existe`);
    }
    try {
      const task = this.taskRepository.create({
        ...taskData,
        user, //Relacion
      });

    return await this.taskRepository.save(task);
  } catch (error) {
    console.log(error);
    throw new InternalServerErrorException('Error al crear tarea')
    }
  }

  async findAll() {
    return this.taskRepository.find({ relations: ['user'] })
  }

  async findOne(id: string) {
    const task = await this.taskRepository.findOne({ 
      where: { id },
      relations: [ 'user' ]
     })
    if (!task) {
      throw new NotFoundException(`Tarea con id ${id} no existe`)
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.preload({
      id,
      ...updateTaskDto,
    });
    if (!task) {
      throw new NotFoundException(`Tarea con id ${id} no existe`)
    }
    try {
      await this.taskRepository.save(task)
      return task;
    } catch (error){
      console.log(error)
      throw new InternalServerErrorException("Error al actualizar tarea")
    }
  }

  async remove(id: string) {
    const task = await this.findOne( id );
    await this.taskRepository.remove(task)
    return 'Tarea eliminada con exito'
  }
}
