import React, {Component} from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { newItem: '', list: [], list2: []  };


  }

  updateInput(key, value) {
    this.setState({
      [key]: value
    });
  }

  addItem() {
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem
    };

    const list = [...this.state.list];

    list.push(newItem);

    this.setState({
      list,
      newItem:'',

    });
  }
  addToDone(i) {
    const selectedItem = this.state.list[i];
    let tempArray = this.state.list;
    tempArray.splice(i, 1);
    const tempArray2 = this.state.list2;
    tempArray2.push(selectedItem);
    this.setState({
      list: tempArray,
      list2: tempArray2
    })
    
  };

  deleteItem(id) {
    const list = [...this.state.list];
    const list2 = [...this.state.list2];
    const updatedList = list.filter(item => item.id !== id);
    const updatedList2 = list2.filter(item => item.id !== id);

    this.setState({list: updatedList, list2: updatedList2});
  }

  render() {
    return (
      <div className="App">
        <div className="grid-container">
        <div>
          Add an Item
          <br/>
          <button className="addBtn" onClick={() => this.addItem()}></button>
          <input 
            type="text" 
            placeholder="Crear nueva tarea"
            className="input" 
            value={this.state.newItem} 
            onChange={e => this.updateInput ("newItem", e.target.value)} 
          />
          <br />
          <DndProvider backend={HTML5Backend}>
            <ul className="list1">
              {this.state.list.map((item, i) => {
                return(
                  <li
                  key={item.id} className="element">
                  <div className="moveBtn"></div> 
                  <input 
                    type="checkbox"
                    onChange={() => this.addToDone(i)}
                  />
                    <span className="span">{item.value}</span>
                    <div
                    className="delBtn" 
                      onClick={() => this.deleteItem(item.id)}
                    >
                    </div>
                  </li>
                )
              })}
            </ul>
          </DndProvider>
        </div>
        <div>
          second container
          <ul>
          {this.state.list2.map((item, i) => {
              return(
                <li
                key={item.id} className="element">
                <button>img</button> 
                <input 
                  type="checkbox"
                  defaultChecked="true"
                  />
                  {item.value}
                  <button 
                  className="delBtn"
                    onClick={() => this.deleteItem(item.id)}
                  >
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        </div>
      </div>
    );
  }
}

export default App;
