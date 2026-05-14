//gets page elements
const recipeList = document.querySelector(".recipe-list")
const eventList = document.querySelector(".sidenav")
const closeButton = document.querySelector(".close-button")
//gets all the recipes
const getRecipes = async () => {
	const response = await fetch('/api/v1/')
	return await response.json()
}
//gets all the events
const getEvents = async () => {
	const response = await fetch('/api/v1/events')
	return await response.json()
}
//displays the recipes to the page in seperate elements that can be clicked on
//to bring you to the specific page for that item
const showRecipeList = recipes => {
	recipes?.forEach(({id, title, image, description, cost}) => {
		const recipeItem = document.createElement("div")
		recipeItem.className = "recipe-item"
		recipeItem.innerHTML = `
			<img src="${image}" alt="${title}">
			<h2>${title}</h2>
			<p><strong>Description:</strong> ${description}</p>
			<p><strong>Cost:</strong> $${cost}</p>
		`
		const link = "/menu/"+ {id}.id
		recipeItem.onclick = () => window.location.href = link;
		recipeList.appendChild(recipeItem)
	})
}
//displays the events to the page in seperate elements that can be clicked on
//to bring you to the specific page for that event
const showEvents = events => {
	events?.forEach(({id, title}) => {
		const eventItem = document.createElement("a")
		eventItem.className = "event-item"
		eventItem.href = '#'
		eventItem.textContent = `${title}`

		const link = "/events/"+ {id}.id
		eventItem.onclick = () => window.location.href = link;
		eventList.appendChild(eventItem)
	})
}

//loads the page
;(async () => {
	const recipes = await getRecipes()
	showRecipeList(recipes)
	const events = await getEvents()
	showEvents(events)
})()