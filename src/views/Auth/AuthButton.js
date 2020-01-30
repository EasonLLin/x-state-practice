import React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { signOut } from '../../actions/AuthActions.js'

class AuthButton extends React.Component {
  render() {
    return this.props.isAuthenticated ? (
      <p>
        Welcome!{' '}
        <button
          onClick={() => {
            this.props.signOut()
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      signOut,
    },
    dispatch
  )
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AuthButton)
