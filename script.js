let slideIndex = 0;
showSlides();
function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 4000); // Change image every 4 seconds
}

// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // Select the elements from the HTML
    const translateBtn = document.getElementById('translate-btn');
    const englishTextArea = document.getElementById('english-text');
    const sinhalaTextArea = document.getElementById('sinhala-text');

    // Add a click event listener to the button
    translateBtn.addEventListener('click', () => {
        const englishText = englishTextArea.value.trim(); // Get the text and remove whitespace

        // If there's no text, do nothing
        if (!englishText) {
            alert("Please enter some text to translate.");
            return;
        }
        
        // Set a temporary message while fetching
        sinhalaTextArea.value = "Translating...";

        // Construct the API URL
        // q = the text to translate
        // langpair = the language pair (English|Sinhala)
        const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(englishText)}&langpair=en|si`;

        // Use the fetch() function to make the API request
        fetch(apiUrl)
            .then(response => response.json()) // Convert the response to JSON
            .then(data => {
                // Check if the translation was successful
                if (data.responseData) {
                    const translatedText = data.responseData.translatedText;
                    sinhalaTextArea.value = translatedText;
                } else {
                    sinhalaTextArea.value = "Error: Could not retrieve translation.";
                }
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch
                console.error('Translation Error:', error);
                sinhalaTextArea.value = "Error: Failed to connect to the translation service.";
            });
    });
});
