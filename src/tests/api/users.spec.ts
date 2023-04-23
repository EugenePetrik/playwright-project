import { APIRequestContext, test } from '@playwright/test';
import { UsersAPIClient } from '../../api/core/users.api';
import { getDefaultContext } from '../../utils/api/helpers';
import { generateUser } from '../../utils/models/user';
import { IAuthUser } from '../../utils/types';
import { expectStatusCode } from '../../utils/api/assertions/solutions';
import { assertUserEmail, assertUsername } from '../../utils/api/assertions/api/users';
import { validateSchema } from '../../utils/api/schema/validator';
import { userSchema } from '../../utils/api/schema/api/users.schema';

test.describe('Users', () => {
  let context: APIRequestContext;

  test.beforeEach(async () => {
    context = await getDefaultContext();
  });

  test('Sign up user', async () => {
    const user = generateUser();
    const userClient = new UsersAPIClient(context);

    const response = await userClient.signUpUserAPI(user);
    const json = (await response.json()) as IAuthUser;

    await expectStatusCode({ actual: response.status(), expected: 200, api: response.url() });
    await assertUserEmail({ actualUser: user, expectedUser: json });
    await assertUsername({ actualUser: user, expectedUser: json });

    await validateSchema({ schema: userSchema, json });
  });
});
