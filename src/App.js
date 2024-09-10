import React from 'react';
import Particles from 'react-particles-js';
import P5Wrapper from 'react-p5-wrapper';

import Splash from './Components/splash';
import List from './Components/list';
import AlgoSplash from "./Components/AlgoSpalash";

import './App.css';

import bubble from "./SortAlgos/bubble";
import selection from "./SortAlgos/selection";
import quick from "./SortAlgos/quick";
import heap from "./SortAlgos/heap"

import bfs from "./SearchAlgos/bfs";
import dfs from "./SearchAlgos/dfs";
import astar from "./SearchAlgos/astar"

import maze from "./OtherAlgos/maze";
import ray2d from "./OtherAlgos/ray2d";
import quadtree from "./OtherAlgos/quadtree";


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

const algoData = [
    {
      name : "bubble",
      title : "Bubble Sort",
      description : "Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in the wrong order. It requires an O(n*n) time complexity on average while also requiring a large number of memory operations (swaps). Bubble sort is considered the simplest and most inefficient sorting algorithm",
      algorithm: bubble
    },
    {
      name : "selection",
      title : "Selection Sort",
      description : "The selection sort algorithm sorts an array by repeatedly finding the minimum element from unsorted part and putting it at the beginning. While having the same time complexity as Bubble Sort O(n*n) it is a superior algorithm due to the decrease of swaps occuring in the list.",
      algorithm :selection
    },
    {
      name : "quick",
      title : "Quick Sort",
      description : "QuickSort is a Divide and Conquer algorithm. It picks an element as pivot and partitions the given array around the picked pivot. The key process in quickSort is partition(). Target of partitions is, given an array and an element x of array as pivot, put x at its correct position in sorted array and put all smaller elements before it, and put all greater elements after it.",
      algorithm :quick
    },
    {
      name : "heap",
      title : "Heap Sort",
      description : "Heap sort is a comparison-based sorting technique based on the Binary Heap data structure. It is similar to the selection sort where we first find the maximum element and place the maximum element at the end. We repeat the same process for the remaining element.",
      algorithm :heap
    },
    {
      name : "bfs",
      title : "Breadth First Search",
      description : "This algorithm is used to examine nodes looking for a correct answer or a goal node. The approach is based on a queue data structure. Upon visiting a new square all other squares are added to the back of the queue, while the next examined square is taken from the start of the queue. It is optimal for finding the shortest path, howerver high memory use.",
      algorithm :bfs
    },
    {
      name : "maze",
      title : "Maze Generation ",
      description : "This algorithm is based on recursive division. It divides the scope of the field into two sections and chooses a random wall to create a passage. It continues to divide the filed until division is no longer possible creating a maze. Used in the search algorithms",
      algorithm :maze
    },
    {
      name : "dfs",
      title : "Depth First Search ",
      description : "Similar to Breadth First it implements a data structure in order to do the traversal. The data structure used is a stack. Upon visiting a square all others are added to the stack, however the next examined square is taken from the back of the stack. While more efficient in memory use does not lead to optimal solutions.",
      algorithm :dfs
    },
    {
      name : "astar",
      title : "A* Search ",
      description : "The A* algorithm is a more optimal traversal approach due to the use of a heuristic or an educated guess as to the goal node. The cost of travelling to each node is evaluated in comparison to how close it is to the node, allowing only potential optimal solutions to be examined.",
      algorithm : astar
    },
    {
      name : "ray2d",
      title : "2D Ray Casting",
      description : "Ray Casting is an approach to detect intersections between objects using by casting rays. Using a large amount of rays allows the ray intersection to draw rectangles to represent the distance to the object creating the illusion of 3D.",
      algorithm : ray2d
    },
    {
      name : "quadtree",
      title : "Bounding Volume Heirarchy (Quadtree)",
      description : "The Quadtree is also reffered to as a Kd-Tree is a case of spacial partitioning optimization, allowing large intersection tests to be done with consideration only towards the local objects.",
      algorithm : quadtree
    },
];
  


const initState ={
    algo: "none",
    title: "none",
    description: "none",
    algorithm: null
};

class App extends React.Component {
  constructor(){
    super();
    this.state = (initState);
  }

  onAlgoChange = (newAlgo) =>{
    this.setState({algo : newAlgo,}, ()=>{  
      algoData.forEach((algo,idx,arr) =>{
        if(this.state.algo === algo.name)
        {
          this.setState({
            title:algo.title, 
            description: algo.description,
            algorithm: algo.algorithm
          });
        }
      })
      console.log(this.state);
    })
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
         : <div>
            <AlgoSplash title={this.state.title} description={this.state.description} onAlgoChange = {this.onAlgoChange}/>
            <div className="flex justify-center">
              <P5Wrapper sketch={this.state.algorithm} />
            </div>
          </div>
        }
          </div></div>
      </div>
    );
  }
}

export default App;
