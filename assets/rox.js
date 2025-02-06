function ThumbnailPlugin(main) {
  return (slider) => {
      function updateActive(idx) {
          slider.slides.forEach(slide => slide.classList.remove("active"));
          slider.slides[idx]?.classList.add("active");
      }
      
      slider.on("created", () => {
          updateActive(slider.track.details.rel);
          slider.slides.forEach((slide, idx) => {
              slide.addEventListener("click", () => main.moveToIdx(idx));
          });
          main.on("animationStarted", (main) => {
              updateActive(main.track.absToRel(main.animator.targetIdx || 0));
              slider.moveToIdx(Math.min(slider.track.details.maxIdx, main.animator.targetIdx || 0));
          });
      });
  };
}

const slider = new KeenSlider("#my-keen-slider");
const thumbnails = new KeenSlider("#thumbnails", { initial: 0, slides: { perView: 5, spacing: 24 } }, [ThumbnailPlugin(slider)]);

function updateStepDisplay(stepToShow, stepToHide) {
  document.querySelector(stepToHide).style.display = "none";
  document.querySelector(stepToShow).style.display = "block";
  slider?.update();
  thumbnails?.update();
}

document.querySelectorAll('.product-list li, .rb-tab .step-2').forEach(item => item.addEventListener('click', () => updateStepDisplay('#step-2', '#step-1')));
document.querySelectorAll('.rb-tab .step-1').forEach(item => item.addEventListener('click', () => updateStepDisplay('#step-1', '#step-2')));
document.querySelectorAll('.rb-tab .step-4').forEach(item => item.addEventListener('click', () => updateStepDisplay('#step-3', '#step-2')));
document.querySelectorAll('#back-summary-button').forEach(item => item.addEventListener('click', () => updateStepDisplay('#step-3', '#step-2')));
document.querySelectorAll('.rb-tab .step-3, #back-button').forEach(item => item.addEventListener('click', () => updateStepDisplay('#step-2', '#step-3')));

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("tr.header").forEach(header => {
      let nextElement = header.nextElementSibling;
      while (nextElement && !nextElement.classList.contains("header")) {
          nextElement.style.display = "none";
          nextElement = nextElement.nextElementSibling;
      }
      header.addEventListener("click", function () {
          document.querySelectorAll("tr.header").forEach(h => {
              if (h !== this) h.classList.remove("active");
          });
          this.classList.toggle("active");
          let nextElem = this.nextElementSibling;
          while (nextElem && !nextElem.classList.contains("header")) {
              nextElem.style.display = nextElem.style.display === "none" ? "table-row" : "none";
              nextElem = nextElem.nextElementSibling;
          }
      });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const colors = [
      { name: "Select Moissanite Colour" },
      { name: "D-Colourless", img: "https://themoissanitecompany.com/cdn/shop/files/Colourless_Round_v2.png.png" },
      { name: "Black", img: "https://themoissanitecompany.com/cdn/shop/files/Black_Round_v2.png.png" }
  ];
  document.querySelectorAll(".custom-dropdown").forEach(dropdown => {
      const selectedDiv = dropdown.querySelector(".dropdown-selected span");
      const optionsDiv = dropdown.querySelector(".dropdown-options");
      colors.forEach(color => {
          const option = document.createElement("div");
          option.dataset.value = color.name;
          option.innerHTML = color.img ? `<img src="${color.img}" alt="${color.name}"> ${color.name}` : color.name;
          option.addEventListener("click", function () {
              selectedDiv.textContent = color.name;
              optionsDiv.style.display = "none";
          });
          optionsDiv.appendChild(option);
      });
      dropdown.querySelector(".dropdown-selected").addEventListener("click", function () {
          document.querySelectorAll(".dropdown-options").forEach(optDiv => optDiv !== optionsDiv && (optDiv.style.display = "none"));
          optionsDiv.style.display = optionsDiv.style.display === "block" ? "none" : "block";
      });
      document.addEventListener("click", function (event) {
          if (!dropdown.contains(event.target)) optionsDiv.style.display = "none";
      });
  });
});

function collapseGrid(me) {
  const content = me.nextElementSibling;
  const textSpan = me.querySelector("span");
  const isHidden = content.style.display === "none";
  content.style.display = isHidden ? "block" : "none";
  textSpan.textContent = isHidden ? "Hide Gemstone Information" : "More Gemstone Information";
}

function simpleTab(myBtn) {
  document.querySelectorAll(".tab").forEach(tab => tab.style.display = "none");
  document.getElementsByClassName("tab")[myBtn].style.display = "block";
  document.querySelectorAll(".t-btn").forEach(btn => btn.classList.remove("btn-active"));
  document.getElementsByClassName("t-btn")[myBtn].classList.add("btn-active");
}
simpleTab(0);
