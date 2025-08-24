import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  initialize() {
    console.log("Initializing flatpickr")
  }
  connect() {
    console.log("Connecting flatpickr")
    const container = document.getElementById("flatpickr-container")
    this.fp = flatpickr(this.element, {
      dateFormat: "Y-m-d",
      allowInput: true,
      appendTo: container,
    })
  }

  disconnect() {
    console.log("Disconnected")
    this.fp.destroy();
  }
}