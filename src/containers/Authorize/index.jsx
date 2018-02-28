import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchToken } from '@/redux/twitter'
import styles from './index.scss'

class Authorize extends Component {
  handleAuthorization = () => {
    this.props.fetchToken(json => {
      window.location.href = `https://twitter.com/oauth/authenticate?oauth_token=${json.data}`
    })    
  }

  render() {
    return (
      <div className={styles.auth} >
        <h1>login with twitter.</h1>
        <button onClick={this.handleAuthorization}>Authorize</button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchToken
}, dispatch)

export default connect(null, mapDispatchToProps)(Authorize)