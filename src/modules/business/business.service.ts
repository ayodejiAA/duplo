import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from './entities/business.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    public readonly businessRepository: Repository<Business>,
  ) {}
}
