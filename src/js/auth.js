class AuthSystem {
    constructor() {
        this.users = [];
        this.currentUser = null;
    }

    register(user) {
        // Verifica se o email já está cadastrado
        if (this.users.some(u => u.email === user.email)) {
            return {
                success: false,
                message: 'Email já cadastrado'
            };
        }

        // Cria novo usuário
        const newUser = {
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

    login(email, password) {
        const user = this.users.find(u => u.email === email);

        if (!user) {
            return {
                success: false,
                message: 'Usuário não encontrado'
            };
        }

        if (user.password !== password) {
            return {
                success: false,
                message: 'Senha incorreta'
            };
        }

        const { password: _, ...userWithoutPassword } = user;
        this.currentUser = userWithoutPassword;

        return {
            success: true,
            message: 'Login realizado com sucesso',
            user: userWithoutPassword
        };
    }

    logout() {
        this.currentUser = null;
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }
}