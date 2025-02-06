function ThumbnailPlugin(main) {
  return (slider) => {
      function toggleActive(idx) {
          slider.slides.forEach(slide => slide.classList.remove("active"));
          slider.slides[idx]?.classList.add("active");
      }

      slider.on("created", () => {
          toggleActive(slider.track.details.rel);
          slider.slides.forEach((slide, idx) => {
              slide.addEventListener("click", () => main.moveToIdx(idx));
          });
          main.on("animationStarted", (main) => {
              toggleActive(main.track.absToRel(main.animator.targetIdx || 0));
              slider.moveToIdx(Math.min(slider.track.details.maxIdx, main.animator.targetIdx || 0));
          });
      });
  };
}

const slider = new KeenSlider("#my-keen-slider");
const thumbnails = new KeenSlider("#thumbnails", {
  initial: 0,
  slides: { perView: 5, spacing: 24 }
}, [ThumbnailPlugin(slider)]);

function updateSlider() {
  if (slider && thumbnails) {
      slider.update();
      thumbnails.update();
  }
}

function showStep(stepToShow, stepsToHide = []) {
  document.querySelector(stepToShow).style.display = 'block';
  stepsToHide.forEach(step => document.querySelector(step).style.display = 'none');
  updateSlider();
}

function toggleClass(selector, className, add = true) {
  document.querySelector(selector)?.classList[add ? 'add' : 'remove'](className);
}

// Step Navigation Handlers
document.querySelectorAll('.product-list li, .rb-tab .step-2').forEach(item => {
  item.addEventListener('click', () => {
      showStep('#step-2', ['#step-1']);
      toggleClass('.step-2', 'process');
      showStep('#step-2-1', ['#step-2-2', '#step-2-3']);
      toggleClass('#next-step', 'hidden', false);
  });
});

document.querySelectorAll('.rb-tab .step-1').forEach(item => {
  item.addEventListener('click', () => {
      showStep('#step-1', ['#step-2', '#step-3']);
      ['step-2', 'step-3', 'step-4'].forEach(step => toggleClass(`.${step}`, 'process', false));
  });
});

document.querySelectorAll('.rb-tab .step-4').forEach(item => {
  item.addEventListener('click', () => {
      showStep('#step-3', ['#step-1', '#step-2']);
      toggleClass('.step-4', 'process');
  });
});

document.querySelectorAll('#back-summary-button').forEach(item => {
  item.addEventListener('click', () => showStep('#step-3', ['#step-2']));
});

document.querySelectorAll('.rb-tab .step-3, #back-button').forEach(item => {
  item.addEventListener('click', () => {
      showStep('#step-2', ['#step-1', '#step-3']);
      toggleClass('.step-3', 'process');
      toggleClass('#next-step', 'hidden', false);
  });
});

// Table Row Expand/Collapse
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("tr.header").forEach(header => {
      let rows = [];
      for (let next = header.nextElementSibling; next && !next.classList.contains("header"); next = next.nextElementSibling) {
          rows.push(next);
          next.style.display = "none";
      }
      header.addEventListener("click", function () {
          this.classList.toggle("active");
          rows.forEach(row => row.style.display = row.style.display === "none" ? "table-row" : "none");
      });
  });
});

// Custom Dropdown
document.addEventListener("DOMContentLoaded", function () {
  const colors = [
      { name: "Select Moissanite Colour" },
      { name: "D-Colourless", img: "https://themoissanitecompany.com/cdn/shop/files/Colourless_Round_v2.png.png?v=18224178978449191550" },
      { name: "Black", img: "https://themoissanitecompany.com/cdn/shop/files/Black_Round_v2.png.png?v=18224178978449191550" }
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

      dropdown.querySelector(".dropdown-selected").addEventListener("click", () => {
          optionsDiv.style.display = optionsDiv.style.display === "block" ? "none" : "block";
      });

      document.addEventListener("click", event => {
          if (!dropdown.contains(event.target)) optionsDiv.style.display = "none";
      });
  });
});

// Collapse Grid Function
function collapseGrid(me) {
  const content = me.nextElementSibling;
  const textSpan = me.querySelector("span");
  content.style.display = content.style.display === "none" ? "block" : "none";
  textSpan.textContent = content.style.display === "block" ? "Hide Gemstone Information" : "More Gemstone Information";
}

// Simple Tabs
function simpleTab(myBtn) {
  document.querySelectorAll(".tab").forEach((tab, index) => {
      tab.style.display = index === myBtn ? "block" : "none";
  });
  document.querySelectorAll(".t-btn").forEach((btn, index) => {
      btn.classList.toggle("btn-active", index === myBtn);
  });
}
simpleTab(0);
