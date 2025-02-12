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

function setDisplay(selectors, displayValue) {
  document.querySelectorAll(selectors).forEach(el => el.style.display = displayValue);
}

function toggleClass(selectors, action, className) {
  document.querySelectorAll(selectors).forEach(el => el.classList[action](className));
}

document.querySelectorAll('.product-list li, .rb-tab .step-2').forEach(item => {
  item.addEventListener('click', function () {
      setDisplay('#step-1', 'none');
      setDisplay('#step-2, #step-2-1, #next-step', 'block');
      setDisplay('#step-2-2, #step-2-3', 'none');
      toggleClass('.step-2', 'add', 'process');

      if (slider && thumbnails) {
          slider.update();
          thumbnails.update();
      }
  });
});

document.querySelectorAll('.rb-tab .step-1').forEach(item => {
  item.addEventListener('click', function () {
      setDisplay('#step-1', 'block');
      setDisplay('#step-2, #step-3, #step-2-3', 'none');
      toggleClass('.step-2, .step-3, .step-4', 'remove', 'process');
      toggleClass('.step-2, .step-3', 'remove', 'active');
      document.querySelector('.step-4').style.pointerEvents = 'auto';
  });
});

document.querySelectorAll('.rb-tab .step-2').forEach(item => {
  item.addEventListener('click', function () {
      setDisplay('#step-2-1', 'block');
      setDisplay('#step-2-2, #step-3', 'none');
      toggleClass('.step-2', 'add', 'process');
      toggleClass('.step-3, .step-4', 'remove', 'process');
      toggleClass('.step-3', 'remove', 'active');
      document.querySelector('.step-4').style.pointerEvents = 'auto';
  });
});

function nextStep() {
  setDisplay('#step-2-3', 'none');

  if (document.querySelector('#step-2-2').style.display === 'none') {
      setDisplay('#step-2-1', 'none');
      setDisplay('#step-2-2', 'block');
      toggleClass('.step-2', 'remove', 'process');
      toggleClass('.step-3', 'add', 'process');
      toggleClass('.step-2', 'add', 'active');
  } else {
      setDisplay('#step-1, #step-2', 'none');
      setDisplay('#step-3', 'block');
      toggleClass('.step-2, .step-3', 'remove', 'process');
      toggleClass('.step-2, .step-3', 'add', 'active');
      toggleClass('.step-4', 'add', 'process');
  }
}

function ringSummary() {
  setDisplay('#step-3', 'none');
  setDisplay('#step-2-2, #step-2-1, #next-step', 'none');
  setDisplay('#step-2, #step-2-3', 'block');
  document.querySelector('.step-4').style.pointerEvents = 'none';

  if (slider && thumbnails) {
      slider.update();
      thumbnails.update();
  }
}

document.querySelectorAll('.rb-tab .step-4').forEach(item => {
  item.addEventListener('click', function () {
      setDisplay('#step-1, #step-2', 'none');
      setDisplay('#step-3', 'block');
      toggleClass('.step-2, .step-3', 'remove', 'process');
      toggleClass('.step-2, .step-3', 'add', 'active');
      toggleClass('.step-4', 'add', 'process');
  });
});

document.querySelectorAll('#back-summary-button').forEach(item => {
  item.addEventListener('click', function () {
      setDisplay('#step-2', 'none');
      setDisplay('#step-3', 'block');
  });
});

document.querySelectorAll('.rb-tab .step-3, #back-button').forEach(item => {
  item.addEventListener('click', function () {
      nextStep();
      setDisplay('#step-1, #step-3', 'none');
      setDisplay('#step-2, #next-step', 'block');
      toggleClass('.step-3', 'remove', 'active');
      toggleClass('.step-3', 'add', 'process');
      toggleClass('.step-4', 'remove', 'process');
      document.querySelector('.step-4').style.pointerEvents = 'auto';
      setDisplay('#step-2-3', 'none');

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

  function openPopup(content) {
    document.getElementById('popup-text').innerHTML = content;
    document.getElementById('birthstones-popup').style.display = 'flex';
    const addButton = document.querySelector(".add-ring-btn");
    if (addButton) {
        addButton.addEventListener("click", function () {
            addToBoxesWithShift(this.getAttribute("data-image"));
            closePopup();
        });
    }
}

// Close popup when clicking on background or close button
function closePopup(event) {
  if (!event || event.target.id === "birthstones-popup" || event.target.classList.contains("close")) {
    document.getElementById('birthstones-popup').style.display = 'none';
}
}

function addToBoxesWithShift(imageSrc) {
  const boxes = document.querySelectorAll(".birthstone-selection-blocks .box");
  let images = [];

  // Store current images in an array
  boxes.forEach(box => {
      let img = box.querySelector("img");
      images.push(img ? img.src : null);
  });

  // Add new image at the last box, shifting others if full
  if (images.includes(null)) {
      let emptyIndex = images.indexOf(null);
      images[emptyIndex] = imageSrc;
  } else {
      images.shift(); // Remove first image
      images.push(imageSrc); // Add new image at the end
  }

  // Refill the boxes with updated images
  updateBoxes(images);
}

// Function to update the boxes after changes
function updateBoxes(images) {
  const boxes = document.querySelectorAll(".birthstone-selection-blocks .box");

  boxes.forEach((box, index) => {
      box.innerHTML = "";
      if (images[index]) {
          const newImage = document.createElement("img");
          newImage.src = images[index];
          newImage.alt = "Selected Birthstone";

          const closeButton = document.createElement("button");
          closeButton.innerHTML = '<svg focusable="false" width="14" height="14" viewBox="0 0 14 14"><path d="M13 13L1 1M13 1L1 13" stroke="currentColor" stroke-width="" fill="none"></path></svg>';
          closeButton.classList.add("close-btn");
          closeButton.style.display = "none"; // Initially hidden
          closeButton.addEventListener("click", function (event) {
              event.stopPropagation(); // Prevent box click event
              removeImageFromBox(index);
          });

          box.appendChild(newImage);
          box.appendChild(closeButton);
      }
  });

  // Attach event listener to show close button when clicking a box
  boxes.forEach(box => {
      box.addEventListener("click", function () {
          document.querySelectorAll(".close-btn").forEach(btn => {
              btn.style.display = "none"; // Hide all close buttons
          });

          const closeBtn = box.querySelector(".close-btn");
          if (closeBtn) {
              closeBtn.style.display = "block"; // Show only the clicked box’s close button
          }
      });
  });
}

// Function to remove an image and shift other images forward
function removeImageFromBox(index) {
  const boxes = document.querySelectorAll(".birthstone-selection-blocks .box");
  let images = [];

  // Store current images in an array
  boxes.forEach(box => {
      let img = box.querySelector("img");
      images.push(img ? img.src : null);
  });

  // Remove the selected image and shift others forward
  images.splice(index, 1);
  images.push(null); // Add an empty space at the end

  // Update the boxes with shifted images
  updateBoxes(images);
}