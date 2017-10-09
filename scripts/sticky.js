class Sticky {
  constructor (selector, num) {

    // Get root DOM element
    this.main = document.querySelector(selector);

    // Render boxes
    this.render(num);

    // Get the rest of DOM elements agter they've been rendered
    this.elements = this.main.querySelectorAll('.block');
    this.elementsHeader = this.main.querySelector('.mini-header');

    // Get switcher and form DOM elements
    this.interactive = document.querySelector('#interactive');
    this.toggler = this.interactive.querySelector('#toggler');

    this.grade = [];
    this.elements.forEach((element) => {
      this.grade.push({
        id: element.dataset.id,
        top: element.offsetTop,
        height: element.offsetHeight,
        active: false
      });
    });

    this.state = {
      numberOfElements: num,
      sticky: false
    };

    this.toggler.addEventListener('click', () => this.toggleState());
    this.scroll = this.throttle(this.startFixedHedersScroll.bind(this));
  }


  toggleState () {
    this.state.sticky = !(this.state.sticky);
    this.state.sticky ? this.initialize() : this.disable();
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

  render (num) {
    let boxes = [];
    for (let i = 0; i < num; i++) {
      boxes.push(
        `<div id="div${i}" class="df block" data-id=${i}>
            <h3 class="mini-header" style="background-color: ${this.colorPicker()}">
              Header #${i+1}
            </h3>
            <div class="content">
              Lorem ipsum sodales, sapien enim nec: auctor — integer curabitur
              elementum quisque lorem morbi congue lorem malesuada ultricies.
              Malesuada cursus duis quam lorem pharetra nam, risus justo fusce,
              a massa amet congue adipiscing non. Diam quam metus malesuada et
              amet gravida porta nibh non. Auctor quam elementum lorem justo
              nulla arcu maecenas gravida pellentesque lectus at. Eget quam
              elementum cursus quam rutrum, commodo elementum congue vitae leo
              porta. Mauris at maecenas porttitor cursus ipsum, porttitor nam
              et lectus porttitor, sodales malesuada — eros porta.
            </div>
          </div>`
      );
    }

    this.main.innerHTML = boxes.join('');
  }

  colorPicker () {
    const r = this.getRandomNumber();
    const g = this.getRandomNumber();
    const b = this.getRandomNumber();

    return `rgb(${r},${g},${b})`;
  }

  getRandomNumber () {
    return Math.floor(Math.random()*256);
  }

  // Throttling function
  throttle (callback, wait = 40, context = this) {
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

    this.activeElementStyleChange(this.grade);
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

  startFixedHedersScroll () {
    this.activeElement();
    if (window.scrollY >= this.main.offsetTop) {
      this.main.style.paddingTop = (this.elementsHeader.offsetHeight) + 'px';
    } else {
      this.main.style.paddingTop = 0;
    }
  }
}

const sticky = new Sticky('#container', 100);
