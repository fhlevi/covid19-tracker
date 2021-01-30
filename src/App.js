import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './assets/scss/App.scss';

const loading = (<img src={logo} className="App-logo" alt="logo" />)

const TheLayout = React.lazy(() => import('./components/TheLayout.js'))
class App extends Component {
  componentDidMount(){
    document.title = 'Covid Tracking'
  }
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route path="/" name="Home" render={props => <TheLayout {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    )
  }
}

export default App;
