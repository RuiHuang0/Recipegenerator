
function mainDivShiftTop(){
    const MainDiv = document.getElementsByClassName("main-div")[0];
    const FoodItem = document.getElementsByClassName("Food-Item")[0];

    FoodItem.classList.toggle("foodPop")
    MainDiv.classList.toggle("shifted");
}

async function fetchData(){

    try{
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast");

        if(!response.ok){
                throw new Error("Could not fetch resource");
            }
        const input = document.getElementsByClassName("Ingredient-Input")[0].value;
        const data = await response.json();
        console.log(data)

    }
    catch(error){
        console.error(error);
    }
}

fetchData()

