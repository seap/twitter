import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import { postTweeting } from '@/redux/twitter'
import Tweet from '@/components/Tweet'
import { toast, alert } from '@/common/util'
import styles from './index.scss'

class Twitter extends Component {
  state = {
    text: ''
  }
  
  handelTextChange = e => {
    this.setState({
      text: e.target.value
    })
  }

  submit = () => {
    const { postTweeting, push } = this.props
    const { text } = this.state
    if (!text.trim()) {
      return toast('please input your tweet.')
    }
    postTweeting(text, () => {
      alert('submit success!', () => {
        push('/twitter/twitters')
      })
    })
  }

  render() {
    return (
      <div className={styles.tweet}>
        <textarea
          placeholder="what's happening?"
          rows="6"
          value={this.state.text}
          onChange={this.handelTextChange}
        />
        <button onClick={this.submit}>Submit</button>
      </div>
    )
  }
}

const mapStateToProps = state => state.twitter
const mapDispatchToProps = dispatch => bindActionCreators({
  postTweeting, push
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Twitter)