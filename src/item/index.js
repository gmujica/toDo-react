import React, {Component} from 'react';

class Item extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.deleteItem = this.deleteItem.bind(this);
      this.addToDone = this.addToDone.bind(this);
    }
    deleteItem() {
        global.storage.dispatch({type: "DELETE-ITEM", id: this.props.item.id})
    }

    addToDone() {
        if (!this.props.isDesabled) {
          global.storage.dispatch({type: "ADD-TO-DONE", i: this.props.i})
        }
    }

    render() {
        return (<li
           className="element">
            <div className="moveBtn"></div> 
            <input 
              type="checkbox"
              onChange={() => {
                if (!this.props.isDesabled) {
                   this.addToDone(this.props.i)
                }
              }}
            />
              <span className="span">{this.props.item.value}</span>
              <div
              className="delBtn" 
                onClick={() => this.deleteItem(this.props.item.id)}
              >
              </div>
            </li>)
    }
}    

export default Item;