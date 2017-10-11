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
      //this.updateGrade();
      //this.handleStart();
      console.log('container offsetTop: ' + this.container.offsetTop);
      console.log('top: ' + this.elements[0].offsetTop + '\nheight:' + this.elements[0].offsetHeight);
    });
    this.scroll = utils.throttle(this.handleStart.bind(this));
  }

  updateGrade (){
    console.log('updateGrade ran!');
    this.mantainer.height = this.header.offsetHeight;
    /*this.elements.forEach((element) => {
      console.log(element);
      element.top = element.offsetTop;
      element.height = element.offsetHeight;
    });*/
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
      && (window.scrollY < this.elements[i+1].dataset.top)) {
        this.elements[i].dataset.active = true;
      } else {
        this.elements[i].dataset.active = false;
      }
    }
  }

  handleStart () {
    if (window.scrollY >= this.container.offsetTop){
      console.log(this.mantainer);
      console.log(this.header);
      this.mantainer.height = this.header.offsetHeight;
    } else {
      console.log(this.mantainer);
      console.log(this.header);
      this.mantainer.height = 0;
    }
    this.activeElement();
  }
}

const sticky = new Sticky('.mini-header');
