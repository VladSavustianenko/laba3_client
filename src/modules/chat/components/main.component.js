import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withCookies } from 'react-cookie'

import personService from '../services/person.service'
import HeaderComponent from './header.component'
import ChatComponent from './chat.component'
import TextinpupComponent from './textinput.component'

class MainComponent extends Component {
    state = {
        id: null,
        firstname: '',
        lastname: '',
        birth: null,
        picture: null,
        token: null,
        isLoaded: false,
    }

    async componentDidMount() {
        const token = this.props.cookies.get('token')
        if (token) {
            const user = await personService(token)
            if (user.id) {
                this.setState({
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    birth: user.birth,
                    picture: user.picture,
                    token: token,
                    isLoaded: true,
                })
            } else {
                this.props.history.push('login')
            }
        } else {
            this.props.history.push('login')
        }
    }

    reload() {
        this.setState({
            isLoaded: false
        })
        this.componentDidMount()
    }

    render() {
        if (this.state.isLoaded) {
            return (
                <div className="container">
                    <HeaderComponent
                        id={this.state.id}
                        firstname={this.state.firstname}
                        lastname={this.state.lastname}
                        birth={this.state.birth}
                        picture={this.state.picture}
                        token={this.state.token}
                        reload={this.reload.bind(this)}
                    />
                    <ChatComponent
                        id={this.state.id}
                    />
                    <TextinpupComponent
                        id={this.state.id}
                    />
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default withRouter(withCookies(MainComponent))