# «Sticky header»

This is a test task in order to make it to the job interview.

## Task

#### Preparation
* Build 100 text blocks with a header and a text block in each of them
* Create a class of a function which first argument of CSS selector or a collection of DOM elements. The rest of the arguments are free to use

  I've created a `Sticky (selector, num)`.
  Then I've created an instance of it `const sticky = new Sticky('#container', 100);`. It takes CSS selector as its first argument and a quantity of blocks to create as a second.
  This is the way I cover first two parts of a task.

* A class must return methods `initialize` and `disable`.

  Well, you can access them from console by calling them on the class instance like this: `sticky.initialize();` and `sticky.disable();`.

#### The Task itself
* After calling an `initialize` method the headers should stick like this:
 ![Example](images/exmple.gif)
* Calling `disable` must disable 'sticky mode
* Add buttons to call those methods

  I actually added one button which works as a switcher to turn on and turn off 'sticky mode'. You can access it using calls described earlier too.

#### Conditions
* no jQuery, pure JS only
  (feeling even more comfy with it)
* think if there are any errors possible while function is working
  (I've tried to debug it the best I could)
* think of how to optimize the performance (well, `throttle` function is a nice helper in here)
* text and markup sholdn't jump around while function works
  (I know the trick. And it works pretty smooth.)
* allowed to use ES6 not compiling it to ES5
* put it on GH Pages
[Run it!](https://myokha.github.io/sticky-headers/)
