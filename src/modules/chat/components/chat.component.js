import { React, Component } from 'react'

import getMessageQuery from '../services/message.query'
import MessageComponent from './message.component'

class ChatComponent extends Component {
    state = {
        id: this.props.id,
        messages: [],
        loaded: false,
    }

    async componentDidMount() {
        if (!this.state.loaded && !this.state.destroy) {
            const messages = await getMessageQuery()
            this.setState({
                messages: messages,
                loaded: true,
            })

            if (this.state.loaded) {
                setInterval(() => {
                    this.update()
                }, 1000)
            }
        }
    }

    update = async () => {
        const newMessages = await getMessageQuery()
        if (newMessages.length !== this.state.messages.length) {
            this.setState({
                loaded: false,
            })
            this.componentDidMount()
        }
    }

    render() {
        if (this.state.loaded || this.state.messages.length) {
            return (
                <div className="chat">
                    <div className="chat__container">
                        {this.state.messages.map(message => (
                            <MessageComponent
                                currentId={this.state.id}
                                id={message[0]}
                                userId={message[1]}
                                text={message[2]}
                                date={message[3]}
                                time={message[4]}
                                name={message[5]}
                                surname={message[6]}
                                picture={message[7]}
                                key={message[0]}
                            />
                        ))}
                    </div>
                </div>
            )
        } else {
            return (
                <div className="chat">
                    <div className="chat__container"></div>
                </div>
            )
        }
    }
}

export default ChatComponent