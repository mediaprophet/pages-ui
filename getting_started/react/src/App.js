import React, { Component } from 'react';
import './pages/scss/pages.scss';
import './App.scss';

import { withRouter } from 'react-router';

import Condensed from './Theme/Condensed';
import Executive from './Theme/Executive';
import Casual from './Theme/Causal';
import Simple from './Theme/simple';
import Corporate from './Theme/Corporate';

import Quickview from './components/Quickview';
class App extends Component {
  render() {
    return (
      <div className='App'>
        <Condensed />
        <Executive />
        <Casual />
        <Simple />
        <Corporate />
        <Quickview />
      </div>
    );
  }
}

export default withRouter(App);
