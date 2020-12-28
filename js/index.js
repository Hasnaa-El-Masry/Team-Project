// Declare All Variables :

let categoryArray = [];
let dataArray = [];
let mealDetails = [];
let categoryMenu = document.querySelector(".category-menu");
let category = "Beef";
let idMeal = "52874";
let currentSrc ="";

// LightBox Variables :

let dataRow = document.getElementById("dataRow");
let lightBox = document.querySelector(".lightBox");
let lightBoxImg = document.getElementById("lightImg");
let closeIcon = document.getElementById("close");
let dishDetailsTextArea = document.getElementById("dishDetails");
let body = document.getElementsByTagName("body");

// Get category names from Api:

function getMealsCategories(){

    let httpReq = new XMLHttpRequest();

    httpReq.open("GET",`https://www.themealdb.com/api/json/v1/1/categories.php`);

    httpReq.send();

    httpReq.onreadystatechange = function(){

        if(httpReq.readyState == 4 && httpReq.status == 200 ){

            categoryArray =JSON.parse(httpReq.response).categories;
            
            displayCategories();
        }
        
    };
}

getMealsCategories();

// Display category names in links :

function displayCategories(){

    let temp = "";

    for(let i = 0 ; i < categoryArray.length ; i++){

        temp += `<li class="btn">${categoryArray[i].strCategory}</li>`;

    }

    document.querySelector(".category-menu").innerHTML = temp;

};

// Add click event on links to change meals category:

categoryMenu.addEventListener("click",function(e){

    category = e.target.innerHTML;
    getMealsByCat(category);

});

// Get meals from Api with their category :

function getMealsByCat(category){

    let httpReq = new XMLHttpRequest();

    httpReq.open("GET",`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);

    httpReq.send();

    httpReq.onreadystatechange = function(){

        if(httpReq.readyState == 4 && httpReq.status == 200 ){

            dataArray =JSON.parse(httpReq.response).meals;
            displayData();
        }
        
    };
}

getMealsByCat(category);

// Display meals that are responsed from Api in the page:

function displayData(){

    let temp ="";

    for(let i = 0 ; i < dataArray.length ; i++){

        currentSrc = dataArray[i].strMealThumb;
        idMeal = dataArray[i].idMeal;

        temp += `<div class="col-sm-6 col-md-4 mb-5">
        <div class="dish text-center">
          <div class="card shadow border-0 rounded-0">
            <img src=${currentSrc} class="img-fluid">
            <div class="img-overlay" onclick="showightBox(this , ${idMeal})">
                <i class="fas fa-plus fa-2x text-white"></i>
            </div>
            <div class="card-body">
                <h5 class="card-title">${dataArray[i].strMeal}</h5>
            </div>
          </div>
        </div>
      </div>`;   
     
    }

   document.getElementById("dataRow").innerHTML = temp;

}

// Get Meals Dtails :

function getMealsDetails(idMeal){

    let httpReq = new XMLHttpRequest();

    httpReq.open("GET",`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);

    httpReq.send();

    httpReq.onreadystatechange = function(){

        if(httpReq.readyState == 4 && httpReq.status == 200 ){

            mealDetails = JSON.parse(httpReq.response).meals;
        }
    
    };
}

getMealsDetails(idMeal);

// Show The light box :

function showightBox(thisEl , idMeal){

    lightBox.style.display = "flex";
    lightBoxImg.setAttribute("src",thisEl.parentElement.children[0].src);
    dishDetailsTextArea.innerHTML = mealDetails[0].strInstructions;
    body[0].style.overflow = "hidden";
    getMealsDetails(idMeal);
};

// Hide The light box :

closeIcon.addEventListener("click", hideLightBox );

function hideLightBox(){
    lightBox.style.display = "none";
    body[0].style.overflow = "auto";
}

window.addEventListener("keydown",function(e){
    if(e.key == "Escape"){
        hideLightBox()
    };
});

window.addEventListener("click",function(e){
    if(e.target == lightBox){
        hideLightBox()
    }
})
