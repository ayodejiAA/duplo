import { Controller, Get } from '@nestjs/common';
import { BusinessService } from './business.service';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get('')
  getBusinessIds() {
    return this.businessService.businessRepository.find({
      select: {
        pkid: false,
        id: true,
        email: true,
        companyName: true,
        createdAt: true,
        firstName: true,
        lastName: true,
      },
    });
  }
}
