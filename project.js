document.addEventListener('DOMContentLoaded', function () {
    // Retrieve project details from sessionStorage
    var projectName = sessionStorage.getItem('projectName');
    var projectDescription = sessionStorage.getItem('projectDescription');
    var projectScope = sessionStorage.getItem('projectScope');
    var projectOutcomes = sessionStorage.getItem('projectOutcomes');
    var projectSkills = sessionStorage.getItem('projectSkills');

    // Populate HTML elements with project details
    document.getElementById('project-name').textContent = projectName;
    document.getElementById('project-description').textContent = projectDescription;
    document.getElementById('project-scope').textContent = projectScope;
    document.getElementById('project-outcomes').textContent = projectOutcomes;
    document.getElementById('project-skills').textContent = projectSkills;
});

const database = firebase.database();
const membersRef = database.ref('members');

document.addEventListener('DOMContentLoaded', function () {
    // Get the form element
    const sendRequestForm = document.getElementById('send-request-form');

    if (sendRequestForm) {
        // Fetch the user's name from Firebase Authentication
        const user = firebase.auth().currentUser;
        const defaultRequestName = user ? user.displayName : '';

        // Pre-fill the "Your Name" input with the user's name
        document.getElementById('request-name').value = defaultRequestName;

        // Add submit event listener to the form
        sendRequestForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get the input value
            const requestName = document.getElementById('request-name').value;

            // Validate if the requestName is not empty
            if (requestName.trim() !== '') {
                // Add the request to the Firebase database
                membersRef.push({
                    name: requestName
                }, function (error) {
                    if (error) {
                        console.error('Error sending request:', error);
                    } else {
                        // Display an alert for successful request submission
                        alert('Request Sent!');
                        // Optionally, clear the form after submission
                        sendRequestForm.reset();
                    }
                });
            } else {
                alert('Please enter your name before sending the request.');
            }
        });
    }
});
