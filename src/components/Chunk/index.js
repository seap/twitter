import React, { Component } from 'react'
import Loader from '@/components/Loader'

class Chunk extends Component {
  constructor(props) {
    super(props)
    this.state = {
      LoadedComponent: null
    }
  }

  componentWillMount() {
    this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  load(props) {
    this.setState({
      LoadedComponent: null
    })

    props.load().then(mod => {
      this.setState({
        // handle both es imports and cjs
        LoadedComponent: mod.default ? mod.default : mod
      })
    })
  }

  render() {
    const { LoadedComponent } = this.state
    const { load, ...rest } = this.props
    return LoadedComponent ? <LoadedComponent {...rest} /> : <Loader visible={true} frame={true} />
  }
}

export default Chunk