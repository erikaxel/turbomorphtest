import { StreamActions } from '@hotwired/turbo'

StreamActions.remove_backdrop = function () {
  // If the modal is already open, remove the backdrop to prevent multiple backdrops being shown.
  document.querySelector('.modal-backdrop.show')?.remove()
}
