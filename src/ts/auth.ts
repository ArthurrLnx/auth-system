import type { User, AuthResponse, AuthSystemInterface } from './interfaces';

class AuthSystem implements AuthSystemInterface {
    private users: User[] = [];
    private currentUser: Omit<User, 'password'> | null = null;

    register(user: Omit<User, 'id' | 'createdAt'>): AuthResponse {
        // Verifica se o email já está cadastrado
        if (this.users.some(u => u.email === user.email)) {
            return {
                success: false,
                message: 'Email já cadastrado'
            };
        }

        // Cria novo usuário
        const newUser: User = {
            ...user,
            id: this.users.length + 1,
            createdAt: new Date()
        };

        this.users.push(newUser);

        // Remove a senha antes de retornar
        const { password, ...userWithoutPassword } = newUser;

        return {
            success: true,
            message: 'Usuário registrado com sucesso',
            user: userWithoutPassword
        };
    }

    login(email: string, password: string): AuthResponse {
        const user = this.users.find(u => u.email === email);

        if (!user) {
            return {
                success: false,
                message: 'Usuário não encontrado'
            };
        }

        // Na prática, compararíamos com o hash da senha
        if (user.password !== password) {
            return {
                success: false,
                message: 'Senha incorreta'
            };
        }

        // Remove a senha antes de armazenar o usuário atual
        const { password: _, ...userWithoutPassword } = user;
        this.currentUser = userWithoutPassword;

        return {
            success: true,
            message: 'Login realizado com sucesso',
            user: userWithoutPassword
        };
    }

    logout(): void {
        this.currentUser = null;
    }

    isAuthenticated(): boolean {
        return this.currentUser !== null;
    }

    getCurrentUser(): Omit<User, 'password'> | null {
        return this.currentUser;
    }
}

export { AuthSystem };