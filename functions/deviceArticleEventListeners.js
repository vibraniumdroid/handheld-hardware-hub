// deviceArticleEventListeners.js
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (event) => {
        const deviceContainer = event.target.closest('.device-container');
        if (deviceContainer) {
            console.log("Device click event triggered.");
            const deviceName = deviceContainer.dataset.deviceName;
            window.location.href = `devices/${deviceName}.html`;
        }

        const articleContainer = event.target.closest('.article-container');
        if (articleContainer) {
            console.log("Article click event triggered.");
            const articleName = articleContainer.dataset.articleName;
            window.location.href = `articles/${articleName}.html`;
        }
    });
});


