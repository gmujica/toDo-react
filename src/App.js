import React, {Component} from 'react';
import Sortable from 'sortablejs';
import Handler from './handlers'
import Item from './item';
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

    global.storage.dispatch({ type: "ADD-TO-DO", item: newItem})
    this.setState({newItem: ""})
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

  componentDidMount() {
    var el = document.querySelector('.list1');
    
    var sortable = Sortable.create(el);

    global.storage.on('ADD-TO-DONE', () => {
      
      this.setState({ list: global.storage.getState().Main.list, list2: global.storage.getState().Main.list2 })
    })
    global.storage.on('DELETE-ITEM', () => {
      console.log(global.storage.getState().Main);
      
      this.setState({ list: global.storage.getState().Main.list, list2: global.storage.getState().Main.list2 })
    })
    global.storage.on('ADD-TO-DO', () => {
      this.setState({ list: global.storage.getState().Main.list, list2: global.storage.getState().Main.list2 })
    })
  }

  render() {
    return (
      <div className="App">
        <div className="grid-container">
        <div>
          <h2>Por hacer:</h2>
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
            <ul className="list1">
              {this.state.list.map((item, i) => {
                return(
                  <Item key={item.id} i={i} item={item} />
                )
              })}
            </ul>
        </div>
        <div>
        <h2>Hecho:</h2>
          <ul className="list2">
          {this.state.list2.map((item, i) => {
              return(
                <Item key={item.id} i={i} item={item} isDesabled={true} />
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
