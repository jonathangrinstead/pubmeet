import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["days", "hours", "minutes", "seconds"]
  static values = {
    deadline: String
  }

  connect() {
    this.updateCountdown()
    this.timer = setInterval(() => this.updateCountdown(), 1000)
  }

  disconnect() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  updateCountdown() {
    const deadline = new Date(this.deadlineValue)
    const now = new Date()
    const diff = deadline - now

    if (diff <= 0) {
      this.element.innerHTML = "Time's up!"
      this.disconnect()
      return
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    this.daysTarget.style.setProperty('--value', days)
    this.hoursTarget.style.setProperty('--value', hours)
    this.minutesTarget.style.setProperty('--value', minutes)
    this.secondsTarget.style.setProperty('--value', seconds)
  }
} 