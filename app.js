//Select HTML elements by their IDs and classes.
const input = document.querySelector('#fruit'); // The first element is the ID of '#fruit', it is the input field where users type fruit names. 
const suggestions = document.querySelector('.suggestions ul'); // Get the class of '.suggestions ul', is a list to display matching suggestions.

// Create an array of fruit names.
const fruitArr = [
    'Apple 🍎', 'Apricot', 'Avocado 🥑', 'Banana 🍌', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry 🍒', 'Coconut 🥥', 'Cranberry', 'Cucumber 🥒', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape 🍇', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit 🥝', 'Kumquat', 'Lemon 🍋', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango 🥭', 'Mangosteen', 'Marionberry', 'Melon 🍈', 'Cantaloupe', 'Honeydew', 'Watermelon 🍉', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange 🍊', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach 🍑', 'Pear 🍐', 'Persimmon', 'Plantain', 'Plum', 'Pineapple 🍍', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry 🍓', 'Tamarillo', 'Tamarind', 'Yuzu'
];

// Define the search function and takes a string as an argument.
function search(str) {
    let resultsArr = []; // Initialize an empty array to store matching fruit names.
    const inputVal = str.toLowerCase(); // Convert user input to lowercase for a case-insensitive search.

    // Loop through the fruit array.
    for (i = 0; i < fruitArr.length; i++) {
        // Check if the lowercase version of the fruit name includes the lowercase input.
        if (fruitArr[i].toLowerCase().includes(inputVal)) {
            resultsArr.push(fruitArr[i]); // Add matching fruit names to the results array.
        }
    }
    return resultsArr; // Return the array of matching results.
    //const resultsArr = fruitArr.filter(fruit => fruit.toLowerCase().includes(inputVal)); //One liner for the above loop.
}

// Define the search handler function. It handles user input.
function searchHandler(e) {
    const inputVal = e.currentTarget.value; // Get the user's current input.
    let resultsArr = []; // Initialize an empty array to store matching results.

    if (inputVal.length > 0) { // Check if there's input.
        resultsArr = search(inputVal); // Call the search function to find matching fruit names.
    }
    showSuggestions(resultsArr, inputVal); // Display matching suggestions based on results.
}

//Define the function to display suggestions.
function showSuggestions(resultsArr, inputVal) {
    if (resultsArr.length > 0) { // Check if there are matching results.
        suggestions.innerHTML = ''; // Clear any previous suggestions.
        suggestions.classList.add('has-suggestions'); // Add the 'has-suggestions' class for styling.

        resultsArr.forEach(item => {
            // Highlight matching text using the <strong> element.
            const highlightedItem = item.replace(new RegExp(inputVal, 'gi'), match => `<strong>${match}</strong>`);
            const listItem = document.createElement('li'); // Create an <li> element for each suggestion.
            listItem.innerHTML = highlightedItem; // Set the HTML content of the <li>.
            listItem.addEventListener('click', useSuggestion); // Add a click event listener.
            suggestions.appendChild(listItem); // Append the suggestion to the list.
        });
    } else { // No matching results.
        resultsArr = []; //Makes an empty array
        suggestions.innerHTML = ''; // Clear any existing suggestions.
        suggestions.classList.remove('has-suggestions'); // Remove the 'has-suggestions' class.
    }
}

// Define the function to use a selected suggestion.
function useSuggestion(e) {
    input.value = e.target.innerText; // Populate the input field with the selected suggestion.
    input.focus(); // Return focus to the input field.
    suggestions.innerHTML = ''; // Clear the suggestions list.
    suggestions.classList.remove('has-suggestions'); // Remove the 'has-suggestions' class.
}

// Add event listeners to listen for user input and suggestion clicks.
input.addEventListener('keyup', searchHandler); // Listen for user input.
suggestions.addEventListener('click', useSuggestion); // Listen for suggestion clicks.