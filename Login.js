document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');

    // Function to handle form submission
    async function loginFormSubmit() {
        const email = emailInput.value;
        const password = passwordInput.value;

        loadingElement.innerText = 'Logging in, please wait...';
        loadingElement.style.color = 'blue';
        errorElement.innerText = '';

        try {
            // Firebase Authentication: Sign in with email and password
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);

            // Access the signed-in user
            const user = userCredential.user;

            // Simulate success
            loadingElement.innerText = '';
            loadingElement.style.color = 'green';
            console.log('Login successful!');

            // Redirect to the home page after successful login
            window.location.href = 'home.html';
        } catch (err) {
            loadingElement.innerText = '';
            errorElement.innerText = err.message;
            errorElement.style.color = 'red';
        }
    }

    // Attach the function to the form's submit event
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        loginFormSubmit();
    });
});
