//---start common---
function showHiddenClass(pram1, pram2, element) {
  if (pram1 > pram2) {
    element.classList.add("is-active");
  } else {
    element.classList.remove("is-active");
  }
}
//---end common---

//when scroll - show background header
function changeBcgHeader() {
  document.addEventListener("scroll", () => {
    let header = document.querySelector(".header");
    let slider = document.querySelector(".slider");
    let heightSlider = slider.clientHeight - header.clientHeight;
    let heightScroll = window.pageYOffset;
    showHiddenClass(heightScroll, heightSlider, header);
  });
}
changeBcgHeader();

//when scroll - show btn back to top
function backToTop() {
  let btnToTop = document.querySelector("#toTop");
  //show-hidden button
  document.addEventListener("scroll", () => {
    let heightScroll = window.pageYOffset;
    showHiddenClass(heightScroll, 700, btnToTop);
  });
  //
  btnToTop.addEventListener("click", () => {
    window.scrollTo(0, 0);
  });
}
backToTop();

//show nav menu
function showHiddenMenu() {
  let nav = document.querySelector("#Nav");
  let hambuger = document.querySelector(".hambuger");
  let hambugerIcon = hambuger.querySelector("span");
  let linkMenu = nav.querySelectorAll("ul li");
  hambuger.addEventListener("click", () => {
    hambugerIcon.classList.toggle("is-active");
    nav.classList.toggle("is-active");
  });

  linkMenu.forEach((link) => {
    link.addEventListener("click", () => {
      hambugerIcon.classList.remove("is-active");
      nav.classList.remove("is-active");
    });
  });

  // resize window, if width > 992, hidden menu mobile
  window.addEventListener("resize", () => {
    let wWindow = window.innerWidth;
    const tablet = 992;
    if (wWindow > tablet) {
      nav.classList.remove("is-active");
      hambugerIcon.classList.remove("is-active");
    }
  });
}
showHiddenMenu();

//select language
function showHiddenLang() {
  let lang = document.querySelector(".header__lang");
  let langCurrent = lang.querySelector(".header__lang-current span");
  let langOption = lang.querySelector(".header__lang-other");
  let langItems = langOption.querySelectorAll(".header__lang-item");
  lang.addEventListener("click", (e) => {
    e.stopPropagation();
    lang.classList.toggle("is-active");
  });
  langItems.forEach((item) => {
    item.addEventListener("click", () => {
      let langSelect = item.textContent;
      let langCurrentText = langCurrent.textContent;
      langCurrent.innerText = langSelect;
      item.innerText = langCurrentText;
    });
  });
  document.addEventListener("click", () => {
    lang.classList.remove("is-active");
  });
}
showHiddenLang();

// Scroll Progess Bar
function setProgressBar() {
  let hBody = document.querySelector("body").clientHeight;
  let hwindow = window.innerHeight;
  let progessBarTop = document.querySelector(".progressbar-top");
  window.addEventListener("scroll", () => {
    let hScrollY = window.pageYOffset;
    let wProgessVar = Number((hScrollY / (hBody - hwindow)) * 100);
    progessBarTop.style.width = `${wProgessVar}%`;
  });
}
setProgressBar();

//slider
// let changeSlider = (value, index) => {
//   sliderItems.forEach((item) => {
//     item.classList.remove("is-active");
//   });
//   dotItems.forEach((item) => {
//     item.classList.remove("is-active");
//   });
//   switch (value) {
//     case "next": {
//       if (currentIndex < lengthSliderItem - 1) {
//         currentIndex++;
//       } else {
//         currentIndex = 0;
//       }
//       break;
//     }
//     case "pre": {
//       if (currentIndex > 0 && currentIndex < lengthSliderItem) {
//         currentIndex--;
//       } else {
//         currentIndex = 0;
//       }
//       break;
//     }
//     case "dot": {
//       currentIndex = index;
//       break;
//     }
//   }
//   sliderItems[currentIndex].classList.add("is-active");
//   number.textContent = `0${currentIndex + 1}`;
//   dotItems[currentIndex].classList.add("is-active");
// };
// function carouselSlider() {
//   nextBtn.addEventListener("click", () => {
//     changeSlider("next");
//   });

//   preBtn.addEventListener("click", () => {
//     changeSlider("pre");
//   });
//   dotItems.forEach((dot, index) => {
//     dot.addEventListener("click", () => {
//       changeSlider("dot", index);
//     });
//   });
// }
// carouselSlider();

//popup-video
let playBtns = document.querySelectorAll(".play-btn");
let popupVideo = document.querySelector(".popup-video");
let iframe = popupVideo.querySelector("iframe");
let closeIcon = popupVideo.querySelector(".close");
const iframeSrc = "https://www.youtube.com/embed/";
const autoplay ="?autoplay=1"
let closeVideo = () => {
  popupVideo.style.display = "none";
  iframe.setAttribute("src", "");
};
function showPopupVideo() {
  playBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let videoId = btn.getAttribute("data-video-id");
      popupVideo.style.display = "block";
      iframe.setAttribute("src", `${iframeSrc}${videoId}${autoplay}`);
    });
  });
  closeIcon.addEventListener("click", () => {
    closeVideo();
  });
  popupVideo.addEventListener("click", () => {
    closeVideo();
  });
}
showPopupVideo();

//click menu - scroll to section
let menuItem = document.querySelectorAll(".header__top-menu li a");
let hHeader = document.querySelector("header").offsetHeight;
let sections = [];
function removeClass() {
  menuItem.forEach((menuCurrent) => {
    menuCurrent.classList.remove("is-active");
  });
}

function clickMenuDesktop() {
  menuItem.forEach((menu) => {
    let className = menu.getAttribute("href").replace("#", "");
    let section = document.querySelector("." + className);
    sections.push(section);
    menu.addEventListener("click", (e) => {
      e.preventDefault();
      removeClass();
      menu.classList.add("is-active");
      window.scrollTo({
        top: section.offsetTop - hHeader + 1,
      });
    });
  });
  window.addEventListener("scroll", () => {
    let scrollYSection = Number(window.pageYOffset);
    sections.forEach((section, index) => {
      let hSection = section.offsetHeight;
      let positionSection = section.offsetTop;
      if (
        scrollYSection > positionSection - hHeader &&
        scrollYSection < hSection + positionSection
      ) {
        removeClass();
        menuItem[index].classList.add("is-active");
      } else {
        menuItem[index].classList.remove("is-active");
      }
    });
  });
}
clickMenuDesktop();

function clickMenuMobile(){
  let mobileMenuItem = document.querySelectorAll(".nav li a");
  mobileMenuItem.forEach((menu) => {
    let className = menu.getAttribute("href").replace("#", "");
    let section = document.querySelector("." + className);
    menu.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: section.offsetTop - hHeader + 1,
      });
    })
  })
}
clickMenuMobile();

window.addEventListener("DOMContentLoaded", (event) => {
  //flickity
  let carousel = document.querySelector(".slider__list");
  let pre = document.querySelector(".slider__right-control .pre");
  let next = document.querySelector(".slider__right-control .next");
  let flkty = new Flickity(carousel, {
    cellAlign: "left",
    contain: true,
    wrapAround: true,
    prevNextButtons: false,
    adaptiveHeight: false,
    on: {
      change: (index) => {
        let number = document.querySelector(".slider__right-numbers .number");
        let indexPage = index + 1;
        number.textContent = indexPage.toString().padStart(2, 0);
      },
      ready: () => {
        let dotted = document.querySelector(".flickity-page-dots");
        let paging = document.querySelector(".dotted");
        paging.appendChild(dotted);
      },
    },
  });

  pre.addEventListener("click", () => {
    flkty.previous();
  });
  next.addEventListener("click", () => {
    flkty.next();
  });

  //photo
  let photo = document.querySelector(".photo");
  let flkty2 = new Flickity(photo, {
    cellAlign: "left",
    contain: true,
    wrapAround: true,
    prevNextButtons: false,
    pageDots: false,
    freeScroll: true,
  });
  flkty2.on("scroll", (progress) => {
    let progressBar = document.querySelector(".timeline__progressbar");
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.width = progress * 100 + "%";
  });

  //fancybox
  Fancybox.bind("[data-fancybox]", {
    buttons: ["slideShow", "thumbs", "zoom", "fullScreen", "share", "close"],
    keyboard: {
      Escape: "close",
      Delete: "close",
      Backspace: "close",
      PageUp: "next",
      PageDown: "prev",
      ArrowUp: "next",
      ArrowDown: "prev",
      ArrowRight: "next",
      ArrowLeft: "prev",
    },
    loop: false,
    protect: true,
  });
});

//fag
function showHiddenFag() {
  let fags = document.querySelectorAll(".fag__title");
  fags.forEach((fag) => {
    fag.addEventListener("click", () => {
      let fagContent = fag.nextElementSibling;
      fag.classList.toggle("is-active");
      if (fagContent.style.maxHeight) {
        fagContent.style.maxHeight = null;
      } else {
        fagContent.style.maxHeight = `${fagContent.scrollHeight}px`;
      }
    });
  });
}
showHiddenFag();

//tag
function showHiddenNews() {
  let tagBtns = document.querySelectorAll(".news__tag-text .tag");
  let tagLists = document.querySelectorAll(".news__list");
  tagBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      tagBtns.forEach((tag) => {
        tag.classList.remove("is-active");
      });
      tagLists.forEach((list) => {
        list.classList.remove("is-active");
      });
      btn.classList.add("is-active");
      tagLists[index].classList.add("is-active");
    });
  });
}
showHiddenNews();

// BAI TAP FORM
// Bài tập form đăng ký:  bao gồm,
//tên lớn hơn 4 ký tự,
//ngày sinh > 1950 và nhỏ hơn 2017,
//email,
//sdt 9~ 11 ký tự là số,
//giới tính nam or nữ,
//mật khẩu  > 6 ký tự.
let btnSubmit = document.querySelector('.form [name="submit"]');
let hoTen = document.querySelector('.form [name="hovaten"]');
let ngaySinh = document.querySelector('.form input[name="ngaysinh"]');
let email = document.querySelector('.form input[name="email"]');
let tel = document.querySelector('.form input[name="tel"]');
let password = document.querySelector('.form input[name="password"]');

// function getInputEle(inputName) {
//   return document.querySelector(`'.form [name="${inputName}"]'`);
// }
function removeErr(inputEle) {
  return inputEle.nextElementSibling
    ? inputEle.nextElementSibling.remove()
    : null;
}
function showErr(msg) {
  return `<span style='color:red'>${msg}</span>`;
}
function getCondition(value, regex, str) {
  switch (value) {
    case "hovaten": {
      return str == "" || !regex.test(str) || str.length < 4;
    }
    case "ngaysinh": {
      return (
        str == "" ||
        !regex.test(str) ||
        Number.parseInt(str.substring(6, 10)) > 2017 ||
        Number.parseInt(str.substring(6, 10)) < 1950
      );
    }
    case "email": {
      return str == "" || !regex.test(str);
    }
    case "tel": {
      return str == "" || !regex.test(str) || str.length < 9 || str.length > 11;
    }
    case "password": {
      return str == "" || !regex.test(str) || str.length < 6;
    }
  }
}
function checkForm(inputEle, regex, errmsg) {
  if (inputEle) {
    removeErr(inputEle);
    str = inputEle.value.trim();
    let condition = getCondition(inputEle.name, regex, str);
    if (condition) {
      inputEle.insertAdjacentHTML("afterend", showErr(errmsg));
    }
  }
}
function validate() {
  //xu ly su kien bam nut submit
  btnSubmit.addEventListener("click", (e) => {
    let errMss = false;
    let str = "";
    let regex = "";
    e.preventDefault;
    //hoten
    regex = /^[a-zA-Z ]+$/;
    checkForm(hoTen, regex, "Kiem tra lai ho ten");
    //ngày sinh
    regex = /^\d{2}([./-])\d{2}\1\d{4}$/;
    checkForm(ngaySinh, regex, "Kiem tra lai ngay sinh");
    //email
    regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    checkForm(email, regex, "Kiem tra lai email");
    //tel
    regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    checkForm(tel, regex, "Kiem tra lai so dien thoai");
    //pass
    regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    checkForm(password, regex, "Kiem tra lai mat khau");
  });
}
// validate();
