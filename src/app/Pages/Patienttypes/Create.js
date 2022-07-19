import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import InputItem from '../../Components/Common/Forminput'
import "../../../assets/styles/Pages/Create.scss"
import { CreatePatienttype } from "../../Redux/actions/PatienttypeActions"

export class Create extends Component {
    constructor(props) {
        super(props)
        const currentitem = {
            id: 0,
            name: "",
            concurrencyStamp: null,
            createdUser: "",
            updatedUser: null,
            deleteUser: null,
            createTime: null,
            updateTime: null,
            deleteTime: null,
            isActive: true,
            isAdded:true
        }
        this.state = { currentitem };
    }

    handlesubmit = (e) => {
        e.preventDefault()
        this.props.CreatePatienttype(this.state.currentitem, this.props.history)
    }

    goBack = (e) => {
        e.preventDefault()
        this.props.history.push("/Patienttypes")
    }

    handleonchange = (e) => {
        const newdata = { ...this.state.currentitem }
        newdata[e.target.id] = e.target.value
        this.setState({ currentitem: newdata  })
    }

    render() {
        return (
            <div className='Page'>
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Hasta Türleri > Yeni</h4>
                            <form className="form-sample" onSubmit={this.handlesubmit}>
                                <div className="row">
                                    <InputItem
                                        itemrowspan="2"
                                        itemname="Hasta Tür Adı"
                                        itemid="name"
                                        itemvalue={this.state.currentitem.name}
                                        itemtype="text"
                                        itemplaceholder="Hasta Tür Adı"
                                        itemchange={this.handleonchange}
                                    />
                                </div>
                                <div className='row d-flex pr-5 justify-content-end align-items-right'>
                                    <button onClick={this.goBack} style={{ minWidth: '150px' }} className="btn btn-dark mr-2">Geri Dön</button>
                                    <button type="submit" style={{ minWidth: '150px' }} className="btn btn-primary mr-2">Ekle</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    Patienttypes: state.Patienttypes
})

const mapDispatchToProps = { CreatePatienttype }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Create))