import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom';
import cogoToast from 'cogo-toast';
import InputItem from '../../Components/Common/Forminput'
import "../../../assets/styles/Pages/Create.scss"
import { CreateAuthory, GetRoles } from "../../Redux/actions/AuthoryActions"
import Spinner from '../../shared/Spinner'

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
        const pagestatus = false
        const roles = []
        this.state = { currentitem, roles, pagestatus };
    }

    componentDidMount() {
        this.getRoles()
    }

    getRoles = async () => {
        this.props.GetRoles();
    }

    handlesubmit = (e) => {
        e.preventDefault()
        this.postData();
    }

    goBack = (e) => {
        e.preventDefault()
        this.props.history.push("/Roles")
    }

    handleonchange = (e) => {
        const newdata = { ...this.state.currentitem }
        newdata[e.target.id] = e.target.value
        this.setState({ currentitem: newdata }, () => {
        })

    }

    handleonRolehange = (e) => {
        console.log('e: ', e);
        if (!this.state.currentitem.roles.includes(e.target.name)) {
            const newdata = { ...this.state.currentitem }
            newdata.roles.push(e.target.name)
            this.setState({ currentitem: newdata }, () => {
                console.log('this.state.currentitem.roles: ', this.state.currentitem);
                console.log("role eklendi")
            })
        }
        else {
            const newdata = { ...this.state.currentitem }
            const index = this.state.currentitem.roles.indexOf(e.target.name);
            if (index > -1) {
                this.state.currentitem.roles.splice(index, 1);
                console.log("role silindi")// 2nd parameter means remove one item only
            }
            this.setState({ currentitem: newdata }, () => {
                console.log('this.state.currentitem.roles: ', this.state.currentitem);

            })
        }

    }

    postData = async () => {
        this.props.CreateAuthory(this.state.currentitem, this.props.history)
    };

    render() {
        const { isLoading, roles } = this.props.Auth
        return (
            <>
                {isLoading ? <Spinner /> :
                    <div className='Page'>
                        <div className="col-12 grid-margin">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Roller > Yeni</h4>
                                    <form className="form-sample" onSubmit={this.handlesubmit}>
                                        <div className="row">
                                            <InputItem
                                                itemrowspan="2"
                                                itemname="Role İsmi"
                                                itemid="Name"
                                                itemvalue={this.state.currentitem.Name}
                                                itemtype="text"
                                                itemplaceholder="Role İsmi"
                                                itemchange={this.handleonchange}
                                            />
                                        </div>
                                        <div className='row'>
                                            <div className='col-12 pr-5'>
                                                <div className='row border border-primary m-2'>
                                                    {roles.map((item) =>
                                                        <div className='col-3'>
                                                            <div className="form-check">
                                                                <label className="form-check-label">
                                                                    <input
                                                                        onChange={(e) => {
                                                                            this.handleonRolehange({
                                                                                target: {
                                                                                    name: item,
                                                                                    value: e.target.checked,
                                                                                },
                                                                            });
                                                                        }}
                                                                        type="checkbox" key="{item}" className="form-check-input" name={item.name} value={item.name} id={item.name} />
                                                                    <i className="input-helper"></i>
                                                                    {item.name}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
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
                }
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    Auth: state.Authories
})

const mapDispatchToProps = { CreateAuthory, GetRoles }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Create))