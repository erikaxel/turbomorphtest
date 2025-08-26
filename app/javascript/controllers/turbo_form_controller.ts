import {Controller} from '@hotwired/stimulus'

export default class extends Controller {
  static values = {url: String}

  declare hasUrlValue: boolean
  declare urlValue: string
  declare pendingUpdates: boolean
  declare isSubmitting: boolean

  initialize() {
    console.log("turboForm#initialize")
  }

  disconnect() {
    console.log("turboForm#disconnect")
  }

  connect() {
    console.log("turboForm#connect")
    this.pendingUpdates = false
    this.isSubmitting = false

    this.element.addEventListener('turbo:submit-start', this.handleSubmitStart.bind(this))
    this.element.addEventListener('turbo:submit-end', this.handleSubmitEnd.bind(this))
  }

  update(event) {
    console.log("turboForm#update")
    console.log({
      hasUrlValue: this.hasUrlValue,
      urlValue: this.urlValue,
      formUrl: this.#formUrl(),
      pendingUpdates: this.pendingUpdates,
      isSubmitting: this.isSubmitting
    })
    // if (this.isSubmitting) return

    // this.pendingUpdates = true

    // Delay form updates to avoid race conditions with submit/click events.
    // This gives the submit button click event time to register before blur-triggered
    // Turbo updates can replace the DOM elements and disrupt the form submission.
    // window.setTimeout(() => {
    // if (this.pendingUpdates && !this.isSubmitting) {
    //   this.submitUpdate(event)
    // }
    // }, 115)

    this.submitUpdate(event)
  }

  submitUpdate(event) {
    // If the form is within a modal, we should not update if the modal is closed. The user might have filled in an
    // input and then clicked outside the modal to close it, updating the form will then reopen the modal.
    const modal = this.element.closest('.modal')
    if (modal && !modal.classList.contains('show')) return

    let input = event.target
    if (!input.validity.valid) return

    const target = event.target
    const form = target.form

    // We hardcode in edit for this test, this is only needed for inner update morph
    // form.setAttribute('action', '1/edit')
    form.setAttribute('action', this.#formUrl())
    form.setAttribute('method', 'get')
    form.setAttribute('data-turbo-stream', 'true')
    form.querySelector('input[name="_method"]')?.remove()
    // this.addOrUpdateLastChanged(form, target.name)
    form.requestSubmit()
  }

  handleSubmitStart() {
    this.isSubmitting = true
    this.pendingUpdates = false
    this.toggleSubmit(false)
  }

  handleSubmitEnd(event) {
    if (event.detail.formSubmission.result.success) {
      this.toggleSubmit(false)
    } else {
      this.toggleSubmit(true)
    }
  }

  toggleSubmit(enable) {
    document.querySelectorAll(`[form="${this.element.id}"][type="submit"]`).forEach((btn) => {
      if (enable) {
        btn.disabled = false
        btn.style.opacity = ''
      } else {
        btn.disabled = true
        btn.style.opacity = '1'
      }
    })
  }

  addOrUpdateLastChanged(form, name) {
    const inputName = 'last_updated_field'
    let input = form.querySelector(`input[name="${inputName}"]`)

    if (!input) {
      // If the input doesn't exist, create it
      input = document.createElement('input')
      input.type = 'hidden'
      input.name = inputName
      form.appendChild(input)
    }

    // Set the value to the name passed in
    input.value = name
  }

  #formUrl() :string {
    if (this.hasUrlValue && this.urlValue != "") {
      return this.urlValue
    } else {
      let form = this.element
      let method = (form.querySelector('input[name="_method"]'))?.value || form.method
      return method == 'post' ? `${form.action}/new` : `${form.action}/edit`
    }
  }
}
