import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
export default class Forminput extends Component {
    constructor(props) {
        super(props)
        let rowclass = ""
        let rowvalue = this.props.itemrowspan
        if (rowvalue === undefined) {
            rowvalue = "1"
        }
        switch (rowvalue) {
            case "1":
                rowclass = `pr-5 col-6`
                break;
            case "2":
                rowclass = `pr-5 col-12`
                break;
            case "3":
                rowclass = `pr-5 col-4`
                break;
            case "4":
                rowclass = `pr-5 col-3`
                break;
            default:
                break;
        }


        this.state = { rowclass }
    }
    render() {
        return (
            <div className={this.state.rowclass}>
                <div className='row'>
                    <label style={{ fontSize: "12px" }} className="col-form-label">{this.props.itemname}</label>
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