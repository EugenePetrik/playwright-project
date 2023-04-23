import type { IAuthUser, IUser } from '../../../types';
import { expectToEqual } from '../solutions';

export const assertUserEmail = async ({ actualUser, expectedUser }: { actualUser: IUser; expectedUser: IAuthUser }) => {
  await expectToEqual({
    actual: actualUser.email,
    expected: expectedUser.user.email,
    description: 'user email',
  });
};

export const assertUsername = async ({ actualUser, expectedUser }: { actualUser: IUser; expectedUser: IAuthUser }) => {
  await expectToEqual({
    actual: actualUser.username,
    expected: expectedUser.user.username,
    description: 'user username',
  });
};
