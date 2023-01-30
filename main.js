let statElements = document.querySelectorAll(".stat-box .text span");
let statContainer = document.querySelector(".stat");
let skillsContainer = document.querySelector(".skill-sec");
let skillsProgressSpans = document.querySelectorAll(
  ".skill-sec .skills .prog span"
);
let startFlags = [false];
let dropDownLink = document.querySelector("header nav .toggle-menu");
let megaMenu = document.querySelector("header .container nav ul");
dropDownLink.addEventListener("click", function (e) {
  e.currentTarget.classList.toggle("open");
});

window.addEventListener("scroll", () => {
  // stats Element
  increaseCountOnScroll(statContainer, statElements, 0, 800);
  // skills Element
  setElementWidthOnScroll(skillsContainer, skillsProgressSpans);
});

function setElementWidthOnScroll(section, spans) {
  // in scrolling zone ==> fill progress
  if (window.scrollY >= section.offsetTop - 300) {
    spans.forEach((span) => {
      span.style.width = span.dataset.progress;
      span.classList.add("reached");
    });
    return;
  }
  // out of scrolling zone ==> unfill progress
  spans.forEach((span) => {
    span.style.width = "0";
    span.classList.remove("reached");
  });
}

function increaseCountOnScroll(section, numberSpans, index, offsetToStart) {
  // out of scrolling zone ==> startFlag false, back numbers to 0
  if (window.scrollY < section.offsetTop - offsetToStart) {
    startFlags[index] = false;
    numberSpans.forEach((numSpan) => {
      numSpan.textContent = "0";
    });
    return;
  }
  // in scrolling zone ==> increase element Count + startFlag True
  if (!startFlags[index]) {
    numberSpans.forEach((numSpan) => increaseElementCount(numSpan, index));
    startFlags[index] = true;
  }
}

function increaseElementCount(element) {
  let goal = element.dataset.goal;
  let count = setInterval(startIncrease, 800 / goal);
  function startIncrease() {
    if (element.textContent.replace(",", "") == goal) {
      clearInterval(count);
      return;
    }
    element.textContent = element.textContent.replace(",", "");
    element.textContent++;
    if (element.textContent.length > 3) {
      element.textContent = `${element.textContent.slice(
        0,
        element.textContent.length - 3
      )},${element.textContent.slice(element.textContent.length - 3)}`;
    }
  }
}
