
const eventList = document.querySelector(".event-list")
const closeButton = document.querySelector(".close-button")

const { pathname } = window.location
    const [, searchType, searchedID ] = pathname.split('/')

const getEvent = async id => {
	const response = await fetch(`/api/v1/events/${id}`)
	return await response.json()
}

const showEventList = events => {
	const {id, title, location, date, time} = events
		const eventItem = document.createElement("div")
		eventItem.className = "event-item"
		eventItem.innerHTML = `
			<h2>${title}</h2>
			<h3>${location}</h3>
			<p><strong>Time:</strong> ${time}</p>
			<p><strong>Date:</strong> ${date}</p>
		`
		eventList.appendChild(eventItem)
}

;(async () => {
	const events = await getEvent(searchedID)
	showEventList(events)
})()