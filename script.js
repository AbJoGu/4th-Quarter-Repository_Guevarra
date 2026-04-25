class NotesApp {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
        this.currentEditingId = null;
        this.filteredNotes = [];
        this.init();
    }

    init() {
        this.bindEvents();
        this.render();
        this.updateStats();
    }

    bindEvents() {
        document.getElementById('newNoteBtn').addEventListener('click', () => this.createNote());
        document.getElementById('deleteAllBtn').addEventListener('click', () => this.deleteAllNotes());
        document.getElementById('searchBar').addEventListener('input', (e) => this.searchNotes(e.target.value));
        document.getElementById('cancelEdit').addEventListener('click', () => this.closeEditModal());
        document.getElementById('saveEdit').addEventListener('click', () => this.saveEdit());
        
        // Close modal on outside click
        document.getElementById('editModal').addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeEditModal();
            }
        });
    }

    createNote() {
        const note = {
            id: Date.now(),
            title: 'New Note',
            content: 'Start writing your note here...',
            pinned: false,
            favorited: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        this.notes.unshift(note);
        this.saveToStorage();
        this.render();
        this.updateStats();
    }

    deleteNote(id) {
        if (confirm('Are you sure you want to delete this note?')) {
            this.notes = this.notes.filter(note => note.id !== id);
            this.saveToStorage();
            this.render();
            this.updateStats();
        }
    }

    deleteAllNotes() {
        if (confirm('Are you sure you want to delete ALL notes? This cannot be undone!')) {
            this.notes = [];
            this.saveToStorage();
            this.render();
            this.updateStats();
        }
    }

    togglePin(id) {
        const note = this.notes.find(n => n.id === id);
        if (note) {
            note.pinned = !note.pinned;
            note.updatedAt = new Date().toISOString();
            this.sortNotes();
            this.saveToStorage();
            this.render();
            this.updateStats();
        }
    }

    toggleFavorite(id) {
        const note = this.notes.find(n => n.id === id);
        if (note) {
            note.favorited = !note.favorited;
            note.updatedAt = new Date().toISOString();
            this.saveToStorage();
            this.render();
            this.updateStats();
        }
    }

    editNote(id) {
        const note = this.notes.find(n => n.id === id);
        if (note) {
            this.currentEditingId = id;
            document.getElementById('editTitle').value = note.title;
            document.getElementById('editContent').value = note.content;
            document.getElementById('editModal').style.display = 'flex';
            document.getElementById('editTitle').focus();
        }
    }

    saveEdit() {
        const title = document.getElementById('editTitle').value.trim();
        const content = document.getElementById('editContent').value.trim();

        if (!title && !content) {
            alert('Note cannot be empty!');
            return;
        }

        const note = this.notes.find(n => n.id === this.currentEditingId);
        if (note) {
            note.title = title || 'Untitled';
            note.content = content || '';
            note.updatedAt = new Date().toISOString();
            this.sortNotes();
            this.saveToStorage();
            this.closeEditModal();
            this.render();
            this.updateStats();
        }
    }

    closeEditModal() {
        document.getElementById('editModal').style.display = 'none';
        this.currentEditingId = null;
    }

    searchNotes(query) {
        if (!query.trim()) {
            this.render();
            return;
        }
        
        const filtered = this.notes.filter(note => 
            note.title.toLowerCase().includes(query.toLowerCase()) ||
            note.content.toLowerCase().includes(query.toLowerCase())
        );
        this.render(filtered);
    }

    sortNotes() {
        this.notes.sort((a, b) => {
            if (a.pinned !== b.pinned) {
                return b.pinned - a.pinned;
            }
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
    }

    formatDate(dateStr) {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    render(notesToRender = null) {
        const notesGrid = document.getElementById('notesGrid');
        const notes = notesToRender || this.notes;

        if (notes.length === 0) {
            notesGrid.innerHTML = '<div class="no-notes">No notes found matching your search.</div>';
            return;
        }

        notesGrid.innerHTML = notes.map(note => `
            <div class="note" data-id="${note.id}">
                ${note.pinned ? '<div class="pinned-badge">📌</div>' : ''}
                ${note.favorited ? '<div class="favorited-badge">⭐</div>' : ''}
                
                <div class="note-header">
                    <div class="note-title">${this.escapeHtml(note.title)}</div>
                    <div class="note-meta">
                        <span>${this.formatDate(note.updatedAt)}</span>
                    </div>
                </div>
                
                <div class="note-content">${this.escapeHtml(note.content)}</div>
                
                <div class="note-actions">
                    <button class="action-btn edit-btn" onclick="app.editNote(${note.id})" title="Edit">✏️</button>
                    <button class="action-btn delete-btn" onclick="app.deleteNote(${note.id})" title="Delete">🗑️</button>
                    <button class="action-btn pin-btn ${note.pinned ? 'pinned' : ''}" onclick="app.togglePin(${note.id})" title="${note.pinned ? 'Unpin' : 'Pin'}">${note.pinned ? '📍' : '📌'}</button>
                    <button class="action-btn favorite-btn ${note.favorited ? 'favorited' : ''}" onclick="app.toggleFavorite(${note.id})" title="${note.favorited ? 'Unfavorite' : 'Favorite'}">${note.favorited ? '⭐' : '☆'}</button>
                </div>
            </div>
        `).join('');
    }

    updateStats() {
        const pinnedCount = this.notes.filter(n => n.pinned).length;
        const favoriteCount = this.notes.filter(n => n.favorited).length;
        const totalCount = this.notes.length;

        document.getElementById('pinnedCount').textContent = pinnedCount;
        document.getElementById('favoriteCount').textContent = favoriteCount;
        document.getElementById('totalCount').textContent = totalCount;
    }

    saveToStorage() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new NotesApp();
});