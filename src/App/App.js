import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
// import dummyStore from '../dummy-store';
import { getNotesForFolder, findNote, findFolder } from '../notes-helpers';
import './App.css';
import NotefulForm from '../NotefulForm/NotefulForm';
import FolderfulForm from '../FolderfulForm/FolderfulForm';
import API from '../api';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
        this.fetchFolderAndNoteData();
        // fake date loading from API call        
        // setTimeout(() => this.setState(dummyStore), 600);
    }

    fetchFolderAndNoteData() {
        API.get(`folders`).then(folders => {
            API.get(`notes`).then(notes => {
                this.setState({ folders: folders.data, notes: notes.data });
            })
        })
    }

    renderNavRoutes() {
        const { notes, folders } = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => (
                            <NoteListNav
                                key={routeProps.match.params.folderId || '-root'}
                                folders={folders}
                                notes={notes}
                                {...routeProps}
                            />
                        )}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const { noteId } = routeProps.match.params;
                        const note = findNote(notes, noteId) || {};
                        const folder = findFolder(folders, note.folderId);
                        return <NotePageNav key={noteId} {...routeProps} folder={folder} />;
                    }}
                />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        const { notes, folders } = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => {
                            const { folderId } = routeProps.match.params;
                            const notesForFolder = getNotesForFolder(
                                notes,
                                folderId
                            );
                            return (
                                <NoteListMain
                                    key={folderId || '-root'}
                                    notes={notesForFolder}
                                    updateData={() => this.fetchFolderAndNoteData()}
                                    {...routeProps}
                                />
                            );
                        }}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const { noteId } = routeProps.match.params;
                        const note = findNote(notes, noteId);
                        return <NotePageMain key={noteId} {...routeProps} note={note} updateData={() => this.fetchFolderAndNoteData()} />;
                    }}
                />
                <Route
                    path="/add-folder"
                    render={routeProps => {
                        return <FolderfulForm {...routeProps} updateData={() => this.fetchFolderAndNoteData()} />;
                    }}
                />
                <Route
                    path="/add-note"
                    render={routeProps => {
                        return <NotefulForm {...routeProps} updateData={() => this.fetchFolderAndNoteData()} foldersData={folders} />;
                    }}
                />
            </>
        );
    }

    render() {
        return (
            <div className="App">
                <nav className="App__nav">{this.renderNavRoutes()}</nav>
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>{' '}
                        <FontAwesomeIcon icon="check-double" />
                    </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>
            </div>
        );
    }
}

export default App;
