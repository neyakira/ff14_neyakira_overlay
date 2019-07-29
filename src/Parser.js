import React, { Component } from 'react';
import Combatants from './Combatants';

class Parser extends Component {

  render() {

    if (!this.props.parseData) return <div />

    return (
      <div className='Parser'>
        <Combatants combatants={this.props.parseData.Combatant} opt={this.props.opt}/>
        <div className='footer'>
          <div style={{flex:1}}></div>
          <div>[DURATION : {this.props.parseData.Encounter.duration}</div>
          <div>DPS : {this.props.parseData.Encounter.dps}]</div>
        </div>
      </div>
    );
  }

}

export default Parser;
