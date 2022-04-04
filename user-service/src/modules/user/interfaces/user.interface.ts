export interface IUser {
	id?: string;
	email: string;
	role: number;
	isEnabled: boolean;
	phoneNumber: string;
	gender: number;
	birthDay: Date;
	addresses: any[];
	avatar: string;
	passwordHash?: string;
}