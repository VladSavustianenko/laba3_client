import { React, Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import MainComponent from './modules/chat/components/main.component'
import LoginComponent from './modules/auth/components/login.component'
import SignupComponent from './modules/auth/components/signup.component'

class App extends Component {
  render() {
    return(
      <div className="main-wrapper">
        <BrowserRouter>
          <Switch>
            <Route path="/login" exact component={LoginComponent}></Route>
            <Route path="/signup" exact component={SignupComponent}></Route>
            <Route path="/" component={MainComponent}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App