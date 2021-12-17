import { clownBookings } from "./clownBooking.js"
import { fetchRequests, fetchClowns, fetchCompletions } from "./dataAccess.js"

export const mainContainer = document.querySelector("#container")

export const render = () => {
fetchRequests()
.then(() => fetchClowns())
.then(() => fetchCompletions())
.then(() => {
    mainContainer.innerHTML = clownBookings()
})
}

render()

mainContainer.addEventListener("stateChanged", customEvent => render())

