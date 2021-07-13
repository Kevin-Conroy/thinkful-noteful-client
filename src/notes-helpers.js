
export const findFolder = (folders=[], folderId) =>
  folders.find(folder => String(folder.id) === folderId)

export const findNote = (notes=[], noteId) =>
  notes.find(note => String(note.id) === noteId)

export const getNotesForFolder = (notes=[], folderId) => (
  (!folderId)
    ? notes
    : notes.filter(note => String(note.folder_id) === folderId)
)

export const countNotesForFolder = (notes=[], folderId) =>
  notes.filter(note => note.folder_id === folderId).length
