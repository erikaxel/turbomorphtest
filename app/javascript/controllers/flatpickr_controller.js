import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  initialize() {
    console.log("Initializing flatpickr")
  }
  connect() {
    console.log("Connecting flatpickr")
    flatpickr(this.element, {
      dateFormat: "Y-m-d",
      allowInput: true
    })
  }

  disconnect() {
    console.log("Disconnected")
  }
}