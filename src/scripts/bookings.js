import { deleteRequest, deleteCompletion,completeBooking, getBookings, getCompletions } from "./dataAccess.js"
import { selectClowns } from "./clowns.js"

export const pendingRequests = () => {
    const bookings = getBookings()
        bookings.sort((a, b) => {
        a.newDate = new Date(a.date)
        b.newDate = new Date(b.date)
        return a.newDate - b.newDate
    })
    let html = `<h2 class="title">Pending Bookings</h2>
                <ul class="removeBullets">`
    const bookingList = bookings.map((booking) => {
        return `<li class="lists__pending">
                <p><b>Party Date:</b> ${booking.date}</p>
                <p><b>Party Length:</b> ${booking.hours} Hours</p>
                <p><b>Guest of Honor:</b> ${booking.child}</p>
                <p><b>Parent</b>: ${booking.parent}</p>
                <p><b>Number of Attendees:</b> ${booking.attendees}</p>
                <p><b>Party Address:</b> ${booking.address}</p>
                ${selectClowns()}
                <br>
                <br>
                <button class="booking__complete" id="completed--${booking.id}">Complete</button>
                <button class="booking__delete" id="booking--${booking.id}">Deny</button>
                </li>`
    })

    html += bookingList.join("")
    html += `</ul>`
    return html
}

export const completedRequests = () => {
    const completions = getCompletions()
    completions.sort((a, b) => {
        a.newDate = new Date(a.date)
        b.newDate = new Date(b.date)
        return a.newDate - b.newDate
    })
    let html = `<h2 class="title">Completed Bookings</h2>
                <ul class="removeBullets">`
    const completionList = completions.map((completion) => {
        return `<li class="lists__completed">
                <p><b>Party Date:</b> ${completion.date} - Party Length: ${completion.hours}</p>
                <p><b>Guest of Honor:</b> ${completion.child}</p>
                <p><b>Parent:</b> ${completion.parent}</p>
                <p><b>Number of Attendees:</b> ${completion.attendees}</p>
                <p><b>Party Address:</b> ${completion.address}</p>
                <p><b>Party Performer:</b> ${completion.clown}</p>
                <button class="completion__delete" id="completeDel--${completion.id}">Delete</button>
                </li>`
    })

    html += completionList.join("")
    html += `</ul>`
    return html
    
}

document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("booking")) {
        const [,bookingId] = clickEvent.target.id.split("--")
        deleteRequest(parseInt(bookingId))
    }
})

document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("completeDel")) {
        const [,completionId] = clickEvent.target.id.split("--")
        deleteCompletion(parseInt(completionId))
    }
})

document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("completed")) {
        const [,completedId] = clickEvent.target.id.split("--")
        completeBooking(parseInt(completedId))
    }
})
