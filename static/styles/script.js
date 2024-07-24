document.addEventListener('DOMContentLoaded', function() {
    const foodInput = document.getElementById('Food');
    const suggestionsList = document.getElementById('suggestions');


    // Function to filter food suggestions
    function filterFood(query) {
        return foodData.filter(food => food.Food.toLowerCase().includes(query.toLowerCase()));
    }

    // Function to display suggestions
    function showSuggestions(suggestions) {
        suggestionsList.innerHTML = '';
        suggestions.forEach(suggestion => {
            const li = document.createElement('li');
            li.textContent = suggestion.Food;
            li.addEventListener('click', () => {
                foodInput.value = suggestion.Food;
                suggestionsList.innerHTML = '';
            });
            suggestionsList.appendChild(li);
        });
    }

    // Fetch food data from JSON file
    fetch('static/Gtable.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch food data');
            }
            return response.json();
        })
        .then(data => {
            foodData = data; // Assign fetched data to foodData variable
        })
        .catch(error => console.error('Error fetching food data:', error));


    // Function to position suggestions box below input field
    function positionSuggestions() {
        const inputRect = foodInput.getBoundingClientRect();
        suggestionsList.style.top = `${inputRect.bottom}px`;
        suggestionsList.style.left = `${inputRect.left}px`;
        suggestionsList.style.width = `${inputRect.width}px`;
    }

    // Event listener for window resize
    window.addEventListener('resize', positionSuggestions);

    // Event listener for input focus
    foodInput.addEventListener('focus', function() {
        positionSuggestions();
        suggestionsList.style.display = 'block';
    });

    // Event listener for input blur
    // foodInput.addEventListener('blur', function() {
    //     suggestionsList.style.display = 'none';
    // });

    // Event listener for input change
    foodInput.addEventListener('input', function() {
        const query = this.value;
        if (query.length === 0) {
            suggestionsList.innerHTML = '';
            suggestionsList.style.display = 'none';
        } else {
            const suggestions = filterFood(query);
            showSuggestions(suggestions);
            suggestionsList.style.display = 'block';
        }
    });

});