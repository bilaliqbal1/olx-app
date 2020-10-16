
var emailEl = document.getElementById('email');
var passEl = document.getElementById('password');
var auth = firebase.auth();
var db = firebase.firestore();

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
    window.location.href ='../html/post.html'
}


//firestore work
function addDataItem(){
    var newItem=document.getElementById('new');
    var useItem = document.getElementById('used');
    var mobileItem = document.getElementById('mobile');
    var tabletItem= document.getElementById('tablet');
    var adTitleItem=document.getElementById('adTitle');
    var descriptionItem= document.getElementById('description');
    var priceItem=document.getElementById('price');
    var listLocationItem=document.getElementById('listLocation');
    var currentLocationItem=document.getElementById('currentLocation');
    var stateItem= document.getElementById('state');
    var nameItem= document.getElementById('name')

    // console.log(newItem.value,useItem.value,mobileItem.value);

    db.collection("users").add({
        newData: newItem.value,
        usedData: useItem.value,
        mobileData: mobileItem.value,
        tabletData: tabletItem.value,
        adTitleData: adTitleItem.value,
        descriptionData: descriptionItem.value,
        priceData: priceItem.value,
        listLocationData: listLocationItem.value,
        currentLocationData: currentLocationItem.value,
        stateData: stateItem.value,
        nameData: nameItem.value
        
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        window.location.href ='../html/index.html'
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}


