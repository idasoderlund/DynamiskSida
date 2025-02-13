function fetchData() {
  fetch("/data.json") //Kolla om det var såhär man hämtade script filen. står att om filerna ligger i samma mapp så ska man ange utan snestreck
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const workExperienceContainer = document.querySelector(".workExperience");
      const educationContainer = document.querySelector(".education");
      const languagesContainer = document.querySelector(".languages");
      const computerSkillsContainer = document.querySelector(".computerSkills");

      //lägger till arbetslivserfarenhet
      let workExperienceHTML = "";
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
      let educationHTML = "";
      data.education.forEach((edu) => {
        educationHTML += `
            <article>
                <h4 class="cvTitles">${edu.program}<br />${edu.dates}</h4>
                <p>${edu.type} - ${edu.institution}</p>
            </article>
            `;
      });
      educationContainer.innerHTML = educationHTML;

      //lägger till språken
      let languagesHTML = "";
      data.languages.forEach((lang) => {
        languagesHTML += `
            <article>
                <h4 class="cvTitles">${lang.language}:<br /></h4>
                <p>${lang.level}</p> 
            </article>
            `;
      });
      languagesContainer.innerHTML = languagesHTML;

      //Lägger in JS för min interaktiva togglefunktion här, kolla upp vart i filen den ska placeras egentligen

      document.getElementById("toggleLanguages").onclick = function () {
        let languageList = document.getElementById("languageList");
        if (languageList.style.display === "none") {
          languageList.style.display = "block";
        } else {
          languageList.style.display = "none";
        }
      };
      //--------------------------------------------------------------------------
      //lägger till datorkunskap
      const skillsArticle = `
            <article>
                <p>${data.computerSkills.join("<br />")}</p>
            </article>
            `;
      computerSkillsContainer.innerHTML = skillsArticle;
    })
    .catch((error) => console.error("Error loading the JSON data:", error));

  //LÄGGER IN BILDSPELET HÄR ME KOLLA UPP VART I JS FILEN SOM DEN SKA VARA PLACERAD EGENTLIGEN
  let slideIndex = 1;
  showSlides(slideIndex);

  function plusSlides(n) {
    showSlides((slideIndex += n));
  }

  function currentSlide(n) {
    showSlides((slideIndex = n));
  }

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
  //-------------------------------------------------------------------
}

document.addEventListener("DOMContentLoaded", fetchData);
