import { type APIRequestContext, test } from '@playwright/test';
import { UsersAPIClient } from '../../api/core/users.api';
import { getDefaultContext } from '../../utils/api/helpers';
import { generateUser } from '../../utils/models/user';
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

    await assertUserEmail({ actualUser: user, expectedUser: response });
    await assertUsername({ actualUser: user, expectedUser: response });

    await validateSchema({ schema: userSchema, json: response });
  });
});
