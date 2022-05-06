import React, { Component } from 'react'

export default class FormSelect extends Component {
  render() {
    return (
        <div className="col-md-6">
        <Form.Group className="row">
            <label className="col-sm-3 col-form-label">{this.props.itemname}</label>
            <div className="col-sm-9">
                <select className="form-control" 
                        id={this.props.itemid} 
                        value={this.props.itemvalue} 
                        type={this.props.itemtype}
                        placeholder={this.props.itemplaceholder}
                        onChange={this.props.itemchange}
                >
                    <option>Male</option>
                    <option>Female</option>
                </select>
            </div>
        </Form.Group>
    </div>
    )
  }
}
