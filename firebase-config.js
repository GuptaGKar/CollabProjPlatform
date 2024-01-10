    const firebaseConfig = {
        apiKey: "AIzaSyChkVj8CxmcIWbDtZ8_SlkCNTr6FgCHEcs",
        authDomain: "collabprojplatform.firebaseapp.com",
        databaseURL: "https://collabprojplatform-default-rtdb.firebaseio.com",
        projectId: "collabprojplatform",
        storageBucket: "collabprojplatform.appspot.com",
        messagingSenderId: "210101419215",
        appId: "1:210101419215:web:d96fb0a9ebe26fd03fcbba",
        measurementId: "G-9GNFRSCZ14"
      };

      firebase.initializeApp(firebaseConfig);

      var kiDB = firebase.database().ref('ki');
      