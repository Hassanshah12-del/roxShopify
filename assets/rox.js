document.addEventListener("DOMContentLoaded", function () {
  class ThumbnailPlugin {
    constructor(main) {
      return (slider) => {
        this.slider = slider;
        this.main = main;
        this.init();
      };
    }

    init() {
      this.slider.on("created", () => {
        this.addActive(this.slider.track.details.rel);
        this.addClickEvents();
        this.main.on("animationStarted", (main) => {
          this.removeActive();
          const next = main.animator.targetIdx || 0;
          this.addActive(main.track.absToRel(next));
          this.slider.moveToIdx(Math.min(this.slider.track.details.maxIdx, next));
        });
      });
    }

    removeActive() {
      this.slider.slides.forEach((slide) => slide.classList.remove("active"));
    }

    addActive(idx) {
      this.slider.slides[idx].classList.add("active");
    }

    addClickEvents() {
      this.slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => this.main.moveToIdx(idx));
      });
    }
  }

  const slider = new KeenSlider("#my-keen-slider");
  const thumbnails = new KeenSlider("#thumbnails", { initial: 0, slides: { perView: 5, spacing: 24 } }, [new ThumbnailPlugin(slider)]);

  function toggleStep(currentStep, nextStep) {
    document.querySelector(`#${currentStep}`).style.display = "none";
    document.querySelector(`#${nextStep}`).style.display = "block";
  }

  function updateSlider() {
    if (slider && thumbnails) {
      slider.update();
      thumbnails.update();
    }
  }

  document.querySelectorAll(".product-list li, .rb-tab .step-2").forEach(item => {
    item.addEventListener("click", function () {
      toggleStep("step-1", "step-2");
      document.querySelector(".step-2").classList.add("process");
      document.querySelector("#step-2-1").style.display = "block";
      document.querySelector("#step-2-2").style.display = "none";
      document.querySelector("#next-step").style.display = "block";
      updateSlider();
    });
  });

  document.querySelectorAll(".rb-tab .step-1").forEach(item => {
    item.addEventListener("click", function () {
      toggleStep("step-2", "step-1");
      document.querySelector(".step-2").classList.remove("process", "active");
      document.querySelector(".step-3").classList.remove("process", "active");
      document.querySelector(".step-4").classList.remove("process");
    });
  });

  document.querySelector("#back-summary-button").addEventListener("click", function () {
    toggleStep("step-2", "step-3");
  });

  function collapseGrid(me) {
    let content = me.nextElementSibling;
    let textSpan = me.querySelector("span");
    
    if (content.style.display === "none") {
      content.style.display = "block";
      textSpan.textContent = "Hide Gemstone Information";
    } else {
      content.style.display = "none";
      textSpan.textContent = "More Gemstone Information";
    }
  }

  function simpleTab(myBtn) {
    document.querySelectorAll(".tab").forEach(tab => tab.style.display = "none");
    document.querySelectorAll(".t-btn").forEach(btn => btn.classList.remove("btn-active"));

    document.querySelectorAll(".tab")[myBtn].style.display = "block";
    document.querySelectorAll(".t-btn")[myBtn].classList.add("btn-active");
  }
  simpleTab(0);
});
