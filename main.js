/*Main*/

const fullData = [];
const Area = [];

document.addEventListener("DOMContentLoaded", () => {
    main();
})

async function main(){
    await fetchDataArea();
    await fetchDataAll();
    AreaInputSelection();

}


/*API Fetch für AreaDaten*/

async function fetchDataArea() {

    try {
        const AreaData = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);

        if (!AreaData.ok) {
            throw new Error("Could not fetch resource");
        }
        const data = await AreaData.json();

        if (Array.isArray(data.meals)) {
            Area.push(...data.meals);

        }
    }
    catch(error){
            console.error(error);
    }
}


/*API Fetch für FullDaten*/

async function fetchDataAll() {
    try {
        const promises = [];
        for (let i = 0; i < 26; i++) {
            const letter = String.fromCharCode(97 + i);
            promises.push(fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`));
        }

        const responses = await Promise.all(promises);
        const data = await Promise.all(responses.map(r => r.json()));

        fullData.push(...data.flatMap(d => d.meals || []));
    } catch (error) {
        console.error(error);
    }

}

/*Generate Input selection of Area*/

function AreaInputSelection(){

    const selectElement = document.getElementById("area-select");

    for (let i = 0; i < 29; i++) {
        const option = document.createElement("option");
        option.value = Area[i].strArea;  // Set the value attribute
        option.textContent = Area[i].strArea;  // Set the visible text
        selectElement.appendChild(option);
    }
}

/*Switch von Area zu Category*/

function AreaInput() {

    document.querySelector('.Area-Button-active').classList.add("Area-Button-inactive");
    document.querySelector('.Area-Select-active').classList.add("Area-Select-inactive");
    document.querySelector('.Category-Button-inactive').classList.add("Category-Button-active");
    document.querySelector('.Category-Select-inactive').classList.add("Category-Select-active");

    const IntroText = document.getElementsByClassName("main-div-h1")[0];
    IntroText.innerHTML = "Perfect! Now click the Category of your desired Food";

    const selectArea = document.querySelector('.Area-Select-active').value;
    const selectElement = document.getElementById("category-select");

    // Filter Category by AreaInput

    while (selectElement.options.length > 1) {
        selectElement.remove(1); // Remove from index 1 onward
    }
    const uniqueCategories = new Set();
    fullData.filter(meal => meal.strArea === selectArea)
        .forEach(meal => uniqueCategories.add(meal.strCategory));

    uniqueCategories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        selectElement.appendChild(option);
    });
}

/*Switch von Category zu Area + Generierung Rezept,Foto,Bild,Name*/
function CategoryInput(){

    /*Switch von Category zu Area*/
    const AreaButton = document.getElementsByClassName("Area-Button-active")[0];
    const AreaSelect = document.getElementsByClassName("Area-Select-active")[0];

    const CategoryButton = document.getElementsByClassName("Category-Button-inactive")[0];
    const CategorySelect = document.getElementsByClassName("Category-Select-inactive")[0];
    const IntroText = document.getElementsByClassName("main-div-h1")[0];
    IntroText.innerHTML = "Great Choice! Select another Country if you changed your mind";

    AreaButton.classList.remove("Area-Button-inactive");
    AreaSelect.classList.remove("Area-Select-inactive");

    CategoryButton.classList.remove("Category-Button-active");
    CategorySelect.classList.remove("Category-Select-active");

    //Shift to the Top and display Flipcards
    const MainDiv = document.getElementsByClassName("main-div")[0];
    const FoodItem = document.getElementsByClassName("Food-Item")[0];

    FoodItem.classList.add("Food-Item-Active");
    MainDiv.classList.add("shifted");

    //Add Picture Recipe Name to Flipcards

    const p0 = document.getElementsByClassName("Food-Item-p0")[0];
    const p1 = document.getElementsByClassName("Food-Item-p1")[0];
    const img0 = document.getElementsByClassName("Food-Item-pic")[0];
    const img1 = document.getElementsByClassName("Food-Item-pic")[1];

    const recipeText0 = document.getElementsByClassName("Food-Item-p0-back")[0];
    const recipeText1 = document.getElementsByClassName("Food-Item-p1-back")[0];

    let areaValue = document.getElementById("area-select").value;
    let categoryValue = document.getElementById("category-select").value;

    const fullDataFiltered = fullData.filter(Data =>
        Data.strArea === areaValue &&
        Data.strCategory === categoryValue
    );

    if (fullDataFiltered.length == 1) {

        p1.innerHTML = "There is only 1 Recipe for this Combination";
        img1.src = "";
        recipeText1.innerHTML = "";

        const ul1 = document.getElementsByClassName("Unordered-List-1")[0];
        ul1.innerHTML = "";

        /*FirstImage*/
        p0.innerHTML = fullDataFiltered[0].strMeal;
        img0.src = fullDataFiltered[0].strMealThumb;
        recipeText0.innerHTML = fullDataFiltered[0].strInstructions;
        const ul0 = document.getElementsByClassName("Unordered-List-0")[0];

        ul0.innerHTML = "";


        for (let i = 1; i < 20; i++) {

            const li = document.createElement("li");

            if (fullDataFiltered[0][`strIngredient${i}`] == "" || fullDataFiltered[0][`strIngredient${i}`] == null) {
                continue
            }

            li.textContent = `${fullDataFiltered[0][`strIngredient${i}`]} : ${fullDataFiltered[0][`strMeasure${i}`]}`;
            ul0.appendChild(li);
        }
    }

    else{
        /*Generate Random Number */
        let min = 0;
        let max = fullDataFiltered.length-1;

        let meal0, meal1;
        do {
            meal0 = Math.floor(Math.random() * (max - min + 1)) + min;
            meal1 = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (meal0 === meal1);



        /*FirstImage*/
        p0.innerHTML = fullDataFiltered[meal0].strMeal;
        img0.src = fullDataFiltered[meal0].strMealThumb;
        recipeText0.innerHTML = fullDataFiltered[meal0].strInstructions;
        const ul0 = document.getElementsByClassName("Unordered-List-0")[0];

        ul0.innerHTML = "";


        for (let i = 1; i < 20;i++){

            const li = document.createElement("li");

            if (fullDataFiltered[meal0][`strIngredient${i}`] == "" || fullDataFiltered[meal0][`strIngredient${i}`] == null) {
                continue
            }

            li.textContent = `${fullDataFiltered[meal0][`strIngredient${i}`]} : ${fullDataFiltered[meal0][`strMeasure${i}`]}`;
            ul0.appendChild(li);
        }
        /*SecondImage*/
        p1.innerHTML = fullDataFiltered[meal1].strMeal;
        img1.src = fullDataFiltered[meal1].strMealThumb;
        recipeText1.innerHTML = fullDataFiltered[meal1].strInstructions;

        const ul1 = document.getElementsByClassName("Unordered-List-1")[0];
        ul1.innerHTML = "";

        for (let i = 1; i < 20;i++){

            const li = document.createElement("li");

            if (fullDataFiltered[meal1][`strIngredient${i}`] == "" || fullDataFiltered[meal1][`strIngredient${i}`] == null) {
                continue
            }

            li.textContent = `${fullDataFiltered[meal1][`strIngredient${i}`]} : ${fullDataFiltered[meal1][`strMeasure${i}`]}`;
            ul1.appendChild(li);
        }

    }
}















