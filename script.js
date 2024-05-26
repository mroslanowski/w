document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const input = document.querySelector('input[type="text"]');
    const ingredientsPanel = document.querySelector('.ingredients-panel');
    const recipesContainer = document.querySelector('.recipes-container');

    function addIngredient(ingredient) {
        const currentText = input.value;
        if (currentText) {
            input.value = `${currentText}, ${ingredient}`;
        } else {
            input.value = ingredient;
        }
    }

    ingredientsPanel.addEventListener('click', function(e) {
        if (e.target.classList.contains('ingredient')) {
            const ingredient = e.target.textContent;
            addIngredient(ingredient);
        }
    });

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const ingredients = input.value.trim(); // Usuwamy spacje z początku i końca
        console.log('Searching for recipes with ingredients:', ingredients); // Debug log

        recipesContainer.innerHTML = ''; // Czyszczenie poprzednich wyników

        try {
            const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=${ingredients}&app_id=7247557a&app_key=8202a93380d09cffa516a3acf7f5bdfe`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const recipes = data.hits;

            if (recipes.length > 0) {
                recipes.forEach(recipe => {
                    const recipeElement = `
                        <div class="recipe">
                            <a href="${recipe.recipe.url}" target="_blank">
                                <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
                                <h2>${recipe.recipe.label}</h2>
                            </a>
                        </div>
                    `;
                    recipesContainer.innerHTML += recipeElement;
                });
            } else {
                recipesContainer.innerHTML = '<p>No recipes found. Try different ingredients.</p>';
            }
        } catch (error) {
            console.error('Error fetching recipes:', error);
            recipesContainer.innerHTML = `<p>An error occurred while fetching recipes. Please try again later. Error: ${error.message}</p>`;
        }
    });
});
