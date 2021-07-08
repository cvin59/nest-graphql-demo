import { PetsModule } from './../pets/pets.module';
import { Owner } from 'src/owners/entities/owner.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersResolver } from './owners.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Owner]), forwardRef(() => PetsModule)],
  providers: [OwnersResolver, OwnersService],
  exports: [OwnersService],
})
export class OwnersModule {}
