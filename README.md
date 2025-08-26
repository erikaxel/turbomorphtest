# README

This repo demos Hotwire Turbo.

The most interesting parts are in

* posts_controller.rb
* posts/_form.html.erb

Interesting articles:

* https://dev.37signals.com/a-happier-happy-path-in-turbo-with-morphing/
* https://turbo.hotwired.dev/reference/streams
* https://thoughtbot.com/blog/turbo-morphing-woes
* https://marcoroth.dev/posts/guide-to-custom-turbo-stream-actions
* https://github.com/marcoroth/turbo_power-rails

# Things learned so far:

* `replace` replaces the element you target, `update` updates its 'innerHtml' content
* Using `autofocus` in a modal seems to not work properly, since the modal itself is focused from Bootstrap. Instead we
  should manually autofocus when the modal connects. (See modal_controller.ts)
* Morphing gives the smoothest results

When using morphing:

* The stimulus lifetime methods (connect etc.) are not normally called. They are only called the first time, since
  the morph then inserts the element (since it didn't exist before)
* We need to wrap flatpickr with `<data-turbo-permanent>`. This will not work for server side updates,
  but we don't usually do that.
* For modal forms: We should avoid calling `Modal.show`, and instead just pass along a modal which has `show` and
  `display: block` set. When we fetch modal forms they should always be displayed, so this is ok. And this ensures the
  smoothest change, since `Modal.show` will make things flicker.
* If we ever do *full page* morphing, we will have to use `appendTo:` for flatpickr and ensure the container we append
  to is not changed.
* Even though the lifecycle events are not called, Stimulus value input will be changed during a morph. So it doesn't
  make sense to set these values, since they can be changed at anytime. Eg 
  ```
  export default class extends Controller {
      static values = {url: String}

      connect() {
         // This will NOT work, since this.urlValue will be changed during morphing, but connect() is not called.
         this.urlValue = "some default" if this.urlValue === ''
      } 
  
  ```
