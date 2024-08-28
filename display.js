window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sentence = urlParams.get('sentence');
    if (sentence) {
        const words = sentence.split(' ').slice(0, 4); // Get the first four words
        const linkedListContainer = document.getElementById('linked-list');

        words.forEach((word, index) => {
            const node = document.createElement('div');
            node.className = 'node';
            node.textContent = word;

            linkedListContainer.appendChild(node);

            if (index < words.length - 1) {
                const link = document.createElement('div');
                link.className = 'link';
                linkedListContainer.appendChild(link);
            }
        });
    }
};
