import { Controller } from "@hotwired/stimulus"

// NOTE: None of the Stimulus lifetime methods are called during morphing updates,
// they are only called with full replace/update.
export default class extends Controller {
  initialize() {
    console.log("modal#initialize")
  }

  disconnect() {
    console.log("modal#disconnect")
  }

  connect() {
    console.log("modal#connect")
    const myModal = new bootstrap.Modal(this.element)
    myModal.show()

    //
    this.autofocusFirstInput()
  }

  private autofocusFirstInput() {
    // This is
    const firstInput = this.element.querySelector('input:not([type="hidden"]), textarea, select')
    console.log(firstInput)
    if (firstInput) {
      firstInput.focus()
    }
  }
}