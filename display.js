window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sentence = urlParams.get('sentence');
    const linkedListContainer = document.getElementById('linked-list');
    const toggleSwitch = document.getElementById('toggle-edit');

    // Load and display any existing blockchain data from sessionStorage
    const existingBlockchain = sessionStorage.getItem('blockchain');
    if (existingBlockchain) {
        displayBlockchain(JSON.parse(existingBlockchain), linkedListContainer);
    }

    // Process new sentence if present
    if (sentence) {
        const words = sentence.split(' ');
        const maxNodes = 4;
        const nodes = [];

        for (let i = 0; i < maxNodes; i++) {
            let nodeContent = '';
            if (i < maxNodes - 1) {
                nodeContent = words[i] || ''; // Add words to the first three nodes
            } else {
                nodeContent = words.slice(i).join(' '); // Concatenate remaining words for the last node
            }
            nodes.push(nodeContent);
        }

        // Save the new blockchain data to sessionStorage
        sessionStorage.setItem('blockchain', JSON.stringify(nodes));

        // Display the blockchain
        displayBlockchain(nodes, linkedListContainer);
    }

    // Toggle switch to show/hide edit buttons
    toggleSwitch.onchange = () => {
        const editButtons = document.querySelectorAll('.edit-button');
        editButtons.forEach(button => {
            button.style.display = toggleSwitch.checked ? 'inline-block' : 'none';
        });
    };
};

function displayBlockchain(nodes, container) {
    container.innerHTML = ''; // Clear any existing content
    const maxNodes = 4;

    for (let i = 0; i < maxNodes; i++) {
        const node = document.createElement('div');
        node.className = 'node';
        node.textContent = nodes[i];

        const editButton = document.createElement('button');
        editButton.className = 'edit-button';
        editButton.textContent = 'Edit';
        editButton.style.display = 'none'; // Hide by default, controlled by the toggle switch
        editButton.onclick = () => handleEdit(node, nodes);

        container.appendChild(node);
        container.appendChild(editButton);

        if (i < maxNodes - 1) {
            const link = document.createElement('div');
            link.className = 'link';
            container.appendChild(link);
        }
    }

    // Show any previously stored blockchain data in the queue
    const queueContainer = document.getElementById('encrypted-queue');
    const queueItem = document.createElement('div');
    queueItem.className = 'queue-item';
    queueItem.textContent = nodes.join(' - ');
    queueContainer.appendChild(queueItem);
}

function handleEdit(node, nodes) {
    alert('Blockchain is encrypted and cannot be edited.');

    // Save the blockchain in a queue structure
    const queueContainer = document.getElementById('encrypted-queue');
    if (!queueContainer.querySelector('h2')) {
        const heading = document.createElement('h2');
        heading.textContent = 'Data Breach Warning!';
        queueContainer.appendChild(heading);
    }

    const queueItem = document.createElement('div');
    queueItem.className = 'queue-item';
    queueItem.textContent = nodes.join(' - '); // Display the blockchain data
    queueContainer.appendChild(queueItem);

    // Remove edit buttons
    document.querySelectorAll('.edit-button').forEach(button => button.remove());

    // Show "New Version" button
    const newVersionButton = document.createElement('button');
    newVersionButton.className = 'new-version-button';
    newVersionButton.textContent = 'New Version';
    newVersionButton.onclick = () => window.location.href = 'index.html';
    queueContainer.appendChild(newVersionButton);

    // Save the updated queue to sessionStorage
    sessionStorage.setItem('blockchain', JSON.stringify(nodes));
}
