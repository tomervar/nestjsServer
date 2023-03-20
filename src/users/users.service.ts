/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/createUser.dto';
import { Role } from './role.enum';

export type User = {
  id: number
  username: string
  password: string
  roles: Role[]
};

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            id: 1,
            username: "tomer",
            // password: "1234",
            password: "$2b$10$QsETHDOTnj7pOsVpbWvgXebAuOKGOxeZc78u4hrDATeYi4MFRsx5q",
            roles: [Role.Admin],
        },
        {
            id: 2,
            username: "tomer1234",
            // password: "4321",
            password: "$2b$10$wosGIno6pwiAT3DLIQS.2OH9dG1V/HVOdlMoHgeHI.JkYKv5Z8uVm",
            roles: [Role.User],
        },
    ]

    async createUser(username: string, password: string, isAdmin: boolean) {
        const userRole = isAdmin? [Role.Admin] : [Role.User];
        const newUser = {
            id: this.users.length + 1,
            username: username,
            password: password,
            roles: userRole
        }
        this.users.push(newUser)
        return newUser
    }

    async findUser(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username)
    }

    async returnAllUsers(): Promise<User[] | undefined> { 
        console.log(this.users)
        return JSON.parse(JSON.stringify(this.users)).map( user => {
            delete user.password;
            return user;});
    } 

    async returnUser(username: string): Promise<User | undefined> { 
        console.log(await this.findUser(username))
        const returnUser = JSON.parse(JSON.stringify(await this.findUser(username)));
        delete returnUser.password;
        return returnUser;
    
    } 
}
