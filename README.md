# FreeDOM

`FreeDOM` is a JavaScript Document Object Model (DOM) Manipulation Library that simplifies accessing properties of DOM elements on a page for users.

How to use FreeDOM:
  0. Download the lib folder
  0. Be sure to include the script tag referring to the freedom.js file in the head of your `HTML` file.
  If you are using webpack, make sure that you put this tag above the bundle.js one!
    For example:
    ```html
      <script src="path/to/freedom.js"></script>
      <script src="./js/bundle.js"></script>
    ```
FreeDOM offers a variety of methods that the user can use in the browser console in order to inspect elements. For example, users can:

  0. add classes to a group of DOM elements using the addClass method.

    before:
    ```html
    <div> no class </div>
    <div> classless </div>
    <div> give me a class! </div>
    ```

    ```javascript
    div = $j('div');
    div.addClass('green-background');
    ```

    after:

    ```html
    <div class="green-background"> yay! </div>
    <div class="green-background"> i'm green </div>
    <div class="green-background"> in my background! </div>
    ```

    _How did this work?_

    ```javascript
    addClass (newClass) {
        this.nodes.forEach((el) => {
          el.classList.add(newClass);
        });
    }
    ```

  0. remove __all__ elements of a single type from a page

    before:

    ```html
    <div> goodbye div! </div>
    <div> extra div! </div>
    <div> unnecessary div! </div>
    <p> finally something worth keeping </p>
    <div> go away div! </div>
    ```

    ```javascript
    div = $j('div');
    div.remove();
    ```

    after:

    ```html
    <p> finally something worth keeping </p>
    ```

  0. perform different actions using FreeDOM's versatile $l function

    _$j responds to different inputs that you give it_

    ```javascript
    window.$j = (selector) => {
  	  if (selector instanceof Function) {
  	    if (!ready){ // putting in a function will add it to the queue of actions to perform
  	      queue.push(selector);
  	    } else {
  	      selector();
  	    }
  	  }
  	  else if (selector instanceof HTMLElement) {
  	    return new DOMNodeCollection([selector]);
  	  }
  		else if (selector === window) {
  			return new DOMNodeCollection([window]);
  		}
  	  else {
  	    let selected = document.querySelectorAll(selector);
  	    let arraySelected = Array.from(selected);
         // giving a string as an input will return a collection of all elements of that type
  	    return new DOMNodeCollection(arraySelected); // $j('li') returns a collection of all <li> items on the page.
      }
  	};
    ```
