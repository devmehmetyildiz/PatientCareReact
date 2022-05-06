import React, { Component } from 'react'
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux'
import axios from 'axios';
import { GetToken } from '../../Utils/TokenValidChecker';
import { setCases, selectedCase, removeselectedCase } from '../../Redux/actions/CaseActions'
import { withRouter, Link } from 'react-router-dom';
import cogoToast from 'cogo-toast';
import InputItem from '../../Components/Common/Forminput'
import "../../../assets/styles/Pages/Create.scss"

export class Create extends Component {

    constructor(props) {
        super(props)
        const currentitem = []
        this.state = { currentitem };

    }

    handlesubmit = (e) => {
        e.preventDefault()
        alert("tıkladım")
    }

    goBack = (e) => {
        e.preventDefault()
        this.props.history.push("/Cases")
    }

    handleonchange = (e) => {
        const newdata = { ...this.state.currentitem }
        newdata[e.target.id] = e.target.value
        this.setState({ currentitem: newdata }, () => {
        })
    }

    componentDidMount() {
        //    this.getData()
    }

    postData = async () => {
        const response = await axios({
            method: 'post',
            data: this.state.currentitem,
            url: process.env.REACT_APP_BACKEND_URL + '/Case/Add',
            headers: { Authorization: `Bearer ${GetToken()}` }
        }).catch(error => {
            if (error.response !== undefined) {
                if (error.response.status === '401') {
                    this.props.history.push("/User/login")
                }
            } else {
                cogoToast.error('Veri Eklenirken Hata Alındı', this.toastoptions)
            }
        })
        if (response !== undefined) {
            if (response.status === '200') {
                cogoToast.success('Veri Eklenirken Hata Alındı', this.toastoptions)
            }
        }
    };

    render() {
        return (
            <div className='Page'>
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Durumlar > Yeni</h4>
                            <form className="form-sample" onSubmit={this.handlesubmit}>
                                <p className="card-description"> Yeni Durum Değeri </p>
                                <div className="row">
                                    <InputItem
                                        itemname="Durum Grubu"
                                        itemid="CaseGroup"
                                        itemvalue={this.state.currentitem.CaseGroup}
                                        itemtype="text"
                                        itemplaceholder="Durum Grubu"
                                        itemchange={this.handleonchange}
                                    />
                                    <InputItem
                                        itemname="Durum Değeri"
                                        itemid="CaseStatus"
                                        itemvalue={this.state.currentitem.CaseStatus}
                                        itemtype="text"
                                        itemplaceholder="Durum Değeri"
                                        itemchange={this.handleonchange}
                                    />
                                </div>
                                <div className="row">
                                    <InputItem
                                        itemrowspan="2"
                                        itemname="İsim"
                                        itemid="Name"
                                        itemvalue={this.state.currentitem.Name}
                                        itemtype="text"
                                        itemplaceholder="İsim"
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

})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Create))