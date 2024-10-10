const addEventOnElem = function (
  elem: NodeListOf<Element> | Element,
  type: string,
  callback: EventListenerOrEventListenerObject
) {
  if (elem instanceof NodeList) {
    elem.forEach((el) => el.addEventListener(type, callback));
  } else {
    elem.addEventListener(type, callback);
  }
};

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]") as HTMLElement | null;
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]") as HTMLElement | null;

const toggleNavbar = function () {
  if (navbar && overlay) {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  }
};

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  if (navbar && overlay) {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
  }
};

addEventOnElem(navbarLinks, "click", closeNavbar);
