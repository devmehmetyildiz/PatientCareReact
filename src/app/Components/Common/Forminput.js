import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
export default class Forminput extends Component {
    constructor(props) {
        super(props)
        var rowclass = "col-6 pr-5"
        if (this.props.itemrowspan !== undefined) {
            if (this.props.itemrowspan === "2") {
                rowclass = "col-12 pr-5"
            }
        }
        this.state = { rowclass }
    }
    render() {
        return (
            <div className={this.state.rowclass}>
                <div className='row'>
                <label style={{fontSize:"12px"}} className="col-form-label">{this.props.itemname}</label>
                </div>               
                <Form.Group className="row" >
                    <Form.Control
                        id={this.props.itemid}
                        value={this.props.itemvalue}
                        type={this.props.itemtype}
                        placeholder={this.props.itemplaceholder}
                        onChange={this.props.itemchange} />
                </Form.Group>
            </div>
        )
    }
}