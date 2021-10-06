import React from "react";
import { Form, Button, Row } from "react-bootstrap";
import './SongForm.css';

class SongForm extends React.Component {
    constructor(props) {
        super(props);
        this.renderFileSelect = this.renderFileSelect.bind(this);
    }

    renderFileSelect() {
        if (!this.props.editForm) {
            return <Form.Group>
                <Form.Label>Choose an audio file</Form.Label>
                <Form.Control required accept=".mp3" onChange={this.props.handleFileChange} type="file" />
                <Form.Control.Feedback type="invalid">Please choose an audio file.</Form.Control.Feedback>
            </Form.Group>
        }
    }

    renderDeleteButton() {
        if (this.props.editForm) {
            return <Button onClick={this.props.handleDelete} variant="danger">Delete</Button>
        }
    }

    render() {
        return <Form noValidate onSubmit={this.props.handleSubmit} validated={this.props.validated}>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control defaultValue={this.props.title} required onChange={this.props.handleInputChange} name="title" type="text" placeholder="Enter song title" />
                <Form.Control.Feedback type="invalid">Song title is required.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>Artist</Form.Label>
                <Form.Control defaultValue={this.props.artist} onChange={this.props.handleInputChange} name="artist" type="text" placeholder="Enter song artist" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Mood</Form.Label>
                <Form.Select name="moodId" required aria-label="Song moods" onChange={this.props.handleSelectChange} defaultValue={this.props.moodValue}>
                    {
                        this.props.moods.map((mood) => <option key={mood.id} value={mood.id}>{mood.moodName}</option>)
                    }
                </Form.Select>
            </Form.Group>
            {
                this.renderFileSelect()
            }
            <div className="buttons">
                <Button variant="primary" type="submit">
                    {this.props.editForm ? "Update" : "Create"}
                </Button>
                {
                    this.renderDeleteButton()
                }
            </div>
        </Form>
    }
}

export default SongForm;