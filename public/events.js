
const recipeList = document.querySelector(".recipe-list")

const getRecipes = async () => {
	const response = await fetch('/api/v1/')
	return await response.json()
}

const getRecipe = async id => {
	const response = await fetch(`/api/v1/recipe/${id}`)
	return await response.json()
}

const showRecipeList = recipes => {
	recipes?.forEach(({id, title, image, prepTime, difficulty}) => {
		const recipeItem = document.createElement("div")
		recipeItem.className = "recipe-item"
		recipeItem.innerHTML = `
			<img src="${image}" alt="${title}">
			<h2>${title}</h2>
			<p><strong>Prep Time:</strong> ${prepTime} mins | <strong>Difficulty:</strong> ${difficulty}</p>
		`

		const link = "/events/"+ {id}.id
		recipeItem.onclick = () => window.location.href = link;
		recipeList.appendChild(recipeItem)
	})
}


;(async () => {
	const recipes = await getRecipes()
	showRecipeList(recipes)
})()