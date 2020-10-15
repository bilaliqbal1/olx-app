
var emailEl = document.getElementById('email');
var passEl = document.getElementById('password');
var auth = firebase.auth();
console.log(auth);


function signUpUser(){
console.log(emailEl.value,passEl.value);    
auth.createUserWithEmailAndPassword(emailEl.value, passEl.value)
.then((sucess)=>{
    console.log('Sucessfully register',sucess);
})

.catch(function(error) {
    console.log('unsucessful',error);

  });
}
function signInUser(){
    firebase.auth().signInWithEmailAndPassword(emailEl.value, passEl.value)
    .then((sucess)=>{
      console.log('welcome',sucess);
      redirectToHome();
    })
    .catch(function(error) {
       
        console.log('error***',error);
      });

}

function redirectToHome(){
    window.location.href ='../html/index.html'
}


//firestore work
function addData(){
    db.collection("users").add({
        first: "Ada",
        last: "Lovelace",
        born: 1815
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}