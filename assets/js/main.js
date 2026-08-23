(function () {
  "use strict";

  var WHATSAPP_NUMBER = "919512222899";

  /* Sticky header shadow on scroll */
  var header = document.getElementById("siteHeader");
  var topbar = document.getElementById("topbar");
  function onScroll() {
    var scrolled = window.scrollY > 12;
    header.classList.toggle("scrolled", scrolled);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile nav toggle */
  var hamburger = document.getElementById("hamburger");
  var mobileNav = document.getElementById("mobileNav");
  hamburger.addEventListener("click", function () {
    var isOpen = mobileNav.classList.toggle("open");
    hamburger.classList.toggle("active", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
  mobileNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      mobileNav.classList.remove("open");
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  /* FAQ accordion */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var question = item.querySelector(".faq-question");
    question.addEventListener("click", function () {
      var wasOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (openItem) {
        if (openItem !== item) openItem.classList.remove("open");
      });
      item.classList.toggle("open", !wasOpen);
    });
  });

  /* Scroll reveal animation (progressive enhancement: content is visible by
     default in CSS; this only arms the fade-in, and a timeout safety net
     guarantees nothing is left permanently hidden if the observer misses it) */
  var revealEls = document.querySelectorAll(".reveal-up");
  if ("IntersectionObserver" in window && revealEls.length) {
    document.documentElement.classList.add("js-anim");

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px 0px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });

    setTimeout(function () {
      revealEls.forEach(function (el) { el.classList.add("in-view"); });
    }, 2500);
  }

  /* Demo form -> WhatsApp handoff */
  var demoForm = document.getElementById("demoForm");
  if (demoForm) {
    demoForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = demoForm.studentName.value.trim();
      var standard = demoForm.standard.value.trim();
      var subjects = demoForm.subjects.value.trim();
      var phone = demoForm.phone.value.trim();
      var date = demoForm.demoDate.value;
      var message = demoForm.message.value.trim();

      var lines = [
        "Hi Elite Commerce, I'd like to book a FREE demo class.",
        "",
        "Student Name: " + name,
        "Standard: " + standard,
        "Subjects: " + (subjects || "-"),
        "Phone: " + phone,
        "Preferred Demo Date: " + (date || "-"),
        "Message: " + (message || "-")
      ];

      var text = encodeURIComponent(lines.join("\n"));
      window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + text, "_blank", "noopener");
    });
  }
})();
