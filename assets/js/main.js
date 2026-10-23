// Theme switch: "light" / "dark" are saved; "auto" clears the choice and follows the system.
(function () {
  var root = document.documentElement;
  var buttons = document.querySelectorAll("[data-theme-choice]");

  function current() {
    return root.dataset.theme || "auto";
  }

  function render() {
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.themeChoice === current()));
    });
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      var choice = b.dataset.themeChoice;
      if (choice === "auto") delete root.dataset.theme;
      else root.dataset.theme = choice;
      try {
        if (choice === "auto") localStorage.removeItem("theme");
        else localStorage.setItem("theme", choice);
      } catch (e) {}
      render();
    });
  });
  render();

  // Highlight the nav link of the section in view.
  var links = {};
  document.querySelectorAll(".nav a[href^='#']").forEach(function (a) {
    links[a.getAttribute("href").slice(1)] = a;
  });
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var link = links[e.target.id];
        if (link && e.isIntersecting) {
          Object.values(links).forEach(function (l) { l.classList.remove("active"); });
          link.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(links).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) spy.observe(el);
    });

    // Fade sections in as they scroll into view.
    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          reveal.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) { reveal.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("visible"); });
  }
})();
