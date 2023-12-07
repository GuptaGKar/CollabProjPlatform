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

// Initialize Firebase with your configuration
// firebase.initializeApp(firebaseConfig);

// Reference to the Firebase database
var database = firebase.database();
var membersRef = database.ref('members'); // Update with your actual database path

// Function to create and append a member container
function createMemberContainer(memberData, memberId) {
    var memberList = document.querySelector('.member-list');

    // Create a new member container
    var memberContainer = document.createElement('div');
    memberContainer.classList.add('member-container');
    memberContainer.setAttribute('data-id', memberId); // Store the member ID as a data attribute

    // Populate the container with member details
    var memberName = document.createElement('h3');
    memberName.textContent = memberData.name;
    memberContainer.appendChild(memberName);

    // Accept button
    var acceptButton = document.createElement('button');
    acceptButton.textContent = 'Accept';
    acceptButton.addEventListener('click', function() {
        // Add your logic to accept the member here
        var role = prompt('Assign a role to ' + memberData.name); // Prompt for role assignment
        if (role !== null && role !== '') {
            // Update the member's role in the database
            membersRef.child(memberId).update({ role: role });
            // Update the UI
            memberContainer.innerHTML = '<h3>' + memberData.name + ' - ' + role + '</h3>';
        }
    });
    memberContainer.appendChild(acceptButton);

    // Reject button
    var rejectButton = document.createElement('button');
    rejectButton.textContent = 'Reject';
    rejectButton.addEventListener('click', function() {
        // Add your logic to reject the member here
        alert('Rejected ' + memberData.name); // Replace this with your actual logic
        // Remove the member container from the UI
        memberList.removeChild(memberContainer);
    });
    memberContainer.appendChild(rejectButton);

    // Append the member container to the list
    memberList.appendChild(memberContainer);
}

// Function to fetch and display members
function displayMembers() {
    membersRef.on('value', function(snapshot) {
        document.querySelector('.member-list').innerHTML = ''; // Clear existing containers before populating
        snapshot.forEach(function(childSnapshot) {
            var memberData = childSnapshot.val();
            var memberId = childSnapshot.key; // Get the unique ID of the member
            createMemberContainer(memberData, memberId);
        });
    });
}

// Call the displayMembers function to populate the member containers
displayMembers();
