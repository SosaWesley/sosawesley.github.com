(function (){
    "use strict";

    //Object: User mail data;
    const userMailData = {
        //Source coordinates.
        xCoord: -1,
        yCoord: -1,

        //Target coordinates.
        continue: -1,
        x2Coord: -1,
        y2Coord: -1,

        //total Distance travlled
        distanceTravelled: -1
    } //userMailData

    //x1,y1 == Source x,y
    function saveXYcoord(x, y) {
        userMailData.xCoord = x;
        userMailData.yCoord = y;
    }

    //x2,y2 == Target x,y
    function saveTargetXY(x, y){
        userMailData.x2Coord = x;
        userMailData.y2Coord = y;
    }

    function distance(mailData) {
        //Source (x1,y1)
        const x1 = mailData.xCoord;
        const y1 = mailData.yCoord;

        //Target (x2, y2)
        const x2 = mailData.x2Coord;
        const y2 = mailData.y2Coord;

        //Checking variables
        console.log(x1, y1, x2, y2);
        console.log(x1 - x2, y1 - y2);
        console.log(Math.pow(x1 - x2, 2), Math.pow(y1 - y2, 2));
        console.log(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) ));
        mailData.distanceTravelled = (Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) ));
    }


    //userMailData
    const continueBtn = document.getElementById("continue");
    continueBtn.addEventListener("click", function(event){
        continueBtn.setAttribute("class", "disable");
        event.preventDefault;
        //sets the userMailData to continue
        userMailData.continue = 1;
        
        const updateInstr = document.getElementById("instructions");
        updateInstr.setAttribute("class", "fade-out");
        updateInstr.innerHTML = "<p>Click on the map to select the letter's <strong>destination<strong>.</p>";
        updateInstr.setAttribute("class","fade-in");
    } );

    //sendMail
    const travelBtn = document.getElementById("send");
    const distDiv = document.getElementById("distanceDiv");
    travelBtn.addEventListener("click", function(event){
        event.preventDefault;

        // updateCSS(userMailData);

        pointInMap.setAttribute("class", "fade-in");
        pointInMap.style.left = `${userMailData.x2Coord - 12.5}px`;
        pointInMap.style.top = `${userMailData.y2Coord - 12.5}px`;

        
        // pointInMap.removeAttribute("class", "move");
        distDiv.innerHTML = `<p><strong>Total Distance Travelled:</strong> ${Math.round(userMailData.distanceTravelled)} px</p>`;
        distDiv.removeAttribute("class", "hidden");
        distDiv.setAttribute("class", "fade-in");
    } );

    // function updateCSS(mailDataObject){
    //     let root = document.documentElement;
    //     root.style.setProperty('origX', `${mailDataObject.xCoord} px`);
    //     root.style.setProperty('origY', mailDataObject.yCoord + "px");
    //     root.style.setProperty('targetX', mailDataObject.x2Coord + "px");
    //     root.style.setProperty('targetY', mailDataObject.y2Coord + "px");
    // }

    const pointInMap = document.getElementById("circle");
    const targetPointInMap = document.getElementById("circle2");
    const mapArea = document.getElementById("canvas");

    //MapArea Selecting Source and Target
    mapArea.addEventListener("click", function(event){
        console.log(`xCoord: ${event.pageX}, yCoord: ${event.pageY}`);
        //userMailData == -1, Select the source of the letter.
        //userMailData == 1, Select the destination of the letter.
        if(userMailData.continue == -1){
            saveXYcoord(event.pageX, event.pageY);

            //update positioning of circle
            pointInMap.style.left = `${userMailData.xCoord - 12.5}px`;
            pointInMap.style.top = `${userMailData.yCoord - 12.5}px`;
            //show circle
            pointInMap.classList.remove("hidden");

            const continueButton = document.getElementById("continue");
            continueButton.removeAttribute("disabled");
        }
        else {
            saveTargetXY(event.pageX, event.pageY);

            //update positioning of circle
            targetPointInMap.style.left = `${userMailData.x2Coord - 12.5}px`;
            targetPointInMap.style.top = `${userMailData.y2Coord - 12.5}px`;
            //show circle
            targetPointInMap.classList.remove("hidden");
            distance(userMailData);

            const sendMail = document.getElementById("send");
            sendMail.removeAttribute("disabled");
        }

        console.log(userMailData);
        console.log("Area in div is pressed.");

    });
}());