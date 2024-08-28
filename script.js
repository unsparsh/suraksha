document.querySelector('form').onsubmit = async e => {
    e.preventDefault();
    try {
        const response = await fetch('/api/blockchain', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sentence: document.querySelector('textarea').value })
        });

        alert('Blockchain built successfully!');
        const sentence = document.querySelector('textarea').value;
        window.location.href = `display.html?sentence=${encodeURIComponent(sentence)}`;
    } catch (error) {
        alert('An error occurred while building the blockchain.');
    }
};
