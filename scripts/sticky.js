class Sticky {
  constructor (stickyElement) {

    // Get DOM elements
    this.headers = document.querySelectorAll(stickyElement);
    this.container = this.headers[0].parentElement.parentElement;
    this.elements = document.querySelectorAll('.block');
    this.toggler = document.querySelector('#toggler');

    this.grade = [];
    this.elements.forEach((element) => {
      this.grade.push({
        id: element.dataset.id,
        top: element.offsetTop,
        height: element.offsetHeight,
        active: false
      });
    });

    this.sticky = false;

    this.toggler.addEventListener('click', () => this.toggleState());
    window.addEventListener('resize', () => {
      // TODO update elements dimentions
      this.updateGrade();
      this.handleStart();
    });
    this.scroll = this.throttle(this.handleStart.bind(this));
  }

  updateGrade (){
    this.grade.forEach((element, i) => {
      element.top = this.elements[i].offsetTop;
      element.height = this.elements[i].offsetHeight;
    });
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

  // Throttling function
  throttle (callback, wait = 20, context = this) {
    let timeout = null;
    let callbackArgs = null;

    const later = () => {
      callback.apply(context, callbackArgs);
      timeout = null;
    };

    return function() {
      if (!timeout) {
        callbackArgs = arguments;
        timeout = setTimeout(later, wait);
      }
    };
  }

  activeElement () {
    this.grade = this.grade.map((element, i) => {
      if ((window.scrollY >= element.top)
      && (window.scrollY < this.grade[i+1].top)) {
        element.active = true;
      } else {
        element.active = false;
      }
      return element;
    });

    this.activeElementStyleChange();
  }

  activeElementStyleChange () {
    this.grade = this.grade.map((element, i) => {
      if (element.active === true) {
        this.elements[i].classList.add('fixed-head');
      } else {
        this.elements[i].classList.remove('fixed-head');
      }
      return element;
    });
  }

  handleStart () {
    if (window.scrollY >= this.container.offsetTop) {
      this.container.style.paddingTop = (this.headers[0].offsetHeight) + 'px';
    } else {
      this.container.style.paddingTop = 0;
    }
    this.activeElement();
  }
}

const sticky = new Sticky('.mini-header');
