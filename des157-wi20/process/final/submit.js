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
    const objToJSON = JSON.stringify(convertToObj);;
    console.log(objToJSON);


    //adding to firebaseDatabase
    const db = firebase.database().ref('submissions');
    const newSubmission = {};

    db.push(convertToObj, function(){
        //clears submit form
        resetForm();
        //refreshes the page so the submitted item will appear correctly.
        setTimeout( function(){
            // window.location.reload(true);
        }, 1000);

        //refreshes the organization of the page
        // displaySubmit();
        //test   
    });

    overlay.style.display = "block";

    setTimeout( function(){
        overlay.style.opacity = 1;
    }, 500);


});//Form Submission


const submissionsList = document.getElementById("submitSection");

//getting Data from Database
function displaySubmit() {
    const dbRef = firebase.database().ref('submissions').orderByChild("country");

    dbRef.on("child_added", function(snap){
        const submissions = snap.val();
        const ids = snap.key;

        const divItem = document.createElement("div");
        divItem.setAttribute("id", `r-${ids}`);
        divItem.setAttribute("class", "letter");
        divItem.innerHTML = `
            <p>Name: ${submissions.name}</p>
            <p>Country: ${submissions.country}</p>
            <p class="story">Message: ${submissions.message}</p>`;
        submissionsList.append(divItem);
    } );
    //after getting all letters, make letter clickable.
    //letterClick();
}

// displaySubmit();

function resetForm(){
    document.getElementById("name").value = "";
    document.getElementById("country").value = "";
    document.getElementById("msg").value = "";
}

var overlay = document.getElementById("popUpWindow");
window.onclick = function(event) {
    if (event.target == overlay) {
        this.overlay.style.opacity = 0;
        
        //Timeout for a delay in transition.
        setTimeout( function(){
            overlay.style.display = "none";
        }, 500);
        // overlay.style.display = "none";
    }
    console.log("Click on overlay");
}


document.addEventListener("click", function(event) {
    if(event.target.matches(".letter")) {
        console.log("Letter is clicked.");
        console.log(`Event: ${event }`);
        const thisRecord = event.target.getAttribute("id");
        console.log(thisRecord);

        overlay.style.display = "block";

        setTimeout( function(){
            overlay.style.opacity = 1;
        }, 500);

        // overlay.style.opacity = 1;

        console.log(`InnerHTML: ${event.target.innerHTML}`);
        
        let popUpWindowText = document.getElementById("popUpWindowText");
        popUpWindowText.innerHTML = event.target.innerHTML;
    }
}, false);

//  Documentation for Reference:
// Array -> Obj https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
// Pop Up Box: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal