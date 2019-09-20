import React, {Component} from 'react';
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
          <input 
            type="text" 
            placeholder="Crear nueva tarea" 
            value={this.state.newItem} 
            onChange={e => this.updateInput ("newItem", e.target.value)} 
          />
          <button onClick={() => this.addItem()}>Add</button>
          <br />
          <ul>
            {this.state.list.map((item, i) => {
              return(
                <li
                key={item.id} className="element">
                <button>img</button> 
                <input 
                  type="checkbox"
                  onChange={() => this.addToDone(i)}
                />
                  {item.value}
                  <button 
                    onClick={() => this.deleteItem(item.id)}
                  >
                    x
                  </button>
                </li>
              )
            })}
          </ul>
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
                    onClick={() => this.deleteItem(item.id)}
                  >
                    x
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
