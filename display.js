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
        const nodes = words.map(word => word); // Each word becomes a separate node

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

    // New Version Button functionality
    document.getElementById('new-version-button').onclick = () => {
        // Redirect to index.html while keeping the existing data in sessionStorage
        window.location.href = 'index.html';
    };
};

function displayBlockchain(nodes, container) {
    container.innerHTML = ''; // Clear any existing content

    nodes.forEach((nodeContent, i) => {
        const node = document.createElement('div');
        node.className = 'node';
        node.textContent = nodeContent;

        const editButton = document.createElement('button');
        editButton.className = 'edit-button';
        editButton.textContent = 'Edit';
        editButton.style.display = 'none'; // Hide by default, controlled by the toggle switch
        editButton.onclick = () => handleEdit(node, nodes, i);

        container.appendChild(node);
        container.appendChild(editButton);

        if (i < nodes.length - 1) {
            const link = document.createElement('div');
            link.className = 'link';
            container.appendChild(link);
        }
    });

    // Show any previously stored blockchain data in the queue
    const queueContainer = document.getElementById('encrypted-queue');
    const queueItem = document.createElement('div');
    queueItem.className = 'queue-item';
    queueItem.textContent = nodes.join(' - ');
    queueContainer.appendChild(queueItem);
}

function handleEdit(node, nodes, index) {
    const oldText = node.textContent;

    // Allow user to edit the content
    const newText = prompt("Edit the block content:", oldText);
    if (newText !== null && newText !== "") {
        // Show loader and disable editing
        showLoader();

        // Temporarily update the node with the new text
        node.textContent = newText;
        node.style.backgroundColor = "#f0f0f0"; // Change color to grey
        node.style.color = "#000000";

        // Show loader for 6 seconds
        setTimeout(() => {
            hideLoader();

            // Show data stealing warning and the node serial number change
            showWarning(index + 1); // Pass the node serial number to show in the warning

            // Update the linked list node with the new text
            nodes[index] = newText;
            node.textContent = newText;

        }, 6000); // 6 seconds delay
    }
}
// Show loader
function showLoader() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = '<div class="spinner"></div><p>Consensus started...</p>';
    document.body.appendChild(loader);
}

// Hide loader
function hideLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.remove();
    }
}

// Show data stealing warning
function showWarning(serialNumber) {
    const queueContainer = document.getElementById('encrypted-queue');

    // Create warning item
    const warningItem = document.createElement('div');
    warningItem.className = 'warning-item';
    warningItem.textContent = "Warning: Unauthorized Data Manipulation!";

    // Create a separate div for the changed node serial number
    const changeItem = document.createElement('div');
    changeItem.className = 'change-item';
    changeItem.textContent = `Node ${serialNumber} Changed`;

    // Append the warning and the change information under the same warning
    warningItem.appendChild(changeItem);
    queueContainer.appendChild(warningItem);
}


// Display the serial number of the changed node
function showChangedNode(serialNumber) {
    const queueContainer = document.getElementById('encrypted-queue');
    const changeItem = document.createElement('div');
    changeItem.className = 'change-item';
    changeItem.textContent = `Node ${serialNumber} Changed`;
    queueContainer.appendChild(changeItem);
}

// Revert the blockchain to the original data stored in sessionStorage
function revertBlockchainToOriginal() {
    const linkedListContainer = document.getElementById('linked-list');
    const originalBlockchain = JSON.parse(sessionStorage.getItem('blockchain'));

    if (originalBlockchain) {
        displayBlockchain(originalBlockchain, linkedListContainer);
    }
}
