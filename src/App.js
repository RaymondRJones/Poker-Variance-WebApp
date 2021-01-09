import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {color:"black",sd:0,bb:0,hands:0, result:0, confidenceInterval:[]};
    this.calculateChance = this.calculateChance.bind(this);        

  }
  getCurrentUser(user){
    console.log("Hello from App")
    //this.setState({currentUser:user});
  }
  GetZPercent(z) {

    // z == number of standard deviations from the mean
  
    // if z is greater than 6.5 standard deviations from the mean the
    // number of significant digits will be outside of a reasonable range
  
    if (z < -6.5) {
      return 0.0;
    }
  
    if (z > 6.5) {
      return 1.0;
    }
  
    var factK = 1;
    var sum = 0;
    var term = 1;
    var k = 0;
    var loopStop = Math.exp(-23);
  
    while(Math.abs(term) > loopStop) {
      term = .3989422804 * Math.pow(-1,k) * Math.pow(z,k) / (2 * k + 1) / Math.pow(2,k) * Math.pow(z,k+1) / factK;
      sum += term;
      k++;
      factK *= k;
    }
  
    sum += 0.5;
  
    return sum;
  }
  getNormalProbabilityAtZ(z){
      return Math.exp(-Math.pow(z, 2) / 2) / Math.sqrt(2 * Math.PI);
  }
  calculateChance = (event) => {

    var standardError = this.state.sd / Math.sqrt((this.state.hands / 100));
    var z = (0-this.state.bb) / standardError; 
    var ans = this.GetZPercent(z);
    //5 as infinity 
    var z2 = 5;
    var area = 0.0;
    var rectangles = 1000000; // more rectangles = more precise, less rectangles = quicker execution
    var width = (z2 - z) / rectangles;
    for(var i = 0; i < rectangles; i++)
        area += width * this.getNormalProbabilityAtZ(width * i + z);
    
    var newCI = []
    newCI.push(this.state.bb-((1.96)*standardError));
    newCI.push(this.state.bb+((1.96)*standardError));
    
    if(area*100 >= 80){
      this.setState({color: "green"});
    }
    else if(area*100 <= 20){
      this.setState({color: "red"});
    }
    else{
      this.setState({color:"yellow"})
    }
    this.setState({result: area*100, confidenceInterval: newCI});
    //this.updateColor()

    //console.log("answer:", this.state.result, this.state.confidenceInterval);


  }
  updateStandardDev = (event) => {
    var standard = parseInt(event.target.value,10);
    //console.log(standard);
    this.setState({sd: standard});
  }
  updateBB = (event) => {
    var BB = parseInt(event.target.value,10);
    this.setState({bb: BB});
  }
  updateHands = (event) => {
    var handsPlayed = parseInt(event.target.value,10) ;
    this.setState({hands: handsPlayed});
  }
  updateColor() {
    if(this.state.result >= 80){
      this.setState({color: "green"});
    }
    else if(this.state.result <= 20){
      this.setState({color: "red"});
    }
    else{
      this.setState({color:"yellow"})
    }
  }
  render() {
    let ans = this.state.result;
    let lowerBound = this.state.confidenceInterval[0];
    let upperBound = this.state.confidenceInterval[1];

      return (
        <div className="App">
            <Input placeholder="Enter Standard Deviation" onChange={this.updateStandardDev} inputProps={{ 'aria-label': 'description' }} />
            <br></br>
            <Input placeholder="Enter Hands Played" onChange={this.updateHands} inputProps={{ 'aria-label': 'description' }} />
            <br></br>
            <Input placeholder="Enter bb/100" onChange={this.updateBB} inputProps={{ 'aria-label': 'description' }} />
            <br></br>

            <Button variant="contained" color="primary" onClick={this.calculateChance}>
            Calculate
            </Button>

            {this.state.result
                    ?          
                      <p>
                        Your Probability of Being A Winning Player: <p class={this.state.color}> {ans}%</p>
                      </p>

                    : <p>Your Probability of Being A Winning Player: </p>
            }
            {this.state.confidenceInterval
                    ?
                    <p>95% Confidence Interval of your true bb/100: [ {lowerBound} , {upperBound} ]</p>

                    : <p>Your 95% Confidence Interval</p>

            }


          </div>
      );
  }
}
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Input placeholder="Enter Standard Deviation" onChange={this.updateCode} inputProps={{ 'aria-label': 'description' }} />
        <Input placeholder="Enter Hands Played" onChange={this.updateCode} inputProps={{ 'aria-label': 'description' }} />
        <Input placeholder="Enter bb/100" onChange={this.updateCode} inputProps={{ 'aria-label': 'description' }} />

        <Button variant="contained" color="primary">
         Calculate
        </Button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/
export default App;
