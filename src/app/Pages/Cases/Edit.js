import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios';
import { GetToken } from '../../Utils/TokenValidChecker';
import { setUser } from "../../Redux/actions/loginActions"
import { withRouter } from 'react-router-dom';
import cogoToast from 'cogo-toast';
import InputItem from '../../Components/Common/Forminput'
import { setCases, selectedCase, removeselectedCase } from '../../Redux/actions/CaseActions'
import "../../../assets/styles/Pages/Create.scss"

export class Edit extends Component {

    constructor(props) {
        super(props)
        const currentitem = {
            Id: 0,
            CaseGroup: "",
            CaseStatus: 0,
            Name: "",
            NormalizedName: null,
            ConcurrencyStamp: null,
            CreatedUser: "",
            UpdatedUser: null,
            DeleteUser: null,
            CreateTime: null,
            UpdateTime: null,
            DeleteTime: null,
            IsActive: true
        }
        this.state = { currentitem };
        this.props.setUser()
    }

    handlesubmit = (e) => {
        e.preventDefault()
        const newdata = { ...this.state.currentitem }
        newdata["updatedUser"] = this.props.ActiveUser
        this.setState({ currentitem: newdata }, () => {
            if (this.state.currentitem.name != undefined || this.state.currentitem.name != "") {
                console.log("postladım")
                this.postData();
            } else {
                cogoToast.error('Lütfen Tekrar Deneyiniz', this.toastoptions)
            }
        })

    }

    componentWillUnmount() {
        this.props.removeselectedCase(this.state.currentitem)
    }

    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        const response = await axios({
            method: 'get',
            url: process.env.REACT_APP_BACKEND_URL + '/Case/GetSelectedCase?ID=' + this.props.match.params.CaseId,
            headers: { Authorization: `Bearer ${GetToken()}` }
        })
            .catch(error => {
                if (error.response.status == '401') {
                    this.props.history.push("/Login")
                }
            })
        if (response != undefined) {
            this.props.selectedCase(response.data);
            this.setState({ currentitem: this.props.SelectedCase })
            console.log('this.props.SelectedCase: ', this.state.currentitem);
        }
    }


    goBack = (e) => {
        e.preventDefault()
        this.props.history.push("/Cases")
    }

    handleonchange = (e) => {
        console.log('this.state.currentitem:')
        const newdata = { ...this.state.currentitem }
        newdata[e.target.id] = e.target.value
        this.setState({ currentitem: newdata }, () => {
            console.log('this.state.currentitem: ', this.state.currentitem);

        })

    }

    postData = async () => {
        console.log(this.state.currentitem)
        const response = await axios({
            method: 'post',
            data: this.state.currentitem,
            url: process.env.REACT_APP_BACKEND_URL + '/Case/Update',
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
                cogoToast.success('Kayıt Güncellendi', this.toastoptions)
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
                            <h4 className="card-title">Durumlar > Güncelle</h4>
                            <form className="form-sample" onSubmit={this.handlesubmit}>
                                <div className="row">
                                    <InputItem
                                        itemname="Durum Grubu"
                                        itemid="caseGroup"
                                        itemvalue={this.state.currentitem.caseGroup}
                                        itemtype="text"
                                        itemplaceholder="Durum Grubu"
                                        itemchange={this.handleonchange}
                                    />
                                    <InputItem
                                        itemname="Durum Değeri"
                                        itemid="caseStatus"
                                        itemvalue={this.state.currentitem.caseStatus}
                                        itemtype="number"
                                        itemplaceholder="Durum Değeri"
                                        itemchange={this.handleonchange}
                                    />
                                </div>
                                <div className="row">
                                    <InputItem
                                        itemrowspan="2"
                                        itemname="İsim"
                                        itemid="name"
                                        itemvalue={this.state.currentitem.name}
                                        itemtype="text"
                                        itemplaceholder="İsim"
                                        itemchange={this.handleonchange}
                                    />
                                </div>
                                <div className='row d-flex pr-5 justify-content-end align-items-right'>
                                    <button onClick={this.goBack} style={{ minWidth: '150px' }} className="btn btn-dark mr-2">Geri Dön</button>
                                    <button type="submit" style={{ minWidth: '150px' }} className="btn btn-primary mr-2">Güncelle</button>
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
    ActiveUser: state.ActiveUser.user,
    SelectedCase: state.SelectedCase
})

const mapDispatchToProps = { setUser, setCases, selectedCase, removeselectedCase }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Edit))