import { PetsService } from './../pets/pets.service';
import { InjectRepository } from '@nestjs/typeorm';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Repository } from 'typeorm';
import { Owner } from './entities/owner.entity';
import { Pet } from 'src/pets/pets.entity';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner) private ownersRepository: Repository<Owner>,
    @Inject(forwardRef(() => PetsService)) private petsService: PetsService,
  ) {}

  create(createOwnerInput: CreateOwnerInput) {
    const newOwner = this.ownersRepository.create(createOwnerInput);
    return this.ownersRepository.save(newOwner);
  }

  findAll() {
    return this.ownersRepository.find();
  }

  findOne(id: number) {
    return this.ownersRepository.findOneOrFail(id);
  }

  update(id: number, updateOwnerInput: UpdateOwnerInput) {
    return this.ownersRepository.save({ ...updateOwnerInput, id: id });
  }

  remove(id: number) {
    return this.ownersRepository.delete(id);
  }

  getPets(id: number): Promise<Pet[]> {
    return this.petsService.findByOwnerId(id);
  }
}
