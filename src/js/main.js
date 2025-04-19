document.addEventListener('DOMContentLoaded', () => {
    const authSystem = new AuthSystem();
    
    // Elementos do DOM
    const loginForm = document.getElementById('login');
    const registerForm = document.getElementById('register');
    const loginContainer = document.getElementById('login-form');
    const registerContainer = document.getElementById('register-form');
    const userInfoContainer = document.getElementById('user-info');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    const logoutBtn = document.getElementById('logout-btn');
    const usernameDisplay = document.getElementById('username-display');

    // Alternar entre login e registro
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    });

    // Logout
    logoutBtn.addEventListener('click', () => {
        authSystem.logout();
        updateUI();
    });

    // Login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        const result = authSystem.login(email, password);
        alert(result.message);
        
        if (result.success) {
            updateUI();
        }
    });

    // Registro
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        
        const result = authSystem.register({ username, email, password });
        alert(result.message);
        
        if (result.success) {
            registerForm.reset();
            registerContainer.style.display = 'none';
            loginContainer.style.display = 'block';
        }
    });

    // Atualizar a interface com base no estado de autenticação
    function updateUI() {
        if (authSystem.isAuthenticated()) {
            const user = authSystem.getCurrentUser();
            usernameDisplay.textContent = user.username;
            loginContainer.style.display = 'none';
            registerContainer.style.display = 'none';
            userInfoContainer.style.display = 'block';
        } else {
            loginContainer.style.display = 'block';
            registerContainer.style.display = 'none';
            userInfoContainer.style.display = 'none';
        }
    }

    // Inicializar UI
    updateUI();
});