// Initialize Firebase with your configuration
firebase.initializeApp(firebaseConfig);

// Reference to the Firebase database
var database = firebase.database();
var teamsRef = database.ref('ki');

// Function to create and append a team container
function createTeamContainer(teamData) {
    var projectList = document.querySelector('.project-list');

    // Create a new team container
    var teamContainer = document.createElement('div');
    teamContainer.classList.add('project-container');

    // Populate the container with team details
    var teamName = document.createElement('h3');
    teamName.textContent = teamData.pname;
    teamContainer.appendChild(teamName);

    var teamDescription = document.createElement('p');
    teamDescription.textContent = teamData.desc;
    teamContainer.appendChild(teamDescription);

    var teamScope = document.createElement('p');
    teamScope.textContent = teamData.scope;
    teamContainer.appendChild(teamScope);

    var teamOutcomes = document.createElement('p');
    teamOutcomes.textContent = teamData.out;
    teamContainer.appendChild(teamOutcomes);

    var teamSkills = document.createElement('p');
    teamSkills.textContent = teamData.skill;
    teamContainer.appendChild(teamSkills);

    // Add click event listener to redirect to project.html
    teamContainer.addEventListener('click', function () {
        redirectToProject(teamData);
    });

    // Append the team container to the list
    projectList.appendChild(teamContainer);
}

// Function to redirect to project.html with team details
function redirectToProject(teamData) {
    // Store team details in sessionStorage
    sessionStorage.setItem('projectName', teamData.pname);
    sessionStorage.setItem('projectDescription', teamData.desc);
    sessionStorage.setItem('projectScopes', teamData.scope);
    sessionStorage.setItem('projectOutcomes', teamData.out);
    sessionStorage.setItem('projectSkills', teamData.skill);

    // Redirect to project.html
    window.location.href = 'teamproj.html';
}

// Function to fetch and display team data
function displayTeams() {
    teamsRef.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var teamData = childSnapshot.val();
            createTeamContainer(teamData);
        });
    });
}

// Call the displayTeams function to populate the team containers
displayTeams();
