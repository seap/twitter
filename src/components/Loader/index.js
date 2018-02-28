import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import styles from './main.scss'

export default class Loader extends PureComponent {
  render() {
    const { visible, frame } = this.props
    return visible ? (
      <div className={styles.loader}>
        <div className={`${styles.circle} ${frame ? styles.frame : ''}`}>
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    ) : null
  }
}

Loader.propTypes = {
  visible: PropTypes.bool,
  frame: PropTypes.bool
}

Loader.defaultProps = {
  visible: false,
  frame: false
}
