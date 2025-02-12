fetch("/data.json") //Kolla om det var såhär man hämtade script filen
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

    //lägger till datorkunskap
    const skillsArticle = `
            <article>
                <p>${data.computerSkills.join("<br />")}</p>
            </article>
            `;
    computerSkillsContainer.innerHTML = skillsArticle;
  })
  .catch((error) => console.error("Error loading the JSON data:", error));
