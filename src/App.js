import React from 'react';
import Particles from 'react-particles-js';
import P5Wrapper from 'react-p5-wrapper';

import Splash from './Components/splash';
import List from './Components/list'

import './App.css';

import bubble from "./SortAlgos/bubble"
import BubbleSplash from "./SortAlgos/bubbleSplash"


const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      },
      line_linked: {
        shadow: {
          enable: true,
          color: "#3CA9D1",
          blur: 5
        }
      }
    }
  },
 
};

const initState ={
    algo: "none"
};

class App extends React.Component {
  constructor(){
    super();
    this.state = (initState);
  }

  onAlgoChange = (newAlgo) =>{
    this.setState({algo : newAlgo })
  }

  render(){
    return (
      <div className="App">
      <div className="backgroundParticles">
        <Particles  canvasClassName="particles" params={particlesOptions} />
      <div className="backgroundParticles">
        { this.state.algo === "none"
         ? <div>
            <Splash/>
            <List onAlgoChange = {this.onAlgoChange}/>
           </div>
         : this.state.algo === "bubble"
          ? <div>
              <BubbleSplash onAlgoChange = {this.onAlgoChange}/>
              <div className="flex justify-center">
                <P5Wrapper sketch={bubble} />
              </div>
            </div>
          
          : <p>Something</p>
        }
          </div></div>
      </div>
    );
  }
}

export default App;
