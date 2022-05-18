import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios';
import { GetToken } from '../../Utils/TokenValidChecker';
import { setUser } from "../../Redux/actions/loginActions"
import { withRouter, Link } from 'react-router-dom';
import cogoToast from 'cogo-toast';
import InputItem from '../../Components/Common/Forminput'
import "../../../assets/styles/Pages/Create.scss"

export class Create extends Component {

    constructor(props) {
        super(props)
        const currentitem = {
            Id: 0,
            Name: "",
            NormalizedName: null,
            ConcurrencyStamp: null,
            CreatedUser: "",
            UpdatedUser: null,
            DeleteUser: null,
            CreateTime: null,
            UpdateTime: null,
            DeleteTime: null,
            IsActive: true,
            roles: []
        }
        const roles = []
        this.state = { currentitem, roles };
        this.props.setUser()
    }

    componentDidMount() {
        this.getRoles()
    }

    getRoles = async () => {
        const response = await axios({
            method: 'get',
            data: this.state.currentitem,
            url: process.env.REACT_APP_BACKEND_URL + '/Authory/GetAllroles',
            headers: { Authorization: `Bearer ${GetToken()}` }
        }).catch(error => {
            if (error.response !== undefined) {
                if (error.response.status === '401') {
                    this.props.history.push("/Login")
                }
            } else {
                cogoToast.error('Veri Alınırken Hata Alındı', this.toastoptions)
                this.props.history.push("/Login")
            }
        })
        if (response !== undefined) {
            this.setState({ roles: response.data })
        }
    }

    handlesubmit = (e) => {
        e.preventDefault()
        const newdata = { ...this.state.currentitem }
        newdata["createdUser"] = this.props.ActiveUser
        this.setState({ currentitem: newdata }, () => {
            if (this.state.currentitem.name != undefined || this.state.currentitem.name != "") {
                this.postData();
            } else {
                cogoToast.error('Lütfen Tekrar Deneyiniz', this.toastoptions)
            }
        })

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

    postData = async () => {
        console.log(this.state.currentitem)
        const response = await axios({
            method: 'post',
            data: this.state.currentitem,
            url: process.env.REACT_APP_BACKEND_URL + '/Authory/Add',
            headers: { Authorization: `Bearer ${GetToken()}` }
        }).catch(error => {
            if (error.response !== undefined) {
                if (error.response.status === "401") {
                    this.props.history.push("/Login")
                }
            } else {
                cogoToast.error('Veri Eklenirken Hata Alındı', this.toastoptions)
            }
        })
        if (response !== undefined) {
            console.log('response: ', response);
            if (response.status === 200) {
                console.log("200 geldim")
                cogoToast.success('Kayıt Eklendi', this.toastoptions)
                this.props.history.push("/Cases")
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
                                <div className="row">
                                    <InputItem
                                        itemname="Durum Grubu"
                                        itemid="caseGroup"
                                        itemvalue={this.state.currentitem.CaseGroup}
                                        itemtype="text"
                                        itemplaceholder="Durum Grubu"
                                        itemchange={this.handleonchange}
                                    />
                                    <InputItem
                                        itemname="Durum Değeri"
                                        itemid="caseStatus"
                                        itemvalue={this.state.currentitem.CaseStatus}
                                        itemtype="number"
                                        itemplaceholder="Durum Değeri"
                                        itemchange={this.handleonchange}
                                    />
                                </div>
                                <div className="row">
                                    <InputItem
                                        itemrowspan="2"
                                        itemname="isim"
                                        itemid="Name"
                                        itemvalue={this.state.currentitem.Name}
                                        itemtype="text"
                                        itemplaceholder="İsim"
                                        itemchange={this.handleonchange}
                                    />
                                </div>
                                <div className="row">
                                    {this.state.roles.map(() => 
                                        <div className='col-3'>
                                            <div className="form-check">
                                                <label className="form-check-label">
                                                    <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios1" value="" />
                                                    <i className="input-helper"></i>
                                                    Default
                                                </label>
                                            </div>
                                        </div>
                                    )}
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
    ActiveUser: state.ActiveUser.user
})

const mapDispatchToProps = { setUser }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Create))