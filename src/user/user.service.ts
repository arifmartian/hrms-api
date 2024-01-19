import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, gender, role_id } = createUserDto;
    const roleEntity = await this.roleRepository.findOne({ where: { id: role_id } });
    if (!roleEntity) {
      throw new NotFoundException(`Role with ID ${role_id} not found`);
    }
    if (roleEntity) {
      const user: User = new User();
      user.name = name;
      user.email = email;
      user.gender = gender;
      user.role = roleEntity;
      return this.userRepository.save(user);
    }
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['role'] });
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { name, email, gender, role_id } = updateUserDto;
    const roleEntity = await this.roleRepository.findOne({ where: { id: role_id } });
    if (!roleEntity) {
      throw new NotFoundException(`Role with ID ${role_id} not found`);
    }
    if (roleEntity) {
      const user: User = new User();
      user.id = id;
      user.name = name;
      user.email = email;
      user.gender = gender;
      user.role = roleEntity
      return this.userRepository.save(user);
    }
  }

  remove(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }
}
