"use strict";

// IMAGE CAROUSEL ////////////////////////////////////////////////////
$().ready(function() {
    $("#slick-carousel").slick({
        arrows: true,
        centerPadding: "0px",
        dots: true,
        slidesToShow: 1,
        infinite: false
    });
});

// AJAX REQUEST to the MOCK SERVER (POSTMAN) FOR MERCH DATA
function getMerch() {
    let endpoint = "https://5f8f8d89-d366-4a6f-9377-d14d026af66f.mock.pstmn.io/merch";

    let xhr = new XMLHttpRequest();

    xhr.addEventListener("load", function(data) {
        if(this.status === 200) {
            displayMerch(this.response);
        }
        else {
            document.getElementById("gameResult").innerHTML = "<p>An error occurred with your request. Evaluate the endpoint and try again.</p>"
        }
    });

    xhr.responseType = "json";

    xhr.open("GET", endpoint);

    xhr.send();
}

function displayMerch(data) {

    let merchString = "";
    let randomSelection = Math.floor(Math.random() * 3) + 1;

    for (let item of data) {
        if (randomSelection == item.id) {
            merchString +=
            `<section id="merchPrize">
                <img src="${item.image}" alt="${item.alt}">
                <h4>${item.product}</h4>
            </section>`;
        }
    }
    document.getElementById("gameResult").innerHTML += merchString;
}

// WIN MERCH SECTION //////////////////////////////////////////////////
$(function() {
    $("#gameResult").dialog({
        autoOpen: false,
        show: {
            effect: "pulsate",
            // effect: "bounce",
            // effect: "blind",
            duration: 350
        },
        hide: {
            // effect: "puff",
            effect: "explode",
            duration: 300
        }
    });
    $("#guessButton").on("click", function() {
        $("#gameResult").dialog("open");
    });
});
let guess = document.getElementById('guessButton');

guess.addEventListener('click', function(){
    let randomNum = document.getElementById('randomNum');
    let userRandomNum = randomNum.value.trim();

    let result = document.getElementById('gameResult');

    let computerGuess = Math.floor(Math.random() * 10) + 1;

    // console.log(userRandomNum);

    if(userRandomNum == computerGuess) {
        getMerch();
        result.innerHTML = "<h2>You WIN!</h2>" + "<br>" + "<p>Your Guess: " + userRandomNum + "</p>" + "<p>Winning Number: " + computerGuess + "</p><br>";
    }
    else {
        result.innerHTML = "<h2>You Lose, try again.</h2>" + "<br>" + "<p>Your Guess: " + userRandomNum + "</p>" + "<br>" + "<p>Winning Number: " + computerGuess + "</p>";
    }
});


// PREFERRED METHOD OF CONTACT ////////////////////////////////////////
let phRed = document.getElementById('phRedStar');
let emRed = document.getElementById('emRedStar');
let radioP = document.getElementById('radioPhone');
let radioE = document.getElementById('radioEmail');

    
radioP.addEventListener("change", function() {
    if(radioP.checked){
        emRed.classList.add("hide");
        phRed.classList.remove("hide");
    }
});
radioE.addEventListener("change", function() {
    if(radioE.checked){
        phRed.classList.add("hide");
        emRed.classList.remove("hide");
    }
});

// CONTACT FORM VALIDATION /////////////////////////////////////////////
function formValidation() {
    let firstName = document.getElementById('firstName');
    let lastName = document.getElementById('lastName');
    let phoneNum = document.getElementById('phone');
    let email = document.getElementById('email');
    let radioPhone = document.getElementById('radioPhone');
    let radioEmail = document.getElementById('radioEmail');
    let comments = document.getElementById('comments');
    // let radioContact = document.getElementById('contact').checked = false;
    let errorMessage = document.getElementById('errorMessage');
    let welcomeMessage = document.getElementById('welcomeMessage');
    


    errorMessage.innerHTML = "";
    welcomeMessage.textContent = "";

    let validFirstName = false;
    let validLastName = false;
    let validPhoneNum = false;
    let validEmail = false;
    let validComments = false;
    let validContact = false
    let validForm = false;

    if(radioPhone.classList.contains("error")) {
        radioPhone.classList.remove("error");
    }
    
    let userFirstName = firstName.value.trim();
    let userLastName = lastName.value.trim();
    let userPhoneNum = phoneNum.value.trim();
    let userEmail = email.value.trim();
    let userComments = comments.value.trim();
    // let userContact = radioContact;

    let user = {
        fName: userFirstName,
        lName: userLastName
    };

    if(userFirstName == ""){
        firstName.classList.add("error");
        errorMessage.innerHTML = "<li>Please enter your first name</li>";
    } else {
        if (firstName.classList.contains("error")){
            firstName.classList.remove("error");
        }
        validFirstName = true;
    }
    if(userLastName.length < 1){
        lastName.classList.add("error");
        errorMessage.innerHTML += "<li>Please enter your last name</li>";
    } else {
        if (lastName.classList.contains("error")){
            lastName.classList.remove("error");
        }
        validLastName = true;
    }

    let reph = /^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    let re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;

    if(!radioPhone.checked && !radioEmail.checked){
        // console.log("classList of radioPhone:" + radioPhone.classList);
        radioPhone.classList.add("error");
        radioEmail.classList.add("error");
        errorMessage.innerHTML += "<li>Please select a method of contact</li>";
    } 
    else if (radioPhone.checked && !(reph.test(userPhoneNum))) {
        phoneNum.classList.add("error");
        errorMessage.innerHTML += "<li>Please enter a valid phone number</li>";
    } 
    else if (radioEmail.checked && !(re.test(userEmail))) {
        email.classList.add("error");
        errorMessage.innerHTML += "<li>Please enter a valid email address</li>";
    }
    else {
        if (phoneNum.classList.contains("error")){
            phoneNum.classList.remove("error");
        }
        if (email.classList.contains("error")){
            email.classList.remove("error");
        }
        validContact = true;
    }

    // console.log(radioPhone.checked);
    // console.log(radioEmail.checked);

    if(userComments == ""){
        comments.classList.add("error");
        errorMessage.innerHTML += "<li>Please enter a message</li>";
    } else {
        if (comments.classList.contains("error")){
            comments.classList.remove("error");
        }
        validComments = true;
    }

    if(validFirstName && validLastName && validComments && validContact){
        validForm = true;
    }

    // console.log("validForm: " + validForm);

    if(validForm) {
        errorMessage.classList.add("hide");
        welcomeMessage.textContent = `Welcome to the community ${user.fName} ${user.lName}!`;
    }
}


// LIGHT / DARK MODE ////////////////////////////////////////////////////

let darkMode = document.getElementById('dark-mode');
let lightMode = document.getElementById('light-mode');

// DEFAULT Setting
lightMode.classList.add('hide');

function enterDarkMode() {
    // Implement DARK MODE
    localStorage.setItem('theme', 'dark');
    darkMode.classList.add('hide');
    lightMode.classList.remove('hide');
    $("#serviceImg").attr("src", "images/waveform-dark.png");
    document.querySelector('h1').style.color = "var(--black)";
    document.getElementsByClassName('nav-opt')[0].style.color = "var(--black)";
    document.getElementsByClassName('nav-opt')[1].style.color = "var(--black)";
    document.getElementsByClassName('nav-opt')[2].style.color = "var(--black)";
    document.getElementsByClassName('nav-opt')[3].style.color = "var(--black)";
    document.getElementById('services').style.backgroundColor = "var(--black)";
    document.getElementById('serviceTitle').style.color = "var(--white)";
    document.getElementById('serviceDescription').style.color = "var(--white)";
    document.getElementById('serviceCarousel').style.backgroundColor = "var(--black)";
    document.getElementById('recording').style.color = "var(--white)";
    document.getElementById('mixing').style.color = "var(--white)";
    document.getElementById('mastering').style.color = "var(--white)";
    document.getElementById('recordDesc').style.color = "var(--white)";
    document.getElementById('mixDesc').style.color = "var(--white)";
    document.getElementById('masterDesc').style.color = "var(--white)";
    document.getElementById('contact').style.backgroundColor = "var(--black)";
    document.getElementById('messTitle').style.color = "var(--white)";
    document.getElementById('socialTitle').style.color = "var(--white)";
    document.getElementsByClassName('mode')[0].style.color = "var(--white)";
    document.getElementsByClassName('mode')[1].style.color = "var(--white)";
    document.getElementsByClassName('mode')[2].style.color = "var(--white)";
    document.getElementsByClassName('mode')[3].style.color = "var(--white)";
    document.getElementsByClassName('mode')[4].style.color = "var(--white)";
    document.getElementsByClassName('mode')[5].style.color = "var(--white)";
    document.getElementsByClassName('mode')[6].style.color = "var(--white)";
    document.getElementsByClassName('mode')[7].style.color = "var(--white)";
    document.getElementsByClassName('mode')[8].style.color = "var(--white)";
    document.getElementsByClassName('mode')[9].style.color = "var(--white)";
    document.getElementsByClassName('mode')[10].style.color = "var(--white)";
    document.getElementsByClassName('w-6')[0].style.color = "var(--white)";
    document.getElementsByClassName('w-6')[1].style.color = "var(--white)";
    document.getElementsByClassName('w-6')[2].style.color = "var(--white)";
    document.getElementById('welcomeMessage').style.color = "var(--white)";
    document.querySelector('footer').style.color = "var(--black)";
}

function enterLightMode() {
    // Implement LIGHT MODE
    localStorage.setItem('theme', 'light');
    lightMode.classList.add('hide');
    darkMode.classList.remove('hide');
    $("#serviceImg").attr("src", "images/waveform.png");
    document.querySelector('h1').style.color = "var(--white)";
    document.getElementsByClassName('nav-opt')[0].style.color = "var(--white)";
    document.getElementsByClassName('nav-opt')[1].style.color = "var(--white)";
    document.getElementsByClassName('nav-opt')[2].style.color = "var(--white)";
    document.getElementsByClassName('nav-opt')[3].style.color = "var(--white)";
    document.getElementById('services').style.backgroundColor = "var(--white)";
    document.getElementById('serviceTitle').style.color = "var(--black)";
    document.getElementById('serviceDescription').style.color = "var(--black)";
    document.getElementById('serviceCarousel').style.backgroundColor = "var(--white)";
    document.getElementById('recording').style.color = "var(--black)";
    document.getElementById('mixing').style.color = "var(--black)";
    document.getElementById('mastering').style.color = "var(--black)";
    document.getElementById('recordDesc').style.color = "var(--black)";
    document.getElementById('mixDesc').style.color = "var(--black)";
    document.getElementById('masterDesc').style.color = "var(--black)";
    document.getElementById('contact').style.backgroundColor = "var(--white)";
    document.getElementById('messTitle').style.color = "var(--black)";
    document.getElementById('socialTitle').style.color = "var(--black)";
    document.getElementsByClassName('mode')[0].style.color = "var(--black)";
    document.getElementsByClassName('mode')[1].style.color = "var(--black)";
    document.getElementsByClassName('mode')[2].style.color = "var(--black)";
    document.getElementsByClassName('mode')[3].style.color = "var(--black)";
    document.getElementsByClassName('mode')[4].style.color = "var(--black)";
    document.getElementsByClassName('mode')[5].style.color = "var(--black)";
    document.getElementsByClassName('mode')[6].style.color = "var(--black)";
    document.getElementsByClassName('mode')[7].style.color = "var(--black)";
    document.getElementsByClassName('mode')[8].style.color = "var(--black)";
    document.getElementsByClassName('mode')[9].style.color = "var(--black)";
    document.getElementsByClassName('mode')[10].style.color = "var(--black)";
    document.getElementsByClassName('w-6')[0].style.color = "var(--black)";
    document.getElementsByClassName('w-6')[1].style.color = "var(--black)";
    document.getElementsByClassName('w-6')[2].style.color = "var(--black)";
    document.getElementById('welcomeMessage').style.color = "var(--black)";
    document.querySelector('footer').style.color = "var(--white)";
}

darkMode.addEventListener('click', enterDarkMode);
lightMode.addEventListener('click', enterLightMode) 

let obj = localStorage.getItem('theme');

if (obj === 'dark') {
    enterDarkMode(); 
}
if (obj === "light") {
    enterLightMode();
}

let formSubmission = document.getElementById('formSubmit');

formSubmission.addEventListener('click', function(event){
    
    formValidation();

    event.preventDefault();
});