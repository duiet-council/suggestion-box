// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA5-f04BVHY1Z4Xh9Nm4is7B-pnLF5ERD8",
    authDomain: "duiet-suggestion-box-27d73.firebaseapp.com",
    projectId: "duiet-suggestion-box-27d73",
    storageBucket: "duiet-suggestion-box-27d73.appspot.com",
    messagingSenderId: "599452594687",
    appId: "1:599452594687:web:9e28a49ab9baec87af77ca"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var id, text;
var button = document.querySelector('button');

const db = firebase.firestore();

function ready(){
    var today = new Date();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    id = date + ", " + time;
    text = document.getElementById("suggestion-text").value;
}

function input(){
    ready();
    db.collection("suggestion")
      .doc(id)
      .set({
        entry : text,
        dt : id
    });
    button.textContent = 'Entry Submitted';
    button.style.cssText = `background-color : #19a74b; 
                            border-color: #19a74b;`;
}

button.onclick = input;


