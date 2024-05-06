// fetchAndDisplayArticle.js
// Abdallah Abuhamda
// 04/26/2024

async function fetchAndDisplayArticle(articleName, ...properties) {
    try {
        // Fetch article .json
        const response = await fetch(`/articles/${articleName}.json`);
        const articleData = await response.json();

        // Container div for article info
        const articleContainer = document.createElement('div');
        articleContainer.classList.add('article-container'); // Add class 'article-container'
        articleContainer.dataset.articleName = articleName; // Add article name to dataset

        // Loop through properties
        properties.forEach(property => {
            // Check if property is 'image'
            if (property === 'image') {
                // Create img element
                const imageElement = document.createElement('img');
                // Set src attribute to image URL
                imageElement.src = `/articles/images/${articleData[property]}`;
                imageElement.alt = 'Article Image';
                // Append img element to container
                articleContainer.appendChild(imageElement);
            } else if (property === 'content') {
                // Create div element for content
                const contentElement = document.createElement('div');
                // Set inner HTML to content
                contentElement.innerHTML = articleData[property];
                // Append content element to container
                articleContainer.appendChild(contentElement);
            } else if (typeof articleData[property] === 'string') {
                // Create paragraph element for other properties
                const element = document.createElement('p');
                // Set text content to property value from articleData
                element.textContent = articleData[property];
                // Append paragraph element to container
                articleContainer.appendChild(element);
            }
        });

        // Check if last property is string with 'section' in it
        const lastProperty = properties[properties.length - 1];
        if (typeof lastProperty === 'string' && lastProperty.includes('section')) {
            // Find section element based on provided string
            const sectionSelector = `.article-section:nth-of-type(${lastProperty.split('-')[1]})`;
            const articleSection = document.querySelector(sectionSelector);

            // Append article container to specified section
            articleSection.appendChild(articleContainer);
        } else {
            // If no section is specified use legacy functionality
            const articleSection = document.querySelector('.article-section');
            articleSection.appendChild(articleContainer);
        }

    } catch (error) {
        console.error('Error fetching article information:', error);
    }
}
