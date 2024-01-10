document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');
    const displayNameInput = document.getElementById('displayName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const fileInput = document.getElementById('file');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');

    async function registerFormSubmit(e) {
        e.preventDefault();

        const displayName = displayNameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;
        const profilePicture = fileInput.files[0];

        loadingElement.innerText = 'Signing up, please wait...';
        loadingElement.style.color = 'blue';
        errorElement.innerText = '';

        try {
            // Firebase Authentication: Create user with email and password
            const authUser = await firebase.auth().createUserWithEmailAndPassword(email, password);

            // Upload profile picture to Firebase Storage
            const date = new Date().getTime();
            const fileName = `${displayName}-${date}`;
            const storageRef = firebase.storage().ref(fileName);
            await storageRef.put(profilePicture);

            // Get the download URL of the uploaded image
            const downloadURL = await storageRef.getDownloadURL();

            // Update user profile with name and profile picture URL
            await authUser.user.updateProfile({
                displayName: displayName,
                photoURL: downloadURL
            });

            // Redirect to the home page
            window.location.href = 'home.html';

            // Simulate success
            loadingElement.innerText = '';
            loadingElement.style.color = 'green';
            console.log('Registration successful! Redirecting to home page...');
        } catch (err) {
            loadingElement.innerText = '';
            errorElement.innerText = err.message;
            errorElement.style.color = 'red';
        }
    }

    registerForm.addEventListener('submit', registerFormSubmit);
});
