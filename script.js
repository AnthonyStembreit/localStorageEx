//creates gloabl variables for the html documents that we select by ID 
let hobbyInput = document.querySelector("#hobby");
let firstNameInput = document.querySelector("#firstName");
let lastNameInput = document.querySelector("#lastName");
let submitBtn = document.querySelector("#submitBtn");
let hobbyContainer = document.querySelector("#hobbyContainer");

// a global variable to hold the array from local storage if it exists otherwise will be an empty array for first time users
let personHobbyArr = JSON.parse(localStorage.getItem("peopleHobbies")) ? JSON.parse(localStorage.getItem("peopleHobbies")) : [];

//function to save the information in local storage
function saveList() {
    //creates an object using the values from the inputs on the html
    let personObj = {
        //concatonates the strings for first and last name together with a space between
        name: firstNameInput.value + " " + lastNameInput.value,
        hobby: hobbyInput.value
    }
    //generates a new array of just the names from the current personHobby array
    let justNamesArr = personHobbyArr.map(item => {
        return item.name;
    })
    //checks to see if the name of the person we are trying to add is in the array of just names
    if (justNamesArr.indexOf(personObj.name) === -1) {
        //if the name does not already exist in the array add the new personObj to the array
        personHobbyArr.push(personObj);
        //and add the updated array to local storage 
        localStorage.setItem("peopleHobbies", JSON.stringify(personHobbyArr));
        //update the list in the html
        displayPeopleHobbies();
    } else {
        //alert the user if the name already exists in the array
        alert("This name is already stored!!")
    }
};

//function to dynamically create person-hobby elements
function displayPeopleHobbies() {
    //makes a copy of the array sorted alphabetically 
    let alphabeticalArr = personHobbyArr.sort(function (a, b) {
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
    });
    //empties container so there are not duplicates
    hobbyContainer.innerHTML = "";
    //loops over the array
    for (i = 0; i < personHobbyArr.length; i++) {
        //deconstructs the object at the current index of the alphabetical array
        let { name, hobby } = alphabeticalArr[i];
        //creates an li element to append to the ul container in the html
        let personHobbyEl = document.createElement("li");
        //uses string concatonation and sets the text of the li
        personHobbyEl.innerText = "Name: " + name + " Hobby: " + hobby;
        //appends the li to the page
        hobbyContainer.append(personHobbyEl);
    };
};

//adds an event listener to the button in the form
submitBtn.addEventListener("click", (e) => {
    //prevents the browser from reloading the page
    e.preventDefault();
    //calls the funtion to save our new person-hobby
    saveList();
});
//displays our saved person-hobby objects when the page loads
displayPeopleHobbies();