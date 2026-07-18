/* ==================================================
   MOBILE NAVIGATION
================================================== */


const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");



hamburger.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});



/*
Close mobile menu when clicking a link
*/

document.querySelectorAll(".nav-links a")
.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});





/* ==================================================
   NAVBAR SCROLL EFFECT
================================================== */


const navbar = document.querySelector(".navbar");


window.addEventListener("scroll", () => {


    if(window.scrollY > 80){

        navbar.classList.add("scrolled");

    }

    else {

        navbar.classList.remove("scrolled");

    }


});





/* ==================================================
   LANGUAGE SYSTEM
================================================== */


let currentLanguage = "fr";



const languageFiles = {

    en: "lang/en.json",

    fr: "lang/fr.json"

};



async function loadLanguage(language){


    try {


        const response = await fetch(languageFiles[language]);


        const translations = await response.json();



        document.querySelectorAll("[data-lang]")
        .forEach(element => {


            const key = element.dataset.lang;


            if(translations[key]){

                element.textContent = translations[key];

            }


        });



        currentLanguage = language;



        localStorage.setItem(
            "language",
            language
        );



    }


    catch(error){

        console.error(
            "Language loading error:",
            error
        );

    }


}





/* ==================================================
   LANGUAGE BUTTONS
================================================== */


document
.querySelectorAll(".language-switch button")
.forEach(button => {


    button.addEventListener("click", () => {


        document
        .querySelectorAll(".language-switch button")
        .forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


    });


});



/* ==================================================
   INITIAL LANGUAGE LOAD
================================================== */


const savedLanguage =
localStorage.getItem("language");



if(savedLanguage){

    loadLanguage(savedLanguage);

}

else {

    loadLanguage("fr");

}