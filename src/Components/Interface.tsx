export interface IBaseUser {
    name: string;
    age: number | string;
    gender: string;
  }
  export interface IUser extends IBaseUser {
    id: number;
  }