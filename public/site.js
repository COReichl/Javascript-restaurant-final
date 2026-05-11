
const recipeList = document.querySelector(".recipe-list")
const eventList = document.querySelector(".sidenav")
const modal = document.getElementById("recipeModal")
const closeButton = document.querySelector(".close-button")

const modalElements = {
	title: document.getElementById('modalTitle'),
	cost: document.getElementById('modalCost'),
	instructions: document.getElementById('modalInstructions'),
	image: document.getElementById('modalImage')
}

const getRecipes = async () => {
	const response = await fetch('/api/v1/')
	return await response.json()
}

const getEvents = async () => {
	const response = await fetch('/api/v1/events')
	return await response.json()
}

const getRecipe = async id => {
	const response = await fetch(`/api/v1/recipe/${id}`)
	return await response.json()
}

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

const showRecipeDetails = async id => {

	const {title, image, ingredients, cost} = await getRecipe(id)

	modalElements.title.textContent = title
	modalElements.cost.textContent = `$${cost}`
	modalElements.image.src = image

	const ingredientsList = document.getElementById("modalIngredients")
	ingredientsList.innerHTML = ''
	ingredients.forEach(ingredient => {
		const li = document.createElement('li')
		li.textContent = ingredient
		ingredientsList.appendChild(li)
	})

	modal.style.display = 'flex'
}

closeButton.onclick = () => modal.style.display = 'none'

window.onclick = event => {
	if (event.target === modal) modal.style.display = 'none'
}


;(async () => {
	const recipes = await getRecipes()
	showRecipeList(recipes)
	const events = await getEvents()
	showEvents(events)
})()