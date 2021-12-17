import { sendRequest } from "./dataAccess.js"

export const bookingForm = () => {
    let html = `
    <div class="field">
        <label class="label" for="partyDate">Party Date</label>
        <input type="date" name="partyDate" class="input"/>
    </div>
    <br>
    <div class="field">
        <label class="label" for="numOfHours">Number of Hours Needed</label>
        <input type="text" name="numOfHours" class="input"/>
    </div>
    <br>
    <div class="field">
        <label class="label" for="parentName">Parent's Name</label>
        <input type="text" name="parentName" class="input"/>
    </div>
    <br>
    <div class="field">
        <label class="label" for="childName">Child's Name</label>
        <input type="text" name="childName" class="input"/>
    </div>
    <br>
    <div class="field">
        <label class="label" for="numOfChildren">Number of Attendees</label>
        <input type="text" name="numOfChildren" class="input"/>
    </div>
    <br>
    <div class="field">
        <label class="label" for="partyAddress">Address</label>
        <input type="text" name="partyAddress" class="input"/>
    </div>
    <br>
    <button class="button button__submit" id="submitBooking">Submit Booking</button>
    `
    return html
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitBooking") {
        const bookedDate = document.querySelector("input[name='partyDate']").value
        const bookedHours = document.querySelector("input[name='numOfHours']").value
        const bookedParent = document.querySelector("input[name='parentName']").value
        const bookedChild = document.querySelector("input[name='childName']").value
        const bookedAttendees = document.querySelector("input[name='numOfChildren']").value
        const bookedAddress = document.querySelector("input[name='partyAddress']").value

        const dataToSendToAPI = {
            date: bookedDate,
            hours: bookedHours,
            parent: bookedParent,
            child: bookedChild,
            attendees: bookedAttendees,
            address: bookedAddress
        }
        sendRequest(dataToSendToAPI)
    }
})