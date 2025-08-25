import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  initialize() {
    console.log("flatpickr#initialize")
  }
  
  disconnect() {
    console.log("flatpickr#disconnect")
    if (this.fp) {
      this.fp.destroy();
    }
  }
  
  connect() {
    console.log("flatpickr#connect")
    console.log(this.element.type)
    this.fp = flatpickr(this.element, {
      dateFormat: "Y-m-d",
      allowInput: true,
      altInput: true,
      altFormat: "F j, Y",
      // appendTo is only needed if we do full page morphing
      // appendTo: container,
    })
    console.log(this.element.type)
    this.element.addEventListener("turbo:morph-element", (event) => {
      console.log("flatpickr#morph-element")

    })
    this.element.addEventListener("turbo:before-morph-element", () => {
      console.log("turbo:before-morph-element")
    })
  }
}