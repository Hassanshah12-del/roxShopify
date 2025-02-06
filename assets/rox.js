function ThumbnailPlugin(main) {
    return (slider) => {
      function removeActive() {
        slider.slides.forEach((slide) => {
          slide.classList.remove("active")
        })
      }
      function addActive(idx) {
        slider.slides[idx].classList.add("active")
      }

      function addClickEvents() {
        slider.slides.forEach((slide, idx) => {
          slide.addEventListener("click", () => {
            main.moveToIdx(idx)
          })
        })
      }

      slider.on("created", () => {
        addActive(slider.track.details.rel)
        addClickEvents()
        main.on("animationStarted", (main) => {
          removeActive()
          const next = main.animator.targetIdx || 0
          addActive(main.track.absToRel(next))
          slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
        })
      })
    }
  }
  var slider = new KeenSlider("#my-keen-slider")
  var thumbnails = new KeenSlider(
    "#thumbnails",
    {
      initial: 0,
      slides: {
        perView: 5,
        spacing: 24,
      },
    },
    [ThumbnailPlugin(this.slider)]
  )

  document.querySelectorAll('.product-list li ,.rb-tab .step-2').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelector('#step-1').style.display = 'none';
        document.querySelector('#step-2').style.display = 'block';
        document.querySelector('.step-2').classList.add('process');
        document.querySelector('#step-2-1').style.display = 'block';
        document.querySelector('#step-2-2').style.display = 'none';
        document.querySelector('#next-step').style.display = 'block';
        document.querySelector('#step-2-3').style.display = 'none';
        if (slider && thumbnails) {
                slider.update();
                thumbnails.update();
        }
    });
});

document.querySelectorAll('.rb-tab .step-1').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelector('#step-1').style.display = 'block';
        document.querySelector('#step-2').style.display = 'none';
        document.querySelector('.step-2').classList.remove('process');
        document.querySelector('.step-2').classList.remove('active');
        document.querySelector('.step-3').classList.remove('process');
        document.querySelector('.step-4').classList.remove('process');
        document.querySelector('#step-3').style.display = 'none';
        document.querySelector('.step-3').classList.remove('active');
        document.querySelector('.step-4').style.pointerEvents = 'auto';
        document.querySelector('#step-2-3').style.display = 'none';
    });
});


document.querySelectorAll('.rb-tab .step-2').forEach(item => {
  item.addEventListener('click', function() {
      document.querySelector('#step-2-1').style.display = 'block';
      document.querySelector('#step-2-2').style.display = 'none';
      document.querySelector('.step-2').classList.add('process');
      document.querySelector('.step-3').classList.remove('process');
      document.querySelector('.step-3').classList.remove('active');
      document.querySelector('#step-3').style.display = 'none';
      document.querySelector('.step-4').classList.remove('process');
      document.querySelector('.step-4').style.pointerEvents = 'auto';
  });
});


function nextStep(){
  document.querySelector('#step-2-3').style.display = 'none';
if(document.querySelector('#step-2-2').style.display == 'none'){
  document.querySelector('#step-2-1').style.display = 'none';
  document.querySelector('#step-2-2').style.display = 'block';
  document.querySelector('.step-2').classList.remove('process');
  document.querySelector('.step-3').classList.add('process');
  document.querySelector('.step-2').classList.add('active');
}
else{
  document.querySelector('#step-1').style.display = 'none';
  document.querySelector('#step-3').style.display = 'block';
  document.querySelector('#step-2').style.display = 'none';
  document.querySelector('.step-3').classList.remove('process');
  document.querySelector('.step-2').classList.remove('process');
  document.querySelector('.step-2').classList.add('active');
  document.querySelector('.step-3').classList.add('active');
  document.querySelector('.step-4').classList.add('process');
}
}


function ringSummary(){
  document.querySelector('#step-3').style.display = 'none';
  document.querySelector('#step-2').style.display = 'block';
  document.querySelector('#step-2-2').style.display = 'none';
  document.querySelector('#step-2-1').style.display = 'none';
  document.querySelector('#next-step').style.display = 'none';
  document.querySelector('.step-4').style.pointerEvents = 'none';
  document.querySelector('#step-2-3').style.display = 'block';
  if (slider && thumbnails) {
    slider.update();
    thumbnails.update();
}
}

document.querySelectorAll('.rb-tab .step-4').forEach(item => {
  item.addEventListener('click', function() {
    document.querySelector('#step-1').style.display = 'none';
    document.querySelector('#step-3').style.display = 'block';
    document.querySelector('#step-2').style.display = 'none';
    document.querySelector('.step-3').classList.remove('process');
    document.querySelector('.step-2').classList.remove('process');
    document.querySelector('.step-2').classList.add('active');
    document.querySelector('.step-3').classList.add('active');
    document.querySelector('.step-4').classList.add('process');
  });
});

document.querySelectorAll('#back-summary-button').forEach(item => {
  item.addEventListener('click', function() {
    document.querySelector('#step-2').style.display = 'none';
    document.querySelector('#step-3').style.display = 'block';
});
});

document.querySelectorAll('.rb-tab .step-3 , #back-button').forEach(item => {
  item.addEventListener('click', function() {
    nextStep();
    document.querySelector('#step-1').style.display = 'none';
    document.querySelector('#step-2').style.display = 'block'
    document.querySelector('#step-3').style.display = 'none';
    document.querySelector('.step-4 , .step-3').classList.remove('process');
    document.querySelector('.').classList.remove('active');
    document.querySelector('.step-3').classList.add('process');
    document.querySelector('#next-step').style.display = 'block';
    document.querySelector('.step-4').style.pointerEvents = 'auto';
    document.querySelector('#step-2-3').style.display = 'none';
    if (slider && thumbnails) {
      slider.update();
      thumbnails.update();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  let headers = document.querySelectorAll("tr.header");

  headers.forEach(header => {
      let nextElement = header.nextElementSibling;

      // Hide all rows initially
      while (nextElement && !nextElement.classList.contains("header")) {
          nextElement.style.display = "none";
          nextElement = nextElement.nextElementSibling;
      }

      header.addEventListener("click", function () {
          // Close all other active sections
          headers.forEach(h => {
              if (h !== this) {
                  h.classList.remove("active"); // Remove active class from other headers
                  let otherArrow = h.querySelector(".togglearrow");
                  if (otherArrow) {
                      otherArrow.classList.remove("active"); // Remove active class from other arrows
                  }

                  let otherRow = h.nextElementSibling;
                  while (otherRow && !otherRow.classList.contains("header")) {
                      otherRow.style.display = "none";
                      otherRow.classList.remove("active-body"); // Remove active class from other rows
                      otherRow = otherRow.nextElementSibling;
                  }
              }
          });

          // Toggle current section
          this.classList.toggle("active");
          let togglearrow = this.querySelector(".togglearrow");
          if (togglearrow) {
              togglearrow.classList.toggle("active");
          }

          let nextElem = this.nextElementSibling;
          while (nextElem && !nextElem.classList.contains("header")) {
              nextElem.style.display = nextElem.style.display === "none" ? "table-row" : "none";
              nextElem.classList.toggle("active-body");
              nextElem = nextElem.nextElementSibling;
          }
      });
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const colors = [
      { name: "Select Moissanite Colour" },
      { name: "D-Colourless", img: "https://themoissanitecompany.com/cdn/shop/files/Colourless_Round_v2.png.png?v=18224178978449191550" },
      { name: "Black", img: "https://themoissanitecompany.com/cdn/shop/files/Black_Round_v2.png.png?v=18224178978449191550" },
      { name: "Champagne 1", img: "https://themoissanitecompany.com/cdn/shop/files/Champagne_1_Round_v2.png.png?v=18224178978449191550" },
      { name: "Champagne 2", img: "https://themoissanitecompany.com/cdn/shop/files/Champagne_2_Round_v2.png.png?v=18224178978449191550" },
      { name: "Champagne 3", img: "https://themoissanitecompany.com/cdn/shop/files/Champagne_3_Round_v2.png.png?v=18224178978449191550" },
      { name: "Emerald Green", img: "https://themoissanitecompany.com/cdn/shop/files/Emerald_Green_Round_v2.png.png?v=18224178978449191550" },
      { name: "Grey", img: "https://themoissanitecompany.com/cdn/shop/files/Grey_Round_v2.png.png?v=18224178978449191550" },
      { name: "Indigo", img: "https://themoissanitecompany.com/cdn/shop/files/Indigo_Round_v2.png.png?v=18224178978449191550" },
      { name: "Ruby", img: "https://themoissanitecompany.com/cdn/shop/files/Ruby_Round_v2.png.png?v=18224178978449191550" },
      { name: "Teal", img: "https://themoissanitecompany.com/cdn/shop/files/Teal_Round_v2.png.png?v=18224178978449191550" },
      { name: "Yellow", img: "https://themoissanitecompany.com/cdn/shop/files/Yellow_Round_v2.png.png?v=18224178978449191550" }
  ];

  document.querySelectorAll(".custom-dropdown").forEach(dropdown => {
      const selectedDiv = dropdown.querySelector(".dropdown-selected span");
      const optionsDiv = dropdown.querySelector(".dropdown-options");

      // Populate dropdown with options
      colors.forEach(color => {
          const option = document.createElement("div");
          option.dataset.value = color.name;

          // Add an image only if it exists
          option.innerHTML = color.img
              ? `<img src="${color.img}" alt="${color.name}"> ${color.name}`
              : `${color.name}`;

          option.addEventListener("click", function () {
              selectedDiv.textContent = color.name; // Update selected text
              optionsDiv.style.display = "none"; // Close dropdown after selection
          });

          optionsDiv.appendChild(option);
      });

      // Toggle dropdown visibility
      dropdown.querySelector(".dropdown-selected").addEventListener("click", function () {
          // Close other dropdowns before opening the clicked one
          document.querySelectorAll(".dropdown-options").forEach(optDiv => {
              if (optDiv !== optionsDiv) optDiv.style.display = "none";
          });

          optionsDiv.style.display = optionsDiv.style.display === "block" ? "none" : "block";
      });

      // Close dropdown when clicking outside
      document.addEventListener("click", function (event) {
          if (!dropdown.contains(event.target)) {
              optionsDiv.style.display = "none";
          }
      });
  });
});

function collapseGrid(me) {
  var content = me.nextElementSibling;
  var textSpan = me.querySelector("span");

  if (content.style.display === "none") {
    content.style.display = "block";
    textSpan.textContent = "Hide Gemstone Information";
  } else {
    content.style.display = "none";
    textSpan.textContent = "More Gemstone Information";
  }
}

function simpleTab(myBtn) {
  let tabs = document.getElementsByClassName("tab");
  for (let i = 0; i < tabs.length; i++) {
      tabs[i].style.display = "none";
  }
  tabs[myBtn].style.display = "block";

  
  let buttons = document.getElementsByClassName("t-btn");
  for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("btn-active");
  }
  
  buttons[myBtn].classList.add("btn-active");
  }

  simpleTab(0);