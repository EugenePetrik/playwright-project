import { JSONSchemaType } from 'ajv';
import { IAuthUser } from '../../../types';

export const userSchema: JSONSchemaType<IAuthUser> = {
  title: 'Auth User Schema',
  type: 'object',
  required: ['user'],
  properties: {
    user: {
      type: 'object',
      required: ['email', 'username', 'token'],
      properties: {
        email: {
          type: 'string',
        },
        username: {
          type: 'string',
        },
        token: {
          type: 'string',
        },
      },
    },
  },
};
