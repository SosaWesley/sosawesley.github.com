// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyALvBFQFwB5o0RtFVt62dbk504k2yDGJQk",
    authDomain: "penpals-fd5cb.firebaseapp.com",
    databaseURL: "https://penpals-fd5cb.firebaseio.com",
    projectId: "penpals-fd5cb",
    storageBucket: "penpals-fd5cb.appspot.com",
    messagingSenderId: "1061163957560",
    appId: "1:1061163957560:web:6d845974b8df55ea1195cd"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const userForm = document.getElementById("submitForm");

//Submit Form
userForm.addEventListener("submit", function(){
    event.preventDefault();
    //get all information from array
    formData = userForm.elements;

    //Nested Array: 
    var arrayInput = [];

    arrayInput.push(["name", formData.item(0).value]);

    arrayInput.push(["country", formData.item(1).value]);

    arrayInput.push(["message", formData.item(2).value]);

    console.log(formData);
    console.log(arrayInput);

    //converts array into Key-Pair Value
    const convertToObj = Object.fromEntries(arrayInput);
    console.log(convertToObj);

    //convert object into JSON
    const objToJSON = JSON.stringify(convertToObj);
    console.log(objToJSON);


    //adding to firebaseDatabase
    const db = firebase.database().ref('submissions');
    const newSubmission = {};


    // for (let i = 0; i < inputs.length; i++) {
    //     let key = inputs[i].getAttribute("name");
    //     let value = inputs[i].value;
    //     newFriend[key] = value;
    // }
    // console.log(newSubmission);
    db.push(convertToObj, function(){
        //test   
    });

});//Form Submission


const submissionsList = document.getElementById("submitSection");

//getting Data from Database
function displaySubmit() {
    const dbRef = firebase.database().ref('submissions').orderByChild("country");

    dbRef.on("child_added", function(snap){
        const submissions = snap.val();
        const ids = snap.key;
        console.log(submissions);
        console.log(ids);

        const divItem = document.createElement("div");
        divItem.setAttribute("id", `r-${ids}`);
        divItem.innerHTML = `
            <p>Name: ${submissions.name}</p>
            <p>Country: ${submissions.country}</p>
            <p>Message: ${submissions.message}</p>`;
        submissionsList.append(divItem);
    } );
}

displaySubmit();

//  Documentation for Reference:
// Array -> Obj https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries