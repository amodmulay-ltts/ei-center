/*
 * EI Center — presenter mode keyboard navigation
 * Space / Down / Right → next section
 * Up / Left → previous section
 * Useful for presenting: hands-free section navigation
 */
(function (root) {
  "use strict";

  function boot() {
    var sections = Array.from(document.querySelectorAll(".section"));
    if (!sections.length) return;

    function getCurrentSectionIndex() {
      var scrollPos = root.window.scrollY + root.window.innerHeight / 2;
      for (var i = 0; i < sections.length; i++) {
        var rect = sections[i].getBoundingClientRect();
        var sectionTop = rect.top + root.window.scrollY;
        if (scrollPos < sectionTop + sections[i].offsetHeight) {
          return i;
        }
      }
      return sections.length - 1;
    }

    function scrollToSection(index) {
      if (index < 0 || index >= sections.length) return;
      sections[index].scrollIntoView({ behavior: "smooth", block: "start" });
    }

    root.document.addEventListener("keydown", function (e) {
      var current = getCurrentSectionIndex();
      var key = e.key || e.code;

      /* Next section: Space, ArrowDown, ArrowRight */
      if (key === " " || key === "ArrowDown" || key === "ArrowRight") {
        e.preventDefault();
        scrollToSection(current + 1);
        return;
      }

      /* Previous section: ArrowUp, ArrowLeft */
      if (key === "ArrowUp" || key === "ArrowLeft") {
        e.preventDefault();
        scrollToSection(current - 1);
        return;
      }
    });
  }

  if (root.document.readyState === "loading") {
    root.document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})(this);
