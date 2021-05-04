import { React, Component } from 'react'

import sendMessageService from '../services/send-message.service'

class TextinpupComponent extends Component {
    state = {
        id: this.props.id,
        message: '',
    }

    async sendMessage() {
        if (this.state.message) {
            const date = new Date()
            const day = `${date.getDate() > 9 ? date.getDate() : '0' + date.getDate()}-${date.getMonth() > 9 ? date.getMonth() : '0' + date.getMonth()}-${date.getFullYear()}`
            const time = `${date.getHours() > 9 ? date.getHours() : '0' + date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()}`

            await sendMessageService([this.state.id, this.state.message, day, time])
            this.setState({
                message: '',
            })
        }
    }

    render() {
        return (
            <div className="container__input d-flex align-items-center p-3">
                <textarea
                    rows={3}
                    className="w-100 mr-3"
                    onChange={event => this.setState({message: event.target.value})}
                    value={this.state.message}
                />
                <button
                    className="btn btn-success"
                    onClick={this.sendMessage.bind(this)}
                >
                    <span className="fa fa-paper-plane"></span>
                </button>
            </div>
        )
    }
}

export default TextinpupComponent