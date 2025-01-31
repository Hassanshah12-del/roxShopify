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

        if (slider && thumbnails) {
            setTimeout(() => {
                slider.update();
                thumbnails.update();
            }, 300);
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
    });
});


document.querySelectorAll('.rb-tab .step-2').forEach(item => {
  item.addEventListener('click', function() {
      document.querySelector('#step-2-1').style.display = 'block';
      document.querySelector('#step-2-2').style.display = 'none';
      document.querySelector('.step-2').classList.add('process');
      document.querySelector('.step-3').classList.remove('process');
  });
});

document.querySelectorAll('.rb-tab .step-2').forEach(item => {
  item.addEventListener('click', function()
function nextStep(){
  document.querySelector('#step-2-1').style.display = 'none';
  document.querySelector('#step-2-2').style.display = 'block';
  document.querySelector('.step-2').classList.remove('process');
  document.querySelector('.step-3').classList.add('process');
  document.querySelector('.step-2').classList.add('active');
}