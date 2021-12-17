import { bookingForm } from "./form.js"
import { pendingRequests, completedRequests } from "./bookings.js"

export const clownBookings = () => {
    return `
    <h1 class="title">Clown Booking Service</h1>
    <section class="bookingForm">
    ${bookingForm()}
    </section>
    <section class="lists">
        <article>
        ${pendingRequests()}
        </article>
        <article>
        ${completedRequests()}
        </article>
    </section>
    `
}