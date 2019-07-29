import React, { Component } from 'react';
import './App.css';
import Parser from './Parser';
import testData from './testData.json';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.DEV = true;
  }

  hideOverlay() {
    document.getElementById('container').style.display = 'none';
  }

  onOverlayDataUpdate(e) {
    window.parseData = e.detail;
    this.setState({parseData:e.detail});
  }

  componentDidMount() {
    window.InitDpsModule('rdmty', this.onOverlayDataUpdate.bind(this), this.hideOverlay.bind(this));

    if (this.props.opt.test) {
      this.onOverlayDataUpdate({detail:testData});
    }
  }

  render() {
    return (
      <div className="App">
        <Parser parseData={this.state.parseData} opt={this.props.opt} />
      </div>
    );
  }
}

export default App;
