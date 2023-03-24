/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
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
            id: this.users.length + 1, // unique id
            username: username,
            password: password,
            roles: userRole
        }
        this.users.push(newUser)
        const returnUser = JSON.parse(JSON.stringify(newUser)); // copy the user and delete the password
        delete returnUser.password;
        return returnUser;
    }

    async findUser(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username)
    }

    async returnAllUsers(): Promise<User[] | undefined> { 
        return JSON.parse(JSON.stringify(this.users)).map( user => { // copy users and delete there passwords
            delete user.password;
            return user;});
    } 

    async returnUser(username: string): Promise<User | undefined> { 
        const returnUser = JSON.parse(JSON.stringify(await this.findUser(username))); // copy user and delete password
        delete returnUser.password;
        return returnUser;
    
    } 
}
