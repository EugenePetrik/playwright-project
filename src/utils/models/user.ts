import { faker } from '@faker-js/faker';
import _ from 'lodash';
import type { IUser } from '../types';

export function generateUser(): IUser {
  return {
    username: faker.internet.userName().replace(/[_'.]/g, '').toLowerCase().slice(0, 10),
    email: `test_${Date.now() + _.random(100)}@example.com`,
    password: faker.internet.password(),
  };
}
