import React, { Component } from 'react';

class Combatants extends Component {

  renderRow(combatant) {

    let onlyMe = this.props.opt.onlyMe;
    if (onlyMe && combatant.name != 'YOU') return;

    let isValid = combatant.Job !== '';
    if (!isValid) return;

    let noHeal = this.props.opt.noHeal;

    let ret = [
        <Combatant key={'dps-'+combatant.name} combatant={combatant} opt={this.props.opt}/>,
        <CombatantBarDps key={'dpsbar-'+combatant.name} combatant={combatant} />,
      ];

    if (!noHeal) {
      ret.push(<CombatantBarHeal key={'healbar-'+combatant.name} combatant={combatant} />);
    }

    return ret;
  }

  render() {
    let _ = window._;

    let noHeal = this.props.opt.noHeal;

    return (
      <div className='Combatants'>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>DPS</th>
              {!noHeal && <th>HPS</th>}
            </tr>

            {_.map(this.props.combatants, (combatant) => this.renderRow(combatant))}

          </tbody>
        </table>
      </div>
    );
  }

}

export default Combatants;

class Combatant extends Component {

  parseHealing (healing, percent) {
  	healing = parseFloat(healing, 10);
  	var max_pct = 100;
  	percent = parseInt(percent.replace('%', ''));
  	return this.formatNumber(healing * (max_pct - percent) / max_pct);
  };

  formatNumber (number)  {
    number = parseFloat(number, 10);

    if (number >= 1000) {
        return (number / 1000).toFixed(2) + 'K';
    }
    else if (number >= 1000000) {
        return (number / 1000000).toFixed(2) + 'M';
    }

    return number.toFixed(2);
  };

  render() {

    let combatant = this.props.combatant;

    let noHeal = this.props.opt.noHeal;

    return (
      <tr className='Combatant'>
        <td>
          <span className='dataElem'>
            <img src={'overlaylib/icon/jobs/'+combatant.Job.toLowerCase()+'.png'} />
            <span className='name'>{combatant.name}</span>
          </span>
        </td>
        <td><span className='dataElem'>{combatant.dps} [{combatant['damage%']}]</span></td>
        {!noHeal && <td><span className='dataElem'>{this.parseHealing(combatant.enchps, combatant['OverHealPct'])} [{combatant['healed%']}]</span></td>}
      </tr>
    );
  }
}

class CombatantBarDps extends Component {
  render() {

    let combatant = this.props.combatant;

    return (
      <tr className='CombatantBarDps'>
        <td colSpan='3' className={combatant.Job.toLowerCase()}><div className='bar' style={{height:'3px',width:combatant['damage%'],marginTop:'-2px'}}></div></td>
      </tr>
    );
  }
}

class CombatantBarHeal extends Component {
  render() {

    let combatant = this.props.combatant;

    return (
      <tr className='CombatantBarHeal'>
        <td colSpan='3' className='healBar'>
          {!isNaN(Number(combatant['healed%'].substr(0,1))) && <div className='bar' style={{height:'3px',width:combatant['healed%'],marginTop:'-3px'}}></div> }
        </td>
      </tr>
    );
  }
}
