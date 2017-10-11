class Sticky {
  constructor (stickyElement) {

    // Get DOM elements
    this.mantainer = document.querySelector('#height-mantainer');
    this.headers = document.querySelectorAll(stickyElement);
    this.header = document.querySelector(stickyElement);
    this.container = document.querySelector('#container');
    this.elements = document.querySelectorAll('.block');
    this.toggler = document.querySelector('#toggler');

    this.sticky = false;

    this.toggler.addEventListener('click', () => this.toggleState());
    window.addEventListener('resize', () => {
      console.log('\nwindow resized');
      // TODO update elements dimentions
      /*function ready(fn) {
        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
          fn();
        } else {
          document.addEventListener('DOMContentLoaded', fn);
        }
      }*/

      document.querySelectorAll('.block').forEach((element) => {
        element.dataset.top = element.offsetTop;
        element.dataset.height = element.offsetHeight;
      });
      this.container.style.paddingTop = this.header.dataset.height + 'px';
    });

    this.scroll = utils.throttle(this.handleStart.bind(this));
  }

  toggleState () {
    this.sticky = !(this.sticky);
    this.sticky ? this.initialize() : this.disable();
  }

  initialize () {
    this.toggler.innerHTML = 'Disable sticky headers';
    document.addEventListener('scroll', this.scroll);
    alert('The headers are sticky now. Scroll down to check out! 😎');
  }

  disable () {
    this.toggler.innerHTML = 'Enable sticky headers';
    document.removeEventListener('scroll', this.scroll);
    alert('The headers aren\'t sticky anymore 😝');
  }

  activeElement () {
    for (var i = 0; i < this.elements.length; i++) {
      if ((window.scrollY >= this.elements[i].dataset.top)
      && (window.scrollY < this.elements[i + 1].dataset.top)) {
        this.elements[i].dataset.active = true;
      } else {
        this.elements[i].dataset.active = false;
      }
    }
  }

  handleStart () {
    if (window.scrollY >= this.container.offsetTop){
      this.container.style.paddingTop = this.header.offsetHeight + 'px';
    } else {
      this.container.style.paddingTop = 0;
    }
    this.activeElement();
  }
}

const sticky = new Sticky('.mini-header');
