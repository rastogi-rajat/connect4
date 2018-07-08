import React, { Component } from 'react';
import './App.css';
import GridItem from "./component/gridItem";
class App extends Component {
  constructor() {
    super();
    this.state = {
      winner:null,
      errorMsg:null,
      player: 1,
      grid: [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
      ]
    }
  }
  updateGrid = (col)=>{
    if(this.state.grid[col].length == 6){
      this.setState({
        errorMsg:"Coloumn already full"
      })
      setTimeout(()=>{
        this.setState({
          errorMsg:null
        })
      }, 3000)
      //Show erroe message
    } if(this.state.winner){
      this.setState({
        errorMsg:"Winner already decided"
      })
    } else {
      let gridState = this.state.grid;
      gridState[col].push({
        player: this.state.player,
        color: this.state.player === 1?"red":'blue'
      })
      //x col
      //y row
      let winner = null;
      for(let y = 0; y<6 ; y++){
        for(let x = 0; x<7 ; x++){
          if(!!gridState[x] && !!gridState[x][y]){
            //vertical check
            if(!!gridState[x] && !!gridState[x][y+1]){
              if(gridState[x][y].player === gridState[x][y+1].player){
                if(!!gridState[x] && !!gridState[x][y+2]){
                  if(gridState[x][y].player === gridState[x][y+2].player){
                    if(!!gridState[x] && !!gridState[x][y+3]){
                      if(gridState[x][y].player === gridState[x][y+3].player){
                          winner = gridState[x][y].player;
                      }
                    }      
                  }
                }      
              }
            }
            //horizontal check
            if(!!gridState[x+1] && !!gridState[x+1][y]){
              if(gridState[x][y].player === gridState[x+1][y].player){
                if(!!gridState[x+2] && !!gridState[x+2][y]){
                  if(gridState[x][y].player === gridState[x+2][y].player){
                    if(!!gridState[x+3] && !!gridState[x+3][y]){
                      if(gridState[x][y].player === gridState[x+3][y].player){
                          winner = gridState[x][y].player;
                      }
                    }      
                  }
                }      
              }
            }
            //digonal right check
            if(!!gridState[x+1] && !!gridState[x+1][y+1]){
              if(gridState[x][y].player === gridState[x+1][y+1].player){
                if(!!gridState[x+2] && !!gridState[x+2][y+2]){
                  if(gridState[x][y].player === gridState[x+2][y+2].player){
                    if(!!gridState[x+3] && !!gridState[x+3][y+3]){
                      if(gridState[x][y].player === gridState[x+3][y+3].player){
                          winner = gridState[x][y].player;
                      }
                    }      
                  }
                }      
              }
            }
            //digonal left check
            if(!!gridState[x-1] && !!gridState[x-1][y+1]){
              if(gridState[x][y].player === gridState[x-1][y+1].player){
                if(!!gridState[x-2] && !!gridState[x-2][y+2]){
                  if(gridState[x][y].player === gridState[x-2][y+2].player){
                    if(!!gridState[x-3] && !!gridState[x-3][y+3]){
                      if(gridState[x][y].player === gridState[x-3][y+3].player){
                          winner = gridState[x][y].player;
                      }
                    }      
                  }
                }      
              }
            }
          }
        }
        if(winner){
          break;
        }
      }
      this.setState({
        winner: winner,
        errorMsg:null,
        grid: gridState,
        player: this.state.player === 1?2:1
      })
    }
  }
  resetGame=()=>{
    this.setState({
      winner:null,
      errorMsg:null,
      player: 1,
      grid: [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
      ]
    })
  }
  render() {
    const gridLayout = [];
    for(let y = 5; y>=0 ; y--){
      let row = [];
      for(let x = 0; x<7 ; x++){
        row.push(<GridItem row={y} col={x} data={this.state.grid[x][y]} action = {this.updateGrid} />)
      }
      gridLayout.push(<div key={`row-${y}`} className="row">{row}</div>);
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Connect 4</h1>
          <h3>Player {this.state.player} turn</h3>
          <h3 className={`winner-msg ${this.state.winner?"show":"hide"}`}>Player {this.state.winner} is the Winner</h3>
          <h3 className={`error-msg ${this.state.errorMsg?"show":"hide"}`}>{this.state.errorMsg}</h3>
        </header>
        <div className="grid-container">
          {gridLayout}
        </div>
        <div className="btn-container">
          <button className="resetBtn" onClick={this.resetGame}>Reset</button>
        </div>
      </div>
    );
  }
}

export default App;
