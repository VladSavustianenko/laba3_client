import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withCookies } from 'react-cookie'

import logoutService from '../services/header.service'
import EditProfileComponent from './edit-profile.component'

class HeaderComponent extends Component {
    state = {
        id: this.props.id,
        firstname: this.props.firstname,
        lastname: this.props.lastname,
        birth: this.props.birth,
        picture: this.props.picture,
        token: this.props.token,
        showModal: false,
    }

    logout = () => {
        logoutService(this.state.token)
        this.props.cookies.remove('token')
        this.props.history.push('login')
    }

    handleShow = (showModal) => {
        this.setState({ showModal: showModal })
    }
    
    render() {
        return (
            <div className="header d-flex align-items-center justify-content-between w-100 text-white py-2 px-3">
                <div className="header__profile d-flex align-items-center" onClick={() => this.handleShow(true)}>
                    {this.state.picture ? 
                    <div
                        style={{backgroundImage: 'url(' + this.state.picture + ')'}}
                        className="header__picture mr-2"
                    ></div> :
                    <div
                        className="header__alt-picture bg-dark text-primary mr-2"
                    >
                        {`${this.state.firstname[0].toUpperCase()}${this.state.lastname[0].toUpperCase()}`}
                    </div>
                    }
                    <span className="header__name">{this.state.firstname} {this.state.lastname}</span>
                </div>
                <span className="logout" onClick={this.logout}><span className="fa fa-sign-out"></span> Log Out</span>
                <EditProfileComponent
                    id={this.state.id}
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    picture={this.state.picture}
                    showModal={this.state.showModal}
                    handleShow={this.handleShow}
                    reload={this.props.reload}
                />
            </div>
        )
    }
}

export default withRouter(withCookies(HeaderComponent))