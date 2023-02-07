let statElements = document.querySelectorAll(".stat-box .text span");
let statContainer = document.querySelector(".stat");
let skillsContainer = document.querySelector(".skill-sec");
let skillsProgressSpans = document.querySelectorAll(
  ".skill-sec .skills .prog span"
);
let dropDownLink = document.querySelector("header nav .toggle-menu");
let megaMenu = document.querySelector("header .container nav ul");
dropDownLink.addEventListener("click", function (e) {
  e.currentTarget.classList.toggle("open");
});
let switcherElements = document.querySelectorAll(".portfolio .shuffle li");
let galleryElements = document.querySelectorAll(
  ".portfolio .image-container .box"
);
let increaseCountOnScrollStats = increaseCountOnScroll(
  statContainer,
  statElements,
  800
);
window.addEventListener("scroll", () => {
  // stats Element
  increaseCountOnScrollStats();
  // skills Element
  setElementWidthOnScroll(skillsContainer, skillsProgressSpans);
});

document.addEventListener("click", (e) => {
  switcherElements.forEach((switcherEl) => {
    if (e.target === switcherEl && !switcherEl.classList.contains("active")) {
      switchElementHandler(e.target);
    }
  });
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

function increaseCountOnScroll(section, numberSpans, offsetToStart) {
  let startFlag = false;
  // Closure
  return function () {
    // out of scrolling zone ==> startFlag false, back numbers to 0
    if (window.scrollY < section.offsetTop - offsetToStart) {
      startFlag = false;
      numberSpans.forEach((numSpan) => {
        numSpan.textContent = "0";
      });
      return;
    }
    // in scrolling zone ==> increase element Count + startFlag True
    if (!startFlag) {
      numberSpans.forEach((numSpan) => {
        let increaseFunc = increaseElementCount(numSpan);
        let count = setInterval(() => {
          increaseFunc(count);
        }, 800 / numSpan.dataset.goal);
      });
      startFlag = true;
    }
  };
}
function increaseElementCount(element) {
  let goal = element.dataset.goal;
  // Closure
  return function startIncrease(count) {
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
  };
}

function switchElementHandler(element) {
  removeActiveFromAllSwitchers();
  addClassActiveToCurrentSwitcherElement(element);
  displaySelectedCategoryGalleryElements(element);
}

function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
async function removeGalleryElements() {
  galleryElements.forEach((galleryEl) => {
    galleryEl.classList.add("shrink");
  });
  await wait(200);
  galleryElements.forEach((galleryEl_1) => {
    galleryEl_1.style.display = "none";
  });
}

async function displaySelectedCategoryGalleryElements(element) {
  await removeGalleryElements();
  document.querySelectorAll(element.dataset.filter).forEach((element) => {
    element.style.display = "block";
  });
  await wait(100);
  document.querySelectorAll(element.dataset.filter).forEach((element) => {
    element.classList.remove("shrink");
  });
}
function removeActiveFromAllSwitchers() {
  switcherElements.forEach((switcherEl) =>
    switcherEl.classList.remove("active")
  );
}
function addClassActiveToCurrentSwitcherElement(element) {
  element.classList.add("active");
}
