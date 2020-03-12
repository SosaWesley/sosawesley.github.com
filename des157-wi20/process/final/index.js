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
            <p class="penName">${submissions.name}</p>
            <p>${submissions.country}</p>
            <p class="story">${submissions.message}</p>`;
        submissionsList.append(divItem);
    } );
    //after getting all letters, make letter clickable.
    //letterClick();
}

displaySubmit();

var overlay = document.getElementById("popUpWindow");
var closeBtn = document.getElementById("closeBtn");
//close popUp
window.onclick = function(event) {
    if (event.target == overlay || event.target == closeBtn) {
        this.overlay.style.opacity = 0;
        closeBtn.style.opacity = 0;
        
        //Timeout for a delay in transition.
        setTimeout( function(){
            overlay.style.display = "none";
            closeBtn.style.display = "none";
        }, 250);

    }
    console.log("Click on overlay");
}

//display PopUp
document.addEventListener("click", function(event) {
    if(event.target.matches(".letter")) {
        console.log("Letter is clicked.");
        console.log(`Event: ${event }`);
        const thisRecord = event.target.getAttribute("id");
        console.log(thisRecord);

        overlay.style.display = "block";
        closeBtn.style.display = "block";

        setTimeout( function(){
            overlay.style.opacity = 1;
            this.closeBtn.style.opacity = 1;
        }, 250);

        console.log(`InnerHTML: ${event.target.innerHTML}`);
        
        let popUpWindowText = document.getElementById("popUpWindowText");
        
        popUpWindowText.innerHTML = event.target.innerHTML;
    }

    else if(event.target.matches(".letter p")) {
        console.log("Paragraph is CLICKED.");
        console.log(`Event: ${event }`);
        const clickedPar = event.target;
        const fullLetter = clickedPar.parentElement;

        const thisRecord = event.target.getAttribute("id");
        console.log(thisRecord);

        overlay.style.display = "block";
        closeBtn.style.display = "block";

        setTimeout( function(){
            overlay.style.opacity = 1;
            this.closeBtn.style.opacity = 1;
        }, 250);

        console.log(`InnerHTML: ${event.target.innerHTML}`);
        
        let popUpWindowText = document.getElementById("popUpWindowText");
        
        popUpWindowText.innerHTML = fullLetter.innerHTML;
    }
}, false);

//  Documentation for Reference:
// Array -> Obj https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
// Pop Up Box: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal