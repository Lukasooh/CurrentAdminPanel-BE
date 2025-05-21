import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        { id: 1, name: 'John Doe', password: 'test', role: 'INTERN' },
        { id: 2, name: 'Jane Smith', password: 'test', role: 'ENGINEER' },
        { id: 3, name: 'Alice Johnson', password: 'test', role: 'ADMIN' },
        { id: 4, name: 'Bob Brown', password: 'test', role: 'INTERN' },
    ]
    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            return this.users.filter(user => user.role === role);
        }
        return this.users;
    }
    findOne(id: number) {
        return this.users.find(user => user.id === id);
    }   

    create(user: { name: string; password: 'test', role: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
        const newUser = { id: Date.now(), ...user };
        this.users.push(newUser);
        return newUser;
    }
    update(id: number, user: { name?: string; role?: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
        const index = this.users.findIndex(u => u.id === id);
        if (index !== -1) {
            this.users[index] = { ...this.users[index], ...user };
            return this.users[index];
        }
        return null;
    }
    delete(id: number) {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            const deletedUser = this.users[index];
            this.users.splice(index, 1);
            return deletedUser;
        }
        return null;
    }
}
