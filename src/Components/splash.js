import React from "react";

function Splash() {
    return(
        <header class="sans-serif">
        <div class="cover bg-left bg-center-l" >
          <div class=" pb5 pb6-m pb5-l">
            <nav class="dt w-100 mw8 center"> 
              <div class="dtc v-mid tr pa3">
              </div>
            </nav> 
              <div class="dtc w2 v-mid pa3">
                <a  class="dib ml6 w4 h4 grow-large border-box">
                <img src="https://i.imgur.com/o2dmEq0.png" class="mw-100" alt="night sky over water"></img>
                </a>
              </div>
            <div class="tc-l mt4 mt5-m mt6-l ph3">
              <h1 class="f1 f1-l fw3 black mb0 lh-title">Algorithm Visualization</h1>
              <h2 class="fw1 f3 black mt3 mb2">Showcasing algorithms by animating their work. Choose one and get started!</h2>
              
            </div>
          </div>
        </div> 
      </header>
    );
}

export default Splash;