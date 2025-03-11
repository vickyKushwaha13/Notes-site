function updateCharCount() {
    const content = document.getElementById('note-content').value;
    document.getElementById('char-count').textContent = `${content.length}/200`;
}

function addNote() {
    const noteContent = document.getElementById('note-content').value;
    if (noteContent.trim() === '' || noteContent.length > 200) return;

    const noteList = document.getElementById('notes-list');

    // Create note container
    const note = document.createElement('div');
    note.classList.add('note');

    const noteText = document.createElement('p');
    noteText.textContent = noteContent;

    // Create Edit Button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');
    editBtn.onclick = () => editNote(note, noteText);

    // Create Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = () => noteList.removeChild(note);

    note.appendChild(noteText);
    note.appendChild(editBtn);
    note.appendChild(deleteBtn);

    noteList.appendChild(note);

    saveNotes();
    document.getElementById('note-content').value = '';
    updateCharCount();
}

function editNote(note, noteText) {
    const newText = prompt('Edit note:', noteText.textContent);
    if (newText !== null && newText.trim() !== '') {
        noteText.textContent = newText;
        saveNotes();
    }
}

function saveNotes() {
    const notes = Array.from(document.querySelectorAll('.note p')).map(note => note.textContent);
    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(content => {
        document.getElementById('note-content').value = content;
        addNote();
    });
}

function searchNotes() {
    const query = document.getElementById('search-input').value.toLowerCase();
    document.querySelectorAll('.note').forEach(note => {
        note.style.display = note.textContent.toLowerCase().includes(query) ? 'block' : 'none';
    });
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}

document.getElementById('toggle-theme').addEventListener('click', toggleTheme);
window.onload = loadNotes;
