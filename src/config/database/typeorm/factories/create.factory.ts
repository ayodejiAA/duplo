import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import { Business } from 'src/modules/business/entities/business.entity';
import { Account } from 'src/modules/account/entities/account.entity';

define(Business, (faker: typeof Faker) => {
  const business = new Business();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  business.firstName = firstName;
  business.lastName = lastName;
  business.companyName = faker.company.companyName();
  business.address = faker.address.county();
  business.email = faker.internet.email({ firstName, lastName });

  return business;
});

define(Account, (faker: typeof Faker) => {
  const account = new Account();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  account.firstName = firstName;
  account.lastName = lastName;
  account.email = faker.internet.email({ firstName, lastName });
  account.title = faker.name.jobTitle();
  account.department = faker.commerce.department();

  return account;
});
