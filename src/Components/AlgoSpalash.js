import React from "react";

function AlgoSplash({onAlgoChange, title, description}) {
    return(
        <header className="sans-serif">
        <div className="cover bg-left bg-center-l" >
          <div className=" pb5 pb6-m pb5-l">
            <nav className="dt w-100 mw8 center"> 
              <div className="dtc v-mid tr pa3">
              </div>
            </nav> 
              <div className="dtc w2 v-mid pa3">
                
              </div>
            <div className="tc-l mt4 mt5-m mt6-l ph3">
              <h1 className="f1 f1-l fw3 black mb0 lh-title">{title}</h1>
              <div className="flex justify-center marg">
                <h2 class="fw1 f3 black mt3 mb2 lh-copy">{description}</h2>
              </div>
              <div className="flex justify-center">
                <ul className="list pl0 ml0 mw5 ba b--light-silver br3">
                  <li onClick={()=>onAlgoChange("none")} className="ph4 pv3 bb b--light-silver pointer hover-white ">Home</li>
                </ul>
              </div>
            </div>
          </div>
        </div> 
      </header>
    );
}

export default AlgoSplash;