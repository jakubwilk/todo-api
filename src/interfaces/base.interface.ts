import { UserModel } from './user-model.interface';

export interface BaseMessage {
  message: string[],
  data?: string | unknown
}

export interface LoginUserModel {
  token: string,
  user: UserModel
}