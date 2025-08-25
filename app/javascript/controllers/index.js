import { Application } from '@hotwired/stimulus'
import { registerControllers } from 'stimulus-vite-helpers'

const controllers = import.meta.glob('./*_controller.*s', { eager: true })
registerControllers(Application.start(), controllers)
