import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { withCookies } from 'react-cookie'

import { editProfilePictureService, editProfileService } from '../services/header.service'

class EditProfileComponent extends Component {
    state = {
        id: this.props.id,
        firstname: this.props.firstname,
        lastname: this.props.lastname,
        picture: null,
        pictureShow: this.props.picture,
        errMess: null,
    }

    previewPicture = event => {
        const file = event.target.files
        const img = URL.createObjectURL(file[0])
        let formData

        if (this.state.picture) {
            formData = this.state.picture
            formData.delete(this.state.id + ':profilePicture')
            formData.append(this.state.id + ':profilePicture', file[0])
        } else {
            formData = new FormData()
            formData.append(this.state.id + ':profilePicture', file[0])
        }

        this.setState({
            pictureShow: img,
            picture: formData,
        })
    }

    async handleSave() {
        if (this.state.firstname.length <= 2) {
            this.setState({
                errMess: 'Firstname is too short',
            })
        } else if (this.state.firstname.length >= 15)  {
            this.setState({
                errMess: 'Firstname is too long',
            })
        } else if (this.state.lastname.length <= 2) {
            this.setState({
                errMess: 'Lastname is too short',
            })
        } else if (this.state.lastname.length >= 15) {
            this.setState({
                errMess: 'Lastname is too long',
            })
        } else {
            if (this.state.picture) {
                await editProfilePictureService(this.state.id, this.state.picture)
            }
            
            await editProfileService([this.state.id, this.state.firstname, this.state.lastname])
            this.setState({
                picture: null,
                pictureShow: null,
            })
            this.props.handleShow(false)
            this.props.reload()
        }
    }

    render() {
        return (
            <Modal
                animation={false}
                show={this.props.showModal}
                onHide={() => {
                    this.setState({
                        firstname: this.props.firstname,
                        lastname: this.props.lastname,
                        picture: null,
                        pictureShow: null,
                    })
                    this.props.handleShow(false)
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title className="modal__header">Edit profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="firstname">Firstname</label>
                    <input
                            name="firstname"
                            className="form__input"
                            onChange={ event => this.setState({ firstname: event.target.value }) }
                            value={this.state.firstname}
                            required
                        />
                    <label htmlFor="lastname">Lastname</label>
                    <input
                        name="lastname"
                        className="form__input"
                        onChange={ event => this.setState({ lastname: event.target.value }) }
                        value={this.state.lastname}
                        required
                    />
                    <input
                        name="profile__photo__button"
                        type="file"
                        id="profile__photo__button"
                        className="d-none"
                        accept="image/*"
                        onChange={this.previewPicture}
                    />
                    <label
                        className="profile__photo-select"
                        htmlFor="profile__photo__button"
                    >
                        Add picture
                    </label>
                    {this.state.pictureShow ?
                    <div
                        className="profile__photo-display"
                        style={{backgroundImage: 'url(' + this.state.pictureShow + ')'}}
                    ></div> : null}
                    { this.state.errMess ? <span className="text-danger">{this.state.errMess}</span> : null }
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            this.setState({
                                firstname: this.props.firstname,
                                lastname: this.props.lastname,
                                picture: null,
                                pictureShow: null,
                            })
                            this.props.handleShow(false)
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={this.handleSave.bind(this)}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default withRouter(withCookies(EditProfileComponent))