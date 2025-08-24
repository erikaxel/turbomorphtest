import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  initialize() {
    console.log("Initializing flatpickr")
  }
  connect() {
    console.log("Connecting flatpickr")
    this.fp = flatpickr(this.element, {
      dateFormat: "Y-m-d",
      allowInput: true,
      appendTo: this.element.parentElement,
    })
  }

  disconnect() {
    console.log("Disconnected")
    this.fp.destroy();
  }
}