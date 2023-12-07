const firebaseConfig = {
    apiKey: "AIzaSyChkVj8CxmcIWbDtZ8_SlkCNTr6FgCHEcs",
    authDomain: "collabprojplatform.firebaseapp.com",
    databaseURL: "https://collabprojplatform-default-rtdb.firebaseio.com",
    projectId: "collabprojplatform",
    storageBucket: "collabprojplatform.appspot.com",
    messagingSenderId: "210101419215",
    appId: "1:210101419215:web:14f15625248d52d93fcbba",
    measurementId: "G-PNE9NRK3SP"
  };

  firebase.initializeApp(firebaseConfig);

  var kiDB = firebase.database().ref('members');