// submissionScript.js
// Abdallah Abuhamda
// 04/26/2024

document.getElementById('submissionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    
    // Convert form data to JSON object
    const json = {};
    formData.forEach((value, key) => {
        json[key] = value;
    });

    // Generate JSON file
    const jsonString = JSON.stringify(json, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create a link to download the JSON file
    const a = document.createElement('a');
    a.href = url;
    a.download = `${json.name.replace(/ /g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});
