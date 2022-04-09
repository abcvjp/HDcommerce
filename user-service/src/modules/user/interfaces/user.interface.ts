export interface IUser {
  id?: string;
  _id?: string;
  email: string;
  role: number;
  isEnabled: boolean;
  phoneNumber: string;
  fullName: string;
  gender: number;
  birthDay: Date;
  addresses: any[];
  avatar: string;
  passwordHash?: string;
}
