import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter} from 'react-router-dom';
import { GetCurrentUser } from '../../Redux/actions/loginActions';
import InputItem from '../../Components/Common/Forminput'
import "../../../assets/styles/Pages/Create.scss"
import { CreateCase } from "../../Redux/actions/CaseActions"
export class Create extends Component {

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
        this.postData()
    }

    goBack = (e) => {
        e.preventDefault()
        this.props.history.push("/Cases")
    }

    handleonchange = (e) => {
        const newdata = { ...this.state.currentitem }
        newdata[e.target.id] = e.target.value
        this.setState({ currentitem: newdata }, () => {
            console.log('currentitem: ',this.state.currentitem);
        })

    }

    postData = async () => {
        this.props.CreateCase(this.state.currentitem, this.props.history)
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
                                        itemname="isim"
                                        itemid="name"
                                        itemvalue={this.state.currentitem.name}
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
    ActiveUser: state.ActiveUser,
    Cases: state.Cases
})

const mapDispatchToProps = { GetCurrentUser, CreateCase }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Create))