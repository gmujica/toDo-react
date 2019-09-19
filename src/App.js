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
      newItem:''
    });
  }


  deleteItem(id) {
    const list = [...this.state.list];

    const updatedList = list.filter(item => item.id !== id);

    this.setState({list: updatedList});
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
            placeholder="Type item here..." 
            value={this.state.newItem} 
            onChange={e => this.updateInput ("newItem", e.target.value)} 
          />
          <button onClick={() => this.addItem()}>Add</button>
          <br />
          <ul>
            {this.state.list.map(item => {
              return(
                <li
                key={item.id} className="element">
                <button>img</button> 
                <input 
                  type="checkbox"
                  onChange={() => alert(item.value)}
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
            
          </ul>
        </div>
        </div>
      </div>
    );
  }
}

export default App;
