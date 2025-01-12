(() => {
  const MOBILE_WIDTH = 576;
  const TABLET_WIDTH = 1024;
  function debounce(f, ms) {
    let isCooldown = false;
    return function() {
        if (isCooldown) return
        f.apply(this, arguments);
        isCooldown = true;
        setTimeout(() => isCooldown = false, ms);
    };
  }
  function getWindowWidth () {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.body.clientWidth,
      document.documentElement.clientWidth
    );
  }
  window.MOBILE_WIDTH = MOBILE_WIDTH;
  window.TABLET_WIDTH = TABLET_WIDTH;
  window.debounce = debounce;
  window.getWindowWidth = getWindowWidth;
})();

(()  => {
  function scrollToContent (link, isMobile) {
    if (isMobile && window.getWindowWidth() > window.MOBILE_WIDTH) {
      return;
    }
    const href = link.getAttribute('href').substring(1);
    if (Boolean(href)) {
      const scrollTarget = document.getElementById(href);
      const elementPosition = scrollTarget.getBoundingClientRect().top;
      let offset = 0;
      if(window.getWindowWidth() <= window.TABLET_WIDTH) {
        offset = -102;
      }
      window.scrollBy({
        top: elementPosition + offset,
        behavior: 'smooth'
      });
    }
  }
  document.querySelectorAll('.header__link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      scrollToContent(this, false);
    });
  });
})();

(() => {
  function setBurger(params) {
    const btn = document.querySelector(`.${params.btnClass}`);
    const menu = document.querySelector(`.${params.menuClass}`);
    const links = menu.querySelectorAll(`.${params.linksClass}`);

    function onBtnClick () {
      if (window.getWindowWidth() <= window.TABLET_WIDTH) {
        btn.classList.toggle(params.activeClass);
    
        if (
          !menu.classList.contains(params.activeClass) &&
          !menu.classList.contains(params.hiddenClass)
        ) {
          menu.classList.add(params.activeClass);
          document.body.style.overflow = 'hidden';
        } else {
          menu.classList.add(params.hiddenClass);
          document.body.removeAttribute('style');
          btn.classList.toggle(params.hiddenClass);
        }
      }
    }

    menu.addEventListener("animationend", function () {
      if (menu.classList.contains(params.hiddenClass)) {
        menu.classList.remove(params.activeClass);
        menu.classList.remove(params.hiddenClass);
        btn.classList.remove(params.hiddenClass);
      }
    });

    btn.addEventListener("click", onBtnClick);

    links.forEach((link) => {
      link.addEventListener("click", onBtnClick);
    });
  }

  setBurger({
    btnClass: "header__burger",
    menuClass: "header__cube",
    activeClass: "is-opened",
    hiddenClass: "is-closed",
    linksClass: "header__link"
  });
})();

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const opacity = Math.min(scrollTop / maxScroll, 0.4);

  const overlay = document.querySelector('.overlay');
  overlay.style.background = `rgba(0, 0, 0, ${opacity})`;
});

