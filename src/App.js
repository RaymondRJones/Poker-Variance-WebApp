import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentUser:undefined};
  }
  
  getCurrentUser(user){
    console.log("Hello from App")
    //this.setState({currentUser:user});
  }
  
  render() {
      return (
        <div className="App">
            <Input placeholder="Enter Standard Deviation" onChange={this.updateCode} inputProps={{ 'aria-label': 'description' }} />
            <br></br>
            <Input placeholder="Enter Hands Played" onChange={this.updateCode} inputProps={{ 'aria-label': 'description' }} />
            <br></br>
            <Input placeholder="Enter bb/100" onChange={this.updateCode} inputProps={{ 'aria-label': 'description' }} />
            <br></br>

            <Button variant="contained" color="primary">
            Calculate
            </Button>
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
