import { getClowns } from "./dataAccess.js";


export const selectClowns = () => {
    const clowns = getClowns()
    let html = `<select id="resource">
            <option value="0">Select Clown</option>`
    const clownOptions = clowns.map((clown) => {
        return `
        <option value="${clown.id}">
        ${clown.name}
        </option>`})
    html += clownOptions.join("")
    html += `</select>`
    return html
}

// document.addEventListener("change", changeEvent => {
//     if (changeEvent.target.id === "resource") {
//         setClown(parseInt(changeEvent.target.value))
//     }
// })

