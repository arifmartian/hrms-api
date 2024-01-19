import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) { }

  createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const role: Role = new Role();
    role.name = createRoleDto.name;
    return this.roleRepository.save(role);
  }

  findAllRole(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  findOneRole(id: number): Promise<Role> {
    return this.roleRepository.findOneBy({ id });
  }

  updateRole(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role: Role = new Role();
    role.name = updateRoleDto.name;
    role.id = id;
    return this.roleRepository.save(role);
  }

  removeRole(id: number): Promise<{ affected?: number }> {
    return this.roleRepository.delete(id);
  }
}
