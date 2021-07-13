import React from 'react'
import API from '../api';
import './NotefulForm.css'

export default class NotefulForm extends React.Component {
  state = {
    name: '',
    content: '',
    folder_id: '',
    folders: []
  }

  componentDidMount() {
    this.fetchFolderAndNoteData();
  }
  
  fetchFolderAndNoteData() {
    API.get(`folders`).then(folders => {            
      this.setState({ folders: folders.data });
    })        
  }

  handleNoteNameChange = event => {
    this.setState({ name: event.target.value });    
  }

  handleNoteContentChange = event => {
    this.setState({ content: event.target.value });    
  }

  handleNoteFolderIdChange = event => {
    this.setState({ folder_id: event.target.value });    
  }

  handleSubmit = event => {
    event.preventDefault();

    const note = {
      name: this.state.name,
      content: this.state.name,
      folder_id: this.state.folder_id,
    };

    API.post(`notes`, note).then(() => {
      this.props.history.push('/')
    });
  }

  render() {
    return (
      <div>
        <form className="Noteful-form" onSubmit={this.handleSubmit}>
          <label>
            Note name:
            <input type="text" name="name" onChange={this.handleNoteNameChange} />
          </label>

          <label>
            Note content:
            <input type="text" name="content" onChange={this.handleNoteContentChange} />
          </label>

          <label>
            Note folder:
            <select name="folder_id" onChange={this.handleNoteFolderIdChange}>
              { this.state.folders.map(folder => <option value={folder.id} >{folder.name}</option>) }
            </select>
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}
