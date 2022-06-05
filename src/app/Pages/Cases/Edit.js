import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios';
import { GetToken } from '../../Utils/TokenValidChecker';
import { withRouter } from 'react-router-dom';
import cogoToast from 'cogo-toast';
import InputItem from '../../Components/Common/Forminput'
import { GetSelectedCase, UpdateCase, ClearSelectedCase } from '../../Redux/actions/CaseActions';
import { GetCurrentUser } from '../../Redux/actions/loginActions';
import "../../../assets/styles/Pages/Create.scss"
import Spinner from '../../shared/Spinner'


export class Edit extends Component {

    constructor(props) {
        super(props)
        const currentitem = {
            id: 0,
            caseGroup: "",
            caseStatus: 0,
            name: "",
            normalizedName: null,
            concurrencyStamp: null,
            createdUser: "",
            updatedUser: null,
            deleteUser: null,
            createTime: null,
            updateTime: null,
            deleteTime: null,
            isActive: true
        }
        this.state = { currentitem };
    }

    handlesubmit = (e) => {
        e.preventDefault()
        this.postData();
    }

    componentWillUnmount() {
        this.props.ClearSelectedCase()
    }

    componentDidMount() {
       this.getData()
    }

    getData = async () => {
        await this.props.GetSelectedCase(this.props.match.params.CaseId)
        this.setState({ currentitem: this.props.Cases.selected_case })
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
        })

    }

    postData = async () => {
        this.props.UpdateCase(this.state.currentitem, this.props.history)
    };

    render() {



        return (
            <div>
                {this.props.Cases.isLoading ? <Spinner /> :
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
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    Cases: state.Cases,
    ActiveUser: state.ActiveUser
})

const mapDispatchToProps = { GetSelectedCase, UpdateCase, ClearSelectedCase, GetCurrentUser }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Edit))