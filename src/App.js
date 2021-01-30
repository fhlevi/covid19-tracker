import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './assets/scss/App.scss';

const loading = (<img src={logo} className="App-logo" alt="logo" />)

const TheLayout = React.lazy(() => import('./components/TheLayout.js'))
class App extends Component {
  componentDidMount(){
    document.title = 'Covid Tracking'
    this.setGoogleAnalytic()
  }
  setGoogleAnalytic(){
    (function(){
        const s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://www.googletagmanager.com/gtag/js?id=G-WR966Y57H4';
        s0.parentNode.insertBefore(s1,s0);
    })();

    const script = document.createElement("script");
    script.innerHTML = this.analytics('G-WR966Y57H4');
    document.head.appendChild(script);
  }
  analytics(id){
    return `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', '${id}');
    `
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
