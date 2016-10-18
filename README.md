# FreeDOM

`FreeDOM` is a JavaScript Document Object Model (DOM) Manipulation Library that simplifies accessing properties of DOM elements on a page for users.

FreeDOM offers a variety of methods that the user can use in the browser console in order to inspect elements. For example, users can:

  0. add classes to a group of DOM elements using the addClass method.
    before:
    ```html
      <div> no class</div>
      <div> classless</div>
      <div> give me a class!</div>
    ```

    ```javascript
      div = $l('div');
      div.addClass('green-background');
    ```

    after:

    ```html
      <div class="green-background"> yay!</div>
      <div class="green-background"> i'm green</div>
      <div class="green-background"> in my background!</div>
    ```

    _backend:_

    ```javascript
    addClass (newClass) {
      this.nodes.forEach((el) => {
        el.classList.add(newClass);
      });
    }
    ```

  0. remove all elements of a single type from a page
    before:

    ```html
      <div> goodbye div! </div>
      <div> extra div! </div>
      <div> unnecessary div! </div>
      <p> finally something worth keeping </p>
      <div> go away div! </div>
    ```

    ```javascript
      div = $l('div');
      div.remove();
    ```

    after:

    ```html
      <p> finally something worth keeping </p>
    ```

  0. perform different methods using FreeDOM's versatile $l method
  
    _backend:_

    ```javascript
      function $l(selector) {
        if (selector instanceof Function) {
          if (!ready){
            queue.push(selector);
          } else {
            selector();
          }
        }
        else if (selector instanceof HTMLElement) {
          return new DOMNodeCollection([selector]);
        }
        else {
          let selected = document.querySelectorAll(selector);
          let arraySelected = Array.from(selected);
          return new DOMNodeCollection(arraySelected);
        }
      }
    ```
