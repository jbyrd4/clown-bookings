import { mainContainer } from "./main.js";

const applicationState = {
    bookings: [],
    clowns: [],
    completions: []
    }

export const fetchRequests = () => {
    return fetch("http://localhost:8088/bookings")
    .then(response => response.json())
    .then(
        (bookingRequests) => {
            applicationState.bookings = bookingRequests
        }
    )
    }

export const fetchCompletions = () => {
    return fetch("http://localhost:8088/completions")
    .then(response => response.json())
    .then(
        (completions) => {
            applicationState.completions = completions
        }
    )
    }

export const fetchClowns = () => {
    return fetch("http://localhost:8088/clowns")
    .then(response => response.json())
    .then(
        (clownList) => {
            applicationState.clowns = clownList
        }
    )
    }

export const sendRequest = (bookingRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bookingRequest)
        }
        return fetch("http://localhost:8088/bookings", fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
    }

export const sendCompletions = (completion) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completion)
        }
        return fetch("http://localhost:8088/completions", fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
    }


export const completeBooking = (id) => {
    const clownId = parseInt(document.querySelector("select[id='resource']").value)
    const correctObject = applicationState.bookings.find(booking => booking.id === id)    

    if (clownId > 0) {
        const newCompletion = {
            date: correctObject.date,
            hours: correctObject.hours,
            parent: correctObject.parent,
            child: correctObject.child,
            attendees: correctObject.attendees,
            address: correctObject.address,
            clown: correctObject.name
        }
        sendCompletions(newCompletion)
        deleteRequest(id)
    } else {
        const clown = document.querySelector(".clownImg")
        clown.innerHTML = `<div class="clownContainer"><img class="clownImage" src='https://www.thesun.co.uk/wp-content/uploads/2017/09/pennywise-speaks-in-new-it-tv-spot-696x464.jpg'/>
        <div id="removeClown" class="buttonMove"><button id="removeClown" class="buttonClown">YOU DIDN'T SELECT A CLOWN</button></div></div>`

    }
}
document.addEventListener("click", event => {
    if (event.target.id === "removeClown") {
        const clownImg = document.querySelector(".clownImg")
        clownImg.innerHTML = ""
    }
})

    
export const deleteRequest = (id) => {
    return fetch(`http://localhost:8088/bookings/${id}`, {method: "DELETE"})
    .then(
        () => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        }
        )
    }

export const deleteCompletion = (id) => {
    return fetch(`http://localhost:8088/completions/${id}`, {method: "DELETE"})
    .then(
        () => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        }
        )
    }

export const getBookings = () => {
    return applicationState.bookings.map((booking) => ({...booking}))
    }

export const getCompletions = () => {
    return applicationState.completions.map((completion) => ({...completion}))
    }

export const getClowns = () => {
    return applicationState.clowns.map((clown) => ({...clown}))
    }