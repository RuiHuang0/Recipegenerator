
/*Main*/

const fullData = [];
fetchData();

/*Komplette API Datenbank zusammengefügt*/
async function fetchData() {

    try {
        Area = [];
        const datalist = document.getElementById('Area');
        const AreaData = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);

        if (!AreaData.ok) {
            throw new Error("Could not fetch resource");
        }
        const data = await AreaData.json();

        if (Array.isArray(data.meals)) {
            Area.push(...data.meals);
            console.log(Area);

            for (let i = 0; i < 29;i++){
                const option = document.createElement("option");
                option.text = Area[i].strArea;
                datalist.appendChild(option);
            }
        }
    }

    catch(error) {
        console.error(error);
    }

    try {
        Area = [];
        const datalist = document.getElementById('Category');
        const AreaData = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`);

        if (!AreaData.ok) {
            throw new Error("Could not fetch resource");
        }
        const data = await AreaData.json();

        if (Array.isArray(data.meals)) {
            Area.push(...data.meals);

            for (let i = 0; i < 14;i++){
                const option = document.createElement("option");
                option.text = Area[i].strCategory;
                datalist.appendChild(option);
            }
        }
    }

    catch(error) {
        console.error(error);

    }

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


/*Handling der Ingredient,Are Input*/
function mainDivShiftTop(){
    const MainDiv = document.getElementsByClassName("main-div")[0];
    const FoodItem = document.getElementsByClassName("Food-Item")[0];
    const Area = document.getElementsByClassName("Area-Input")[0].value;
    const Category = document.getElementsByClassName("Category-Input")[0].value;

    const p0 = document.getElementsByClassName("Food-Item-p0")[0];
    const p1 = document.getElementsByClassName("Food-Item-p1")[0];
    const img0 = document.getElementsByClassName("Food-Item-pic")[0];
    const img1 = document.getElementsByClassName("Food-Item-pic")[1];

    const recipeText0 = document.getElementsByClassName("Food-Item-p0-back")[0];
    const recipeText1 = document.getElementsByClassName("Food-Item-p1-back")[0];

    const fullDataFiltered = fullData.filter(Data => (Data.strArea == Area && Data.strCategory == Category
        )
    );

    FoodItem.classList.add("Food-Item-Active");
    MainDiv.classList.add("shifted");

    console.log(fullDataFiltered.length);

    if (fullDataFiltered.length == 1) {

        p1.innerHTML = "No recipe for your search try different combination";
        img1.src = "./assets/eenton.png";
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

    else if (fullDataFiltered.length == 0) {
        p0.innerHTML = "No recipe for your search try different combination";
        img0.src = "./assets/eenton.png";
        recipeText0.innerHTML = "";
        const ul0 = document.getElementsByClassName("Unordered-List-0")[0];

        ul0.innerHTML = "";

        p1.innerHTML = "No recipe for your search try different combination";
        img1.src = "./assets/eenton.png";
        recipeText1.innerHTML = "";

        const ul1 = document.getElementsByClassName("Unordered-List-1")[0];
        ul1.innerHTML = "";
    }



    else{
        /*Generate Random Number */
        let min = 0;
        let max = fullDataFiltered.length-1;

        let meal0, meal1;
        do {
            meal0 = Math.floor(Math.random() * (max - min + 1)) + min;
            meal1 = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (meal0 == meal1);



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









