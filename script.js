const draggables = document.querySelectorAll('.draggable');
const pumpkinArea = document.getElementById('pumpkin-area');

// Handle drag start
draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
});

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.src);
}

// Handle drop on the pumpkin area
pumpkinArea.addEventListener('dragover', event => {
    event.preventDefault();
});

pumpkinArea.addEventListener('drop', event => {
    event.preventDefault();
    const src = event.dataTransfer.getData('text/plain');
    if (src) {
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('dropped', 'scaled'); // Add 'scaled' class
        img.style.position = 'absolute';

        // Calculate position when the image is ready (loaded in this context)
        img.onload = () => {
            const pumpkinRect = pumpkinArea.getBoundingClientRect();
            const scaleFactor = 0.6; // Factor based on .scaled class

            img.style.width = `${img.width * scaleFactor}px`; // Adjust width based on scale
            img.style.height = `${img.height * scaleFactor}px`; // Adjust height based on scale

            img.style.left = (event.clientX - pumpkinRect.left - (img.width * scaleFactor) / 2) + 'px';
            img.style.top = (event.clientY - pumpkinRect.top - (img.height * scaleFactor) / 2) + 'px';

            pumpkinArea.appendChild(img);
        };

        img.setAttribute('draggable', 'true');
        img.addEventListener('dragstart', dragStartDropped);
    }
});

function dragStartDropped(event) {
    event.dataTransfer.setData('text/plain', event.target.src);
    const offsetX = event.clientX - event.target.getBoundingClientRect().left;
    const offsetY = event.clientY - event.target.getBoundingClientRect().top;

    event.dataTransfer.setData('offsetX', offsetX);
    event.dataTransfer.setData('offsetY', offsetY);
}

// Remove decorations on reset
document.getElementById('resetButton').addEventListener('click', () => {
    document.querySelectorAll('.pumpkin-area .dropped').forEach(element => element.remove());
});