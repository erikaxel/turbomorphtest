import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    flatpickr(this.element, {
      dateFormat: "Y-m-d",
      allowInput: true
    })
  }
}