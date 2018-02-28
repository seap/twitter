import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchTimeline } from '@/redux/twitter'
import Tweet from '@/components/Tweet'
import styles from './index.scss'

class Twitter extends Component {
  componentDidMount() {
    this.props.fetchTimeline()
  }

  render() {
    const { list } = this.props
    return (
      <div>
        {list.map((item, i) => <Tweet key={i} icon={item.user.profile_image_url} text={item.text} />)}
        <div className={styles.tweet}>
          <Link to="/twitter/tweet"><span>+Tweet</span></Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state.twitter
const mapDispatchToProps = dispatch => bindActionCreators({
  fetchTimeline
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Twitter)