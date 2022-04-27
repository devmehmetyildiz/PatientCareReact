import React, { Component } from 'react'
import "../../../assets/styles/Custom/input.scss"
export default class input extends Component { 
  render() {
    return (
      <div className="form-group">
      
        <div className="input-group inputborder">
        <div className="input-group-prepend bg-transparent ">
            <span className="input-group-text bg-transparent border-right-0">
              <i className={this.props.itemclass}></i>
            </span>
          </div>
          <input id={this.props.itemid} type={this.props.itemtype} className="form-control form-control-lg border-left-0 form__input" autocomplete="off" placeholder=" "
          value={this.props.itemvalue} onChange={this.props.itemchangefunc}
          ></input>
            <label className='form__label'>{this.props.title}</label>
        </div>
      </div>
    )
  }
}