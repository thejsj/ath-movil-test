import React, { Component } from 'react';
import AppContainer from './router';

const URI_PREFIX = 'athmoviltest://';

class App extends Component {
  render() {
    return (
      <AppContainer uriPrefix={URI_PREFIX} />
    );
  }
}

export default App;
