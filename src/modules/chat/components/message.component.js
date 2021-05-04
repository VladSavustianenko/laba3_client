import { React, Component } from 'react'

class MessageComponent extends Component {
    state = {
        currentId: this.props.currentId,
        id: this.props.id,
        userId: this.props.userId,
        text: this.props.text,
        date: this.props.date,
        time: this.props.time,
        firstname: this.props.name,
        lastname: this.props.surname,
        picture: this.props.picture,
    }

    async componentDidMount() {
        const chat = document.querySelector('.chat__container')
        chat.scrollTop = chat.scrollHeight
    }

    render() {
        return (
            this.state.currentId === this.state.userId ? (
                <div className="message__user-current my-3">
                    <div className="message__block-current mr-2">
                        <div className="message__author-current text-primary">{this.state.firstname} {this.state.lastname}</div>
                        <div className="message__text-current">{this.state.text}</div>
                        <div className="message__time-current">{this.state.time}</div>
                    </div>
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
                </div>
            ) : (
                <div className="message__user my-3">
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
                    <div className="message__block">
                        <div className="message__author text-primary">{this.state.firstname} {this.state.lastname}</div>
                        <div className="message__text">{this.state.text}</div>
                        <div className="message__time">{this.state.time}</div>
                    </div>
                </div>
            )
        )
    }
}

export default MessageComponent