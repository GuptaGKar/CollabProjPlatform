document.addEventListener('DOMContentLoaded', async function () {
    const profileContainer = document.getElementById('profileContainer');
    const profilePicture = document.getElementById('profilePicture');
    const displayName = document.getElementById('displayName');
    const email = document.getElementById('email');
    const logoutButton = document.getElementById('logoutButton');

    // Function to get user details
    function getUserDetails() {
        const user = firebase.auth().currentUser;

        if (user) {
            // Update profile information
            profilePicture.src = user.photoURL;
            displayName.textContent = user.displayName;
            email.textContent = user.email;
        }
    }

    // Function to handle user logout
    function handleLogout() {
        firebase.auth().signOut().then(() => {
            // Redirect to the login page after logout
            window.location.href = 'login.html';
        }).catch((error) => {
            console.error('Logout error:', error.message);
        });
    }

    // Check if the user is logged in
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, so get and display user details
            getUserDetails();
        } else {
            // User is not signed in, redirect to the login page
            window.location.href = 'login.html';
        }
    });

    // Attach the function to the logout button click event
    logoutButton.addEventListener('click', handleLogout);
});
