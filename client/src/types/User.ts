export interface IUser {
  _id: string;
  email: string;
  name: string;
  password: string;
  subscribers: number;
  subscribedUsers: IUser[],
  roles: string[]
}