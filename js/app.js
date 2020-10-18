
var emailEl = document.getElementById('email');
var passEl = document.getElementById('password');
var auth = firebase.auth();
var db = firebase.firestore();

// console.log(auth);



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
    //   console.log(auth.currentUser);
      redirectToHome();
    })
    .catch(function(error) {
       
        console.log('error***',error);
      });
   
}

function redirectToHome(){
    localStorage.setItem('userInfo',JSON.stringify(auth.currentUser))
    window.location.href ='../html/post.html';
    console.log(auth.currentUser);
}



//firestore work


function addDataItem(){
console.log(auth.currentUser.uid);


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
        nameData: nameItem.value,
        uid:  auth.currentUser.uid
        
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        window.location.href ='../html/index.html';
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}


//RealTimesData updata
function getRealTimeUpdates(){
    db.collection("users").where("uid", "==" ,JSON.parse(localStorage.getItem('userInfo')).uid)
    .onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            if (change.type === "added") {
                console.log("user: ", change.doc.data());
                // addComponentAd(change.doc);
                getAllUsers();
            }
            // if (change.type === "modified") {
            //     console.log("Modified city: ", change.doc.data());
            // }
            // if (change.type === "removed") {
            //     console.log("Removed city: ", change.doc.data());
            // }
        });
    });
}



//ALL user data show in website
function getAllUsers(){
        db.collection("users").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                        console.log(doc.id,doc.data());
                        // console.log(auth.currentUser); //this object provide all information of user
                        console.log('raw data',doc);
                        addComponentAd(doc.data());
                    });
                });
            }



           var testPart = document.getElementById('testPart');
function addComponentAd(adsItem){
    console.log(adsItem);
     
    var divEl =document.createElement('div');
    // var imgEl= document.createElement('img');
    var h1El= document.createElement('h1');
    var h1ElText = document.createTextNode(adsItem.adTitleData);
    h1El.appendChild(h1ElText);

    var pEl1= document.createElement('p');
     var pEl1Text = document.createTextNode(adsItem.descriptionData)
     pEl1.appendChild(pEl1Text)

    var pEl2= document.createElement('p');

    // divEl.appendChild(imgEl);
    divEl.appendChild(h1El);
    divEl.appendChild(pEl1);
    divEl.appendChild(pEl2);
    testPart.appendChild(divEl);
    
    divEl.style.boxShadow = '2px 5px 10px rgba(0,0,0,0.3)';

}

















