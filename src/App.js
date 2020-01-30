import React, { useContext } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from 'react-router-dom'
import PublicShow from './views/Public/PublicShow'
import ProtectedShow from './views/Protected/ProtectedShow'
import SignInShow from './views/SignIn/SignInShow'
import AuthButton from './views/Auth/AuthButton'
import { machine } from './stateMachine/machine.js'
import { useMachine } from '@xstate/react'

export const MyContext = React.createContext()

const App = props => {
  const { state } = useContext(MyContext)
  // const [current, send] = useMachine(redditMachine)

  return (
    <Router basename="/wistron-frontend-homework">
      <div style={{ padding: '20px' }}>
        <AuthButton />
        <ul>
          <li>
            <Link to="/public">Public Page</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>
        <hr />

        <Route exact path="/" />
        <Route path="/public" component={PublicShow} />
        <Route
          path="/protected"
          render={() => {
            return state.matches('signedIn') ? (
              <ProtectedShow />
            ) : (
              <Redirect to="/signin" />
            )
          }}
        />
        <Route path="/signin" component={SignInShow} />
      </div>
    </Router>
  )
}

export const Wrap = () => {
  const [state, send] = useMachine(machine)

  return (
    <MyContext.Provider
      value={{
        state: state,
        send: send,
      }}
    >
      <App />
    </MyContext.Provider>
  )
}
