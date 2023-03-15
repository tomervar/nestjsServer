/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

export type User = {
  id: number
  userName: string
  password: string
  isAdmin: boolean
};

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            id: 1,
            userName: "tomer",
            password: "1234",
            isAdmin: true,
        },
        {
            id: 2,
            userName: "tomer1234",
            password: "4321",
            isAdmin: false,
        },
    ]
    async findUser(username: string): Promise<User | undefined> {
        return this.users.find(user => user.userName === username)
    }

    async returnAllUsers(): Promise<User[] | undefined> { 
        return this.users
    } 
}
