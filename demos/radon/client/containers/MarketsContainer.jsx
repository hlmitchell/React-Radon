import React, { Component } from 'react';
import MarketCreator from '../components/MarketCreator.jsx'
import MarketsDisplay from '../components/MarketDisplay.jsx'
import Market from '../components/Market.jsx';
import bind from '../../../../reactBindings/bind.js';
import objectBind from '../../../../reactBindings/objectBind.js';

class MarketsContainer extends Component {
  constructor(props) {
    super(props);
    this.addLocation = this.addLocation.bind(this);
    this.addCard = this.addCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.reset = this.reset.bind(this);
  }

  addLocation(e){
    e.preventDefault();
    const id = 'inputTag';
    const textField = document.getElementById(id);
    this.props.incrementMarkets();
    this.props.incrementLastMarketId();
    this.props.addMarket({lastMarketId: this.props.lastMarketId + 1, location: textField.value});
    textField.value = '';
  }

  addCard(e, index){
    e.preventDefault();
    this.props.incrementCards();
    this.props.incrementCard(index);
  }

  deleteCard(e, index) {
    e.preventDefault();
    this.props.decrementCards();
    this.props.decrementCard(index);
  }

  reset(e, index, childCards) {
    e.preventDefault();
    
    // lazy
    for (let i = 0; i < childCards; i++) {
      this.props.decrementCards();
    }
    this.props.resetCards(index);
  }

  render() {
    let markets = [];
    if(this.props.marketList){
      markets = this.props.marketList.map((market, i) => {
          let ArrMarket = objectBind(Market, i, this.props);
          return (<ArrMarket key={i} i={i} addCard={this.addCard} deleteCard={this.deleteCard} reset={this.reset}/>)
        }
      );
    }

    return (
      <div className="innerbox" id="height-probs">
        <MarketCreator onClick={this.addLocation} />
        <MarketsDisplay marketList={markets}/>
      </div>
    );
  }
}

export default bind(MarketsContainer);