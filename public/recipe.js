//getting page elements
const recipeList = document.querySelector(".recipe-list")
const eventList = document.querySelector(".sidenav")
const closeButton = document.querySelector(".close-button")
//gets the url
const { pathname } = window.location
    const [, searchType, searchedID ] = pathname.split('/')
//gets the specific recipe
const getRecipe = async id => {
	const response = await fetch(`/api/v1/menu/${id}`)
	return await response.json()
}
//displays that recipe's information to the page
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
//gets the recipe and displays it to the page
;(async () => {
	const recipes = await getRecipe(searchedID)
	showRecipeList(recipes)
})()