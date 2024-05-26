document.addEventListener('DOMContentLoaded', function() {
    const recipesContainer = document.querySelector('.recipes-container');

    async function fetchRecipes() {
        let recipes = [];
        
        for (let i = 0; i < 10; i++) {
            const response = await fetch(`https://api.edamam.com/search?q=breakfast&app_id=89018ada&app_key=8202a93380d09cffa516a3acf7f5bdfe`);
            const data = await response.json();
            recipes.push(data.hits[i].recipe);
        }
        
        return recipes;
    }

    fetchRecipes().then(recipes => {
        recipes.forEach(recipe => {
            const recipeElement = `
                <a href="${recipe.url}" target="_blank" class="recipe">
                    <img src="${recipe.image}" alt="${recipe.label}">
                    <h2>${recipe.label}</h2>
                    <ul>
                        ${recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                    <p class="recipe-description">${recipe.source}</p>
                </a>
            `;
            recipesContainer.innerHTML += recipeElement;
        });
    });
});