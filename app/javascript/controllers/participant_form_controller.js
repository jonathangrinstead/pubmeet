import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["buttons", "form", "list"]

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
      <form 
        class="flex flex-col gap-4 items-center w-full"
        data-action="submit->participant-form#handleSubmit"
      >
        <input type="hidden" name="authenticity_token" value="${document.querySelector('meta[name="csrf-token"]').content}">
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">What's your name?</span>
          </label>
          <input type="text" name="participant[name]" placeholder="Type here" class="input input-bordered w-full max-w-xs" required />
        </div>
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">Location?</span>
          </label>
          <input type="text" name="participant[location]" placeholder="Type here" class="input input-bordered w-full max-w-xs" required />
        </div>
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">Phone Number?</span>
          </label>
          <input type="text" name="participant[phone_number]" placeholder="Type here" class="input input-bordered w-full max-w-xs" required />
        </div>
        <div class="flex gap-4">
          <button type="submit" class="btn btn-primary">Join the pub meet</button>
          <button type="button" data-action="click->participant-form#hideForm" class="btn btn-ghost">Cancel</button>
        </div>
      </form>
    `
  }

  async handleSubmit(event) {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)

    try {
      const response = await fetch(`/meets/${this.element.dataset.meetSlug}/participants`, {
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
          'Accept': 'application/json'
        }
      })

      const data = await response.json()

      if (response.ok && data.status === 'success') {
        // Add new participant to the list using getElementById
        const list = document.getElementById('participants_list')
        list.insertAdjacentHTML('beforeend', `
          <tr>
            <td class="text-center">${data.name} ${this.getRandomEmoji()}</td>
          </tr>
        `)
        
        // Show success message
        this.formTarget.innerHTML = `
          <div class="alert alert-success shadow-lg">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Successfully joined the pub meet! 🍻</span>
            </div>
          </div>
        `
        // Show buttons again after a delay
        setTimeout(() => {
          this.hideForm()
        }, 10000)
      } else {
        throw new Error(data.error || 'Failed to submit')
      }
    } catch (error) {
      console.error('Error:', error)
      this.formTarget.innerHTML = `
        <div class="alert alert-error shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>${error.message}</span>
          </div>
        </div>
      `
    }
  }

  hideForm() {
    // Show all buttons
    this.buttonsTargets.forEach(button => button.classList.remove("hidden"))
    this.formTarget.classList.add("hidden")
    this.formTarget.innerHTML = ""
  }

  getRandomEmoji() {
    const emojis = ['🍺', '🍻', '🍷', '🍸', '🍹', '🍾', '🍷', '🍸', '🍹', '🍾']
    return emojis[Math.floor(Math.random() * emojis.length)]
  }
}
