
function mainDivShiftTop(){
    const MainDiv = document.getElementsByClassName("main-div")[0];
    const FoodItem = document.getElementsByClassName("Food-Item")[0];
    const ingredient = document.getElementsByClassName("Ingredient-Input")[0].value;
    const country = document.getElementsByClassName("Country-Input")[0].value;

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

    FoodItem.classList.toggle("foodPop");
    MainDiv.classList.toggle("shifted");

}


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
    }

    catch(error) {
            console.error(error);
        }
    return fullData;
}




const fullData = []
fetchData()
