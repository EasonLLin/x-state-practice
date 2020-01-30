import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import SignInDialog from './components/SignInDialog.js'

class SignInShow extends React.Component {
  render() {
    return (
      <div>
        <SignInDialog
          open={this.props.showSignInForm}
          history={this.props.history}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SignInShow)
