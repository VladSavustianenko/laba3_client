import { React,  Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withCookies } from 'react-cookie'

import loginService from '../services/login.service'


class LoginComponent extends Component {
    state = {
        email: '',
        password: '',
        errMess: null,
    }

    async handleSubmit(event) {
        event.preventDefault()
        const response = await loginService([this.state.email, this.state.password])
        if (response.id && response.token) {
            this.props.cookies.set('token', response.token)
            this.props.history.push('')
        } else {
            this.setState({
                password: '',
                errMess: 'Incorrect email or password'
            })
        }
    }

    render() {
        return(
            <div className="login-wrapper d-flex">
                <div className="form">
                    <div className="form__header">LogIn</div>
                    <form className="form__body" onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form__body__header text-muted">Login into your account</div>
                        <input
                            type="email"
                            name="email"
                            className="form__input"
                            placeholder="Email"
                            onChange={event => this.setState({ email: event.target.value })}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            className="form__input"
                            placeholder="Password"
                            onChange={event => this.setState({ password: event.target.value })}
                            value={this.state.password}
                            required
                        />
                        <div className="mb-2">
                            <button className="btn btn-primary pl-3 pr-3" type="submit">LogIn</button>
                        </div>
                        { this.state.errMess ? <span className="text-danger">{this.state.errMess}</span> : null }
                    </form>
                    <div className="form__footer">
                        <a className="text-primary" href="/signup" type="button">Create account</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(withCookies(LoginComponent))