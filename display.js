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

            const editButton = document.createElement('button');
            editButton.className = 'edit-button';
            editButton.textContent = 'Edit';
            editButton.onclick = () => handleEdit(node, words);

            linkedListContainer.appendChild(node);
            linkedListContainer.appendChild(editButton);

            if (index < words.length - 1) {
                const link = document.createElement('div');
                link.className = 'link';
                linkedListContainer.appendChild(link);
            }
        });
    }
};

function handleEdit(node, words) {
    alert('Blockchain is encrypted and cannot be edited.');

    // Save the blockchain in a queue structure
    const queueContainer = document.getElementById('encrypted-queue');
    if (!queueContainer.querySelector('h2')) {
        const heading = document.createElement('h2');
        heading.textContent = 'Encrypted Blockchains Data';
        queueContainer.appendChild(heading);
    }

    const queueItem = document.createElement('div');
    queueItem.className = 'queue-item';
    queueItem.textContent = words.join(' - '); // Display the blockchain data
    queueContainer.appendChild(queueItem);

    // Remove edit buttons
    document.querySelectorAll('.edit-button').forEach(button => button.remove());

    // Show "New Version" button
    const newVersionButton = document.createElement('button');
    newVersionButton.className = 'new-version-button';
    newVersionButton.textContent = 'New Version';
    newVersionButton.onclick = () => window.location.href = 'index.html';
    queueContainer.appendChild(newVersionButton);
}
