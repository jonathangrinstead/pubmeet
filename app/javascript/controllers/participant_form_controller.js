import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["buttons", "form"]

  connect() {
    // Initialize the controller
    // Ensure form is hidden on page load
    this.formTarget.classList.add("hidden")
  }

  showForm(event) {
    event.preventDefault()
    // Hide all buttons
    this.buttonsTargets.forEach(button => button.classList.add("hidden"))
    // Show the form
    this.formTarget.classList.remove("hidden")
    this.formTarget.innerHTML = `
      <form class="flex flex-col gap-4 items-center w-full">
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">What's your name?</span>
          </label>
          <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
        </div>
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">Location?</span>
          </label>
          <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
        </div>
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">Phone Number?</span>
          </label>
          <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
        </div>
        <div class="flex gap-4">
          <button type="submit" class="btn btn-primary">Join the pub meet</button>
          <button type="button" data-action="click->participant-form#hideForm" class="btn btn-ghost">Cancel</button>
        </div>
      </form>
    `
  }

  hideForm() {
    // Show all buttons
    this.buttonsTargets.forEach(button => button.classList.remove("hidden"))
    this.formTarget.classList.add("hidden")
    this.formTarget.innerHTML = ""
  }
}
