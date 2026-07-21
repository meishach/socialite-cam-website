document.addEventListener("DOMContentLoaded", function () {
  initCarousel("trustCarousel", "hero-carousel");

  function initCarousel(containerId, folder) {
    var carousel = document.getElementById(containerId);
    if (!carousel) return;

    var MAX_SLIDES = 12;
    var checks = [];
    for (var i = 1; i <= MAX_SLIDES; i++) {
      checks.push(loadSlide(folder, i));
    }
    Promise.all(checks).then(function (images) {
      var slides = images.filter(Boolean);
      if (slides.length === 0) return;
      slides.forEach(function (img, idx) {
        img.className = "carousel-slide" + (idx === 0 ? " active" : "");
        carousel.appendChild(img);
      });
      setRatio(carousel, slides[0]);
      if (slides.length > 1) {
        var current = 0;
        setInterval(function () {
          slides[current].classList.remove("active");
          current = (current + 1) % slides.length;
          slides[current].classList.add("active");
          setRatio(carousel, slides[current]);
        }, 3500);
      }
    });
  }

  function setRatio(carousel, img) {
    if (carousel && img.naturalWidth && img.naturalHeight) {
      carousel.style.aspectRatio = img.naturalWidth + " / " + img.naturalHeight;
    }
  }

  function loadSlide(folder, n) {
    return new Promise(function (resolve) {
      var num = n < 10 ? "0" + n : "" + n;
      var img = new Image();
      img.alt = "Socialite Cam event photo";
      img.onload = function () { resolve(img); };
      img.onerror = function () { resolve(null); };
      img.src = "assets/images/" + folder + "/" + num + ".jpg";
    });
  }

  var stepCards = document.querySelectorAll(".step-card");
  var supportsHover = window.matchMedia && window.matchMedia("(hover: hover)").matches;

  if (!supportsHover && stepCards.length) {
    stepCards.forEach(function (card) {
      card.addEventListener("click", function (e) {
        var alreadyActive = card.classList.contains("active");
        stepCards.forEach(function (c) { c.classList.remove("active"); });
        if (!alreadyActive) {
          card.classList.add("active");
          e.stopPropagation();
        }
      });
    });

    document.addEventListener("click", function () {
      stepCards.forEach(function (c) { c.classList.remove("active"); });
    });
  }

  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });

    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        links.classList.remove("open");
      });
    });
  }
});
