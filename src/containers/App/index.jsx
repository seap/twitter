import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Loader from '@/components/Loader'
import Chunk from '@/components/Chunk'
import NotFound from '@/containers/NotFound'
import routes from '@/routes'

const load = component => props => (
  <Chunk {...props} load={component} />
)

const App = props => (
  <div className="wrapper">
    <Switch>
      {routes.map((route, i) => <Route key={i} path={route.path} render={load(route.component)}/>)}
      <Route component={NotFound} />
    </Switch>
    <Loader visible={props.common.loading} frame={true} />
  </div>
)

export default connect(state => ({ common: state.common, routing: state.routing }), null)(App)