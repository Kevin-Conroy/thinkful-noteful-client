import React from 'react'
import API from '../api';
import './FolderfulForm.css'

export default class FolderfulForm extends React.Component {
  state = {
    name: ''
  }

  handleChange = event => {
    this.setState({ name: event.target.value });    
  }

  handleSubmit = event => {
    event.preventDefault();

    const folder = {
      name: this.state.name
    };

    API.post(`folders`, folder).then(() => {
      this.props.history.push('/')
    });
  }

  render() {
    return (
      <div>
        <form className="Folderful-form" onSubmit={this.handleSubmit}>
          <label>
            Folder name:
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}
