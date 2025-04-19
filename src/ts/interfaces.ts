interface User {
    id: number;
    username: string;
    email: string;
    password: string; // Na prática, armazenaríamos apenas o hash
    createdAt: Date;
}

interface AuthResponse {
    success: boolean;
    message: string;
    user?: Omit<User, 'password'>;
}

interface AuthSystemInterface {
    register(user: Omit<User, 'id' | 'createdAt'>): AuthResponse;
    login(email: string, password: string): AuthResponse;
    logout(): void;
    isAuthenticated(): boolean;
    getCurrentUser(): Omit<User, 'password'> | null;
}

export type { User, AuthResponse, AuthSystemInterface };