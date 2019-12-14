import React from "react";

function List({onAlgoChange}) {
    return (
        <div >
            <div class="mw9 center ph3-ns">
                <div class="cf ph2-ns">
                    <div class="fl w-100 w-third-ns ">
                        <h1 className="f4 bold center mw5">Sorting</h1>
                        <ul className="list pl0 ml0 center mw5 ba b--light-silver br3">
                            <li onClick={()=>onAlgoChange("bubble")} className="ph3 pv2 bb b--light-silver pointer hover-white ">BubbleSort</li>
                            <li onClick={()=>onAlgoChange("selection")} className="ph3 pv2 bb b--light-silver pointer hover-white ">SelectionSort</li>
                            <li onClick={()=>onAlgoChange("quick")} className="ph3 pv2 bb b--light-silver pointer hover-white ">QuickSort</li>
                        </ul>
                    </div>
                    <div class="fl w-100 w-third-ns">
                        <h1 className="f4 bold center mw5">Searching</h1>
                        <ul className="list pl0 ml0 center mw5 ba b--light-silver br3">
                        <li onClick={()=>onAlgoChange("bfs")} className="ph3 pv2 bb b--light-silver pointer hover-white ">Breadth First Search</li>
                        </ul>
                    </div>
                    <div class="fl w-100 w-third-ns ">
                        <h1 className="f4 bold center mw5">Other</h1>
                        <ul className="list pl0 ml0 center mw5 ba b--light-silver br3">
                        <li className="ph3 pv2 bb b--light-silver pointer hover-white ">BubbleSort</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List;