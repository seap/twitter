import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './index.scss'

export default class Tweet extends PureComponent {
  static propTypes = {
    icon: PropTypes.string,
    text: PropTypes.string,
  }

  static defaultProps = {
    label: '',
    hasIcon: false,
  }

  render() {
    const { icon, text } = this.props
    return (
      <div className={styles.item}>
        <div className={styles.icon}>
          <img src={icon} alt="icon" />
        </div>
        <div className={styles.content}>
          {text}
        </div>
      </div>
    )
  }
}