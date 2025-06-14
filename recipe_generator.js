
/*Main*/

const fullData = [];
fetchData();


/*Komplette API Datenbank zusammengefügt*/
async function fetchData() {

    try {
        for (let i = 0; i < 26; i++) {

            const letter = String.fromCharCode(97 + i);
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);

            if (!response.ok) {
                throw new Error("Could not fetch resource");
            }
            const data = await response.json();

            if (Array.isArray(data.meals)) {
                fullData.push(...data.meals);
            }
        }
        console.log(fullData);
    }

    catch(error) {
        console.error(error);
    }
    return fullData;
}


/*Handling der Ingredient,Are Input*/
function mainDivShiftTop(){
    const MainDiv = document.getElementsByClassName("main-div")[0];
    const FoodItem = document.getElementsByClassName("Food-Item")[0];
    const ingredient = document.getElementsByClassName("Ingredient-Input")[0].value;
    const country = document.getElementsByClassName("Country-Input")[0].value;
    const p0 = document.getElementsByClassName("Food-Item-p0")[0];
    const p1 = document.getElementsByClassName("Food-Item-p1")[0];
    const img = document.getElementsByClassName("Food-Item-pic");
    const recipeText0 = document.getElementsByClassName("Food-Item-p0-back")[0];
    const recipeText1 = document.getElementsByClassName("Food-Item-p1-back")[0];

    const fullDataFiltered = fullData.filter(Data => (Data.strArea == country &&(
                                                                Data.strIngredient1 == ingredient ||
                                                                Data.strIngredient2 == ingredient ||
                                                                Data.strIngredient3 == ingredient ||
                                                                Data.strIngredient4 == ingredient ||
                                                                Data.strIngredient5 == ingredient ||
                                                                Data.strIngredient6 == ingredient ||
                                                                Data.strIngredient7 == ingredient ||
                                                                Data.strIngredient8 == ingredient ||
                                                                Data.strIngredient9 == ingredient ||
                                                                Data.strIngredient10 == ingredient ||
                                                                Data.strIngredient11 == ingredient ||
                                                                Data.strIngredient12 == ingredient ||
                                                                Data.strIngredient13 == ingredient ||
                                                                Data.strIngredient14 == ingredient ||
                                                                Data.strIngredient15 == ingredient ||
                                                                Data.strIngredient16 == ingredient ||
                                                                Data.strIngredient17 == ingredient ||
                                                                Data.strIngredient18 == ingredient ||
                                                                Data.strIngredient19 == ingredient ||
                                                                Data.strIngredient20 == ingredient
            )
        )
    );


    FoodItem.classList.add("Food-Item-Active");
    MainDiv.classList.add("shifted");

    p0.innerHTML = fullDataFiltered[0].strMeal;
    p1.innerHTML = fullDataFiltered[1].strMeal;

    img[0].src = fullDataFiltered[0].strMealThumb;
    img[1].src = fullDataFiltered[1].strMealThumb;

    recipeText0.innerHTML = fullDataFiltered[0].strInstructions;
    recipeText1.innerHTML = fullDataFiltered[1].strInstructions;

    for (let i = 1; i < 20;i++){

        const ul0 = document.getElementsByClassName("Unordered-List-0")[0];
        const li = document.createElement("li");

        if (fullDataFiltered[0][`strIngredient${i}`] == "" || fullDataFiltered[0][`strIngredient${i}`] == null) {
            continue
        }

        li.textContent = `${fullDataFiltered[0][`strIngredient${i}`]} : ${fullDataFiltered[0][`strMeasure${i}`]}`;
        ul0.appendChild(li);
    }

    for (let i = 1; i < 20;i++){

        const ul0 = document.getElementsByClassName("Unordered-List-1")[0];
        const li = document.createElement("li");

        if (fullDataFiltered[1][`strIngredient${i}`] == "" || fullDataFiltered[1][`strIngredient${i}`] == null) {
            continue
        }

        li.textContent = `${fullDataFiltered[1][`strIngredient${i}`]} : ${fullDataFiltered[1][`strMeasure${i}`]}`;
        ul0.appendChild(li);
    }
}


/*Handling Onclick für Recipe*/

function flipCard(cardClass) {
    const card = document.querySelector(`.${cardClass}`);
    card.classList.toggle("flipped");
}






