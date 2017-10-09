// Afunction to render some DOM elements
function render (num) {
  let boxes = [];
  for (let i = 0; i < num; i++) {
    boxes.push(
      `<div class="df block" data-id=${i}>
          <h3 class="mini-header" style="background-color: ${colorPicker()}">
            Header #${i+1}
          </h3>
          <div class="content">
            Lorem ipsum sodales, sapien enim nec: auctor — integer curabitur
            elementum quisque lorem morbi congue lorem malesuada ultricies.
            Malesuada cursus cduis quam lorem pharetra nam, risus justo fusce,
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

  document.querySelector('#container').innerHTML = boxes.join('');
}

// Creates an rgb formatted color string
function colorPicker () {
  const r = getRandomNumber();
  const g = getRandomNumber();
  const b = getRandomNumber();

  return `rgb(${r},${g},${b})`;
}

// Generates a rundon number from 0 to 255
function getRandomNumber () {
  return Math.floor(Math.random()*256);
}

// Let's actually render some blocks
render(100);
