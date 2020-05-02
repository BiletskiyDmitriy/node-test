import {
  UserList,
  UserRetrieveById,
  UserCreate,
  UserUpdate,
  UserDelete
} from './api/user/index'

import { NotFound } from './api/not-found'

import {
  CheckFileSize,
  CheckFileExtension,
  CheckParams,
  ValidateID,
  CheckUser,
  userCreateSchema,
  userUpdateSchema
} from './validators'

export default (HTTP_METHODS) => ([
  {
    path: '/user',
    method: HTTP_METHODS.GET,
    handler: UserList
  },
  {
    path: '/user',
    method: HTTP_METHODS.POST,
    handler: UserCreate,
    middlewares: [CheckParams(userCreateSchema), CheckFileExtension, CheckFileSize]
  },
  {
    path: '/user/:_id',
    method: HTTP_METHODS.GET,
    handler: UserRetrieveById,
    middlewares: [ValidateID, CheckUser]
  },
  {
    path: '/user/:_id',
    method: HTTP_METHODS.PUT,
    handler: UserUpdate,
    middlewares: [ValidateID, CheckUser, CheckParams(userUpdateSchema), CheckFileExtension, CheckFileSize]
  },
  {
    path: '/user/:_id',
    method: HTTP_METHODS.DELETE,
    handler: UserDelete,
    middlewares: [ValidateID, CheckUser]
  },
  {
    path: '*',
    method: HTTP_METHODS.ALL,
    handler: NotFound
  }
])
