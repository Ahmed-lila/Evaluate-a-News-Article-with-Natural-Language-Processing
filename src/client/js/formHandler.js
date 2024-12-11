import { checkURL } from './checkurl';

function handleSubmit(event) {
    event.preventDefault();

    const url = document.getElementById('article-url').value;

    // Check if the URL is valid
    if (checkURL(url)) {
        // Debugging: Log the URL
        console.log("Valid URL: ", url);

        // Make the fetch request to the server
        fetch('http://localhost:8081/add', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        })
        .then((res) => {
            // Debugging: Log the response status
            console.log("Response status: ", res.status);

            if (!res.ok) {
                throw new Error('Network response was not ok ' + res.statusText);
            }
            return res.json();
        })
        .then((data) => {
            // Debugging: Log the data received from the server
            console.log("Data received: ", data);

            document.getElementById('text').innerHTML = `Text: ${data.text}`;
            document.getElementById('agreement').innerHTML = `Agreement: ${data.agreement}`;
            document.getElementById('subjectivity').innerHTML = `Subjectivity: ${data.subjectivity}`;
            document.getElementById('confidence').innerHTML = `Confidence: ${data.confidence}`;
            document.getElementById('irony').innerHTML = `Irony: ${data.irony}`;
            document.getElementById('score_tag').innerHTML = `Score Tag: ${data.score_tag}`;
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
    } else {
        alert('Invalid URL');
    }
}

export { handleSubmit };

