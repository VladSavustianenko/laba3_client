import { React,  Component } from 'react'
import { withRouter } from 'react-router-dom'

import signupService from '../services/signup.service'

class SignupComponent extends Component {
    state = {
        firstname: '',
        lastname: '',
        birth: '',
        email: '',
        firstPassword: '',
        secondPassword: '',
        errMess: null,
    }

    async handleSubmit(event){
        event.preventDefault()
        
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
        } else if (this.state.firstPassword.length < 6) {
            this.setState({
                firstPassword: '',
                secondPassword: '',
                errMess: 'Password is too short',
            })
        } else if (this.state.firstPassword.length >= 15) {
            this.setState({
                firstPassword: '',
                secondPassword: '',
                errMess: 'Password is too long',
            })
        } else if (this.state.firstPassword !== this.state.secondPassword) {
            this.setState({
                firstPassword: '',
                secondPassword: '',
                errMess: 'Passwords do not match',
            })
        } else {
            const response = await signupService([
                this.state.firstname, this.state.lastname, this.state.birth, this.state.email, this.state.firstPassword
            ])
            if (response.isAvailable) {
                this.props.history.push('login')
            } else {
                this.setState({
                    firstPassword: '',
                    secondPassword: '',
                    errMess: 'User with this email is already exist',
                })
            }
        }
    }

    render() {
        return(
            <div className="login-wrapper d-flex">
                <div className="form">
                    <div className="form__header">SignUp</div>
                    <form className="form__body" onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form__body__header text-muted">Create your account</div>
                        <input
                            name="firstname"
                            placeholder="First Name"
                            className="form__input"
                            onChange={ event => this.setState({ firstname: event.target.value }) }
                            required
                        />
                        <input
                            name="lastname"
                            placeholder="Last Name"
                            className="form__input"
                            onChange={ event => this.setState({ lastname: event.target.value }) }
                            required
                        />
                        <label className="form-check-label text-muted mb-2">Birth</label>
                        <input
                            className="form__input w-50"
                            type="date"
                            placeholder="Birth"
                            onChange={ event => this.setState({ birth: event.target.value }) }
                            required
                        ></input>
                        <input
                            type="email"
                            name="email"
                            className="form__input"
                            placeholder="Email"
                            onChange={ event => this.setState({ email: event.target.value }) }
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            className="form__input"
                            placeholder="Password"
                            onChange={ event => this.setState({ firstPassword: event.target.value }) }
                            value={this.state.firstPassword}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            className="form__input"
                            placeholder="Confirm password"
                            onChange={ event => this.setState({ secondPassword: event.target.value }) }
                            value={this.state.secondPassword}
                            required
                        />
                        <div className="mb-2">
                            <button className="btn btn-primary pl-3 pr-3" type="submit">SignUp</button>
                        </div>
                        { this.state.errMess ? <span className="text-danger">{this.state.errMess}</span> : null }
                    </form>
                    <div className="form__footer">
                        <a className="text-primary" href="/login" type="button">LogIn</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(SignupComponent)