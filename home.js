var database = firebase.database();
var projectsRef = database.ref('ki');

function createProjectContainer(projectData) {
    var projectDisplay = document.querySelector('.project-display');

    var projectContainer = document.createElement('div');
    projectContainer.classList.add('project-container');

    var projectName = document.createElement('h3');
    projectName.textContent = projectData.pname;
    projectContainer.appendChild(projectName);

    var projectDescription = document.createElement('p');
    projectDescription.textContent = projectData.desc;
    projectContainer.appendChild(projectDescription);

    var projectScope = document.createElement('p');
    projectScope.textContent = projectData.scope;
    projectContainer.appendChild(projectScope);

    var projectOutcomes = document.createElement('p');
    projectOutcomes.textContent = projectData.out;
    projectContainer.appendChild(projectOutcomes);

    var projectSkills = document.createElement('p');
    projectSkills.textContent = projectData.skill;
    projectContainer.appendChild(projectSkills);

    projectContainer.addEventListener('click', function () {
        redirectToProject(projectData.pname, projectData.desc, projectData.scope, projectData.out, projectData.skill);
    });

    projectDisplay.appendChild(projectContainer);

    projectContainer.addEventListener('click', function () {
        // Store project details in sessionStorage
        sessionStorage.setItem('projectName', projectData.pname);
        sessionStorage.setItem('projectDescription', projectData.desc);
        sessionStorage.setItem('projectScopes', projectData.scope);
        sessionStorage.setItem('projectOutcomes', projectData.out);
        sessionStorage.setItem('projectSkills', projectData.skill);

        // Redirect to project.html
        window.location.href = 'project.html';
    });
}

function displayProjects() {
    projectsRef.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var projectData = childSnapshot.val();
            createProjectContainer(projectData);
        });
    });
}

displayProjects();