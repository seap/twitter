import React, { Component } from 'react'
import styles from './index.scss'

class NotFound extends Component {
  render() {
      return (
        <div className={styles.notFound}>
          404, You get lost!
        </div>
      )
  }
}

export default NotFound