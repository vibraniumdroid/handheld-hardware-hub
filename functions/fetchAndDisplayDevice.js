// fetchAndDisplayDevice.js
// Abdallah Abuhamda
// 04/26/2024

// fetchAndDisplayDevice.js
async function fetchAndDisplayDevice(deviceName, ...properties) {
    try {
        // Fetch device .json
        const response = await fetch(`/devices/${deviceName}.json`);
        const deviceData = await response.json();

        // Container div for device info
        const deviceContainer = document.createElement('div');
        deviceContainer.classList.add('device-container'); // Add class 'device-container'
        deviceContainer.dataset.deviceName = deviceName; // Add device name to dataset

        // Loop through properties
        properties.forEach(property => {
            // Check if property is 'image'
            if (property === 'image') {
                // Create img element
                const imageElement = document.createElement('img');
                // Set src attribute to image URL
                imageElement.src = `devices/images/${deviceData[property]}`;
                imageElement.alt = 'Device Image';
                // Append img element to container
                deviceContainer.appendChild(imageElement);
            } else if (typeof deviceData[property] === 'string') {
                // Create paragraph element for other properties
                const element = document.createElement('p');
                // Set text content to property value from deviceData
                element.textContent = deviceData[property];
                // Append paragraph element to container
                deviceContainer.appendChild(element);
            }
        });

        // Check if last property is string with 'section' in it
        const lastProperty = properties[properties.length - 1];
        if (typeof lastProperty === 'string' && lastProperty.includes('section')) {
            // Find section element based on provided string
            const sectionSelector = `.device-section:nth-of-type(${lastProperty.split('-')[1]})`;
            const deviceSection = document.querySelector(sectionSelector);

            // Append device container to specified section
            deviceSection.appendChild(deviceContainer);
        } else {
            // If no section is specified use legacy functionality
            const deviceSection = document.querySelector('.device-section');
            deviceSection.appendChild(deviceContainer);
        }

    } catch (error) {
        console.error('Error fetching device information:', error);
    }
}
