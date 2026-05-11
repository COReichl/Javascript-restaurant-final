
const recipeList = document.querySelector(".recipe-list")
const eventList = document.querySelector(".sidenav")
const closeButton = document.querySelector(".close-button")

const { pathname } = window.location
    const [, searchType, searchedID ] = pathname.split('/')

const getRecipe = async id => {
	const response = await fetch(`/api/v1/menu/${id}`)
	return await response.json()
}

const showRecipeList = recipes => {
	const {id, title, image, description, ingredients, cost} = recipes
		const recipeItem = document.createElement("div")
		recipeItem.className = "recipe-item"
		recipeItem.innerHTML = `
			<img src="${image}" alt="${title}">
			<h2>${title}</h2>
			<p><strong>Description:</strong> ${description}</p>
			<p><strong>Ingredients:</strong> ${ingredients}</p>
			<p><strong>Cost:</strong> $${cost}</p>
		`
		recipeList.appendChild(recipeItem)
}

;(async () => {
	const recipes = await getRecipe(searchedID)
	showRecipeList(recipes)
})()