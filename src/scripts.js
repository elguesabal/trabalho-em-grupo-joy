document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname.split("/").pop().toLowerCase();
  const navLinks = document.querySelectorAll("header nav ul li a");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href").toLowerCase().split("/").pop();
    if (href === currentPath || (currentPath === "" && href === "home.html")) {
      link.classList.add("active");
    }
  });
});
