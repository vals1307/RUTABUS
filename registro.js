document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');
    const messageDiv = document.getElementById('message');

    // Función para mostrar/ocultar la contraseña
    window.togglePasswordVisibility = function (inputId) {
        const passwordInput = document.getElementById(inputId);
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
    };

    // Función para mostrar mensajes
    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = `message ${type}`; // Aplicar clase de estilo
        messageDiv.style.display = 'block'; // Mostrar el mensaje
    }

    // Manejar el envío del formulario
    registerForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar que el formulario se envíe

        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validar que los campos no estén vacíos
        if (!newUsername || !newPassword || !confirmPassword) {
            showMessage('Por favor, completa todos los campos.', 'error');
            return;
        }

        // Validar que las contraseñas coincidan
        if (newPassword !== confirmPassword) {
            showMessage('Las contraseñas no coinciden.', 'error');
            return;
        }

        // Obtener usuarios registrados (si existen)
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Verificar si el usuario ya existe
        const userExists = users.some(user => user.username === newUsername);
        if (userExists) {
            showMessage('El nombre de usuario ya está registrado.', 'error');
            return;
        }

        // Guardar el nuevo usuario
        users.push({ username: newUsername, password: newPassword });
        localStorage.setItem('users', JSON.stringify(users));
        showMessage('Registro exitoso.', 'success');
        setTimeout(() => {
        window.location.href = 'index.html';
        }, 2500);  
    });
});