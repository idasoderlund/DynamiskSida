function fetchData() {
  fetch("./data.json") //Kolla om det var såhär man hämtade script filen. står att om filerna ligger i samma mapp så ska man ange utan snestreck
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const workExperienceContainer = document.querySelector(".workExperience");
      const educationContainer = document.querySelector(".education");
      const computerSkillsContainer = document.querySelector(".computerSkills");

      //lägger till arbetslivserfarenhet
      let workExperienceHTML = "<h2>Anställningar:</h2>";
      data.workExperience.forEach((work) => {
        workExperienceHTML += `
            <article>
                <h4 class="cvTitles">${work.company}<br />${work.dates}</h4>
                <p>${work.status}<br />${work.position},<br />${work.department}</p>
            </article>
            `;
      });
      workExperienceContainer.innerHTML = workExperienceHTML;

      //lägger till utbildningarna
      let educationHTML = "<h2>Utbildningar:</h2>";
      data.education.forEach((edu) => {
        educationHTML += `
            <article>
                <h4 class="cvTitles">${edu.program}<br />${edu.dates}</h4>
                <p>${edu.type} - ${edu.institution}</p>
            </article>
            `;
      });
      educationContainer.innerHTML = educationHTML;

      //lägger till datorkunskap
      let skillsHTML = "<h2>Datorkunskaper:</h2>";
      skillsHTML += `<article><p>${data.computerSkills.join("<br />")}</p>
            </article>`;
      computerSkillsContainer.innerHTML = skillsHTML;

      initSlideshow();
    })
    .catch((error) => console.error("Error loading the JSON data:", error));
}
//LÄGG IN TOGGLERUTA HÄR
//Denna kod är egenskriven för att dölja samt visa information gällande språkkunskap i cv.

function initToggleLanguages() {
  const toggleButton = document.getElementById("toggleLanguages");

  // Kontrollera om toggleButton finns innan vi försöker registrera en event listener
  if (toggleButton) {
    console.log("Toggle button found, initializing toggle for languages.");

    toggleButton.addEventListener("click", function () {
      let languageList = document.getElementById("languageList");
      if (languageList) {
        languageList.style.display =
          languageList.style.display === "none" ? "block" : "none";
      } else {
        console.warn("Language list not found");
      }
    });
  } else {
    console.warn("Toggle button is not found, skipping toggle initialization.");
  }
}
document.addEventListener("DOMContentLoaded", function () {
  initToggleLanguages();
  fetchData();
});

//LÄGGER IN BILDSPELET HÄR ME KOLLA UPP VART I JS FILEN SOM DEN SKA VARA PLACERAD EGENTLIGEN
//Denna kod är inspirerad av extern kod. Lösningen som min kod baseras på är inspirerad av W3Schools.
//källan: https://www.w3schools.com/howto/howto_js_slideshow.asp

function initSlideshow() {
  let slideIndex = 1;
  showSlides(slideIndex);

  window.plusSlides = function (n) {
    showSlides((slideIndex += n));
  };

  window.currentSlide = function (n) {
    showSlides((slideIndex = n));
  };

  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < dots.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  }
}
