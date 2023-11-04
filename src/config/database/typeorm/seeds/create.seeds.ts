import { Seeder, Factory } from 'typeorm-seeding';
import { Business } from 'src/modules/business/entities/business.entity';
import { Account } from 'src/modules/account/entities/account.entity';

export class CreateBusinessAndAccount implements Seeder {
  async run(factory: Factory): Promise<any> {
    await await factory(Business)()
      .map(async (business: Business) => {
        const accounts = await factory(Account)().createMany(2);
        business.departmentHeads = accounts;
        return business;
      })
      .createMany(2);
  }
}
