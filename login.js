document.addEventListener('DOMContentLoaded', function () {
    const loginBtn = document.getElementById('loginBtn'); // Botón "Iniciar sesión"
    const loginForm = document.getElementById('loginForm'); // Formulario de inicio de sesión
    const accederBtn = document.getElementById('accederBtn'); // Botón "Acceder"

    // Mostrar el formulario y ocultar el botón "Iniciar sesión"
    loginBtn.addEventListener('click', function () {
        loginBtn.style.display = 'none'; // Ocultar el botón "Iniciar sesión"
        loginForm.style.display = 'flex'; // Mostrar el formulario
    });

    // Manejar el envío del formulario al hacer clic en "Acceder"
    accederBtn.addEventListener('click', function (event) {
        event.preventDefault(); // Evitar que el formulario se envíe

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Validar que los campos no estén vacíos
        if (!username || !password) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // Obtener usuarios registrados (si existen)
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Verificar si el usuario y la contraseña coinciden
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            window.location.href = 'rutabus.html'; 
        } else {
            alert('Usuario o contraseña incorrectos.');
        }
    });
});