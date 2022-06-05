import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom';
import cogoToast from 'cogo-toast';
import InputItem from '../../Components/Common/Forminput'
import "../../../assets/styles/Pages/Create.scss"
import { UpdateRole, GetAuthories, GetSelectedRole } from "../../Redux/actions/RoleActions"
import Spinner from '../../shared/Spinner'

export class Edit extends Component {

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
            authories: []
        }
        const pagestatus = false
        const roles = []
        this.state = { currentitem, roles, pagestatus };
    }

    componentDidMount() {
        this.getAuthories()
    }

    getAuthories = async () => {
        await this.props.GetSelectedRole(this.props.match.params.RoleId);
        await this.props.GetAuthories();
        this.setState({ currentitem: this.props.Roles.selected_role })
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
        let ishave = false;
        this.state.currentitem.authories.find(x => x.name === e.target.name.name) ? ishave = true : ishave = false
        if (!ishave) {
            const newdata = { ...this.state.currentitem }
            newdata.authories.push(e.target.name)
            this.setState({ currentitem: newdata }, () => {
            })
        }
        else {
            const newdata = { ...this.state.currentitem }
            let index = -1;
            newdata.authories.find((x, i) => {
                if (x.name === e.target.name.name) {
                    index = i
                }
            }
            )
            if (index > -1) {
                newdata.authories.splice(index, 1);
            }
            this.setState({ currentitem: newdata }, () => {
            })
        }

    }

    checkstatetorender = (element) => {
        let isok = false
        const { authories } = this.state.currentitem
        authories.find(x => x.concurrencyStamp === element.concurrencyStamp) ? isok = true : isok = false
        
        return isok;
    }

    postData = async () => {
        this.props.UpdateRole(this.state.currentitem, this.props.history)
    };

    render() {
        const { isLoading, roles } = this.props.Roles
        if (roles.length !== 0) {
            roles.forEach((element) => {
                const role = element
                role.isChecked = this.checkstatetorender(element)
            });
        }
        return (
            <>
                {isLoading ? <Spinner /> :
                    <div className='Page'>
                        <div className="col-12 grid-margin">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Roller > Güncelle</h4>
                                    <form className="form-sample" onSubmit={this.handlesubmit}>
                                        <div className="row">
                                            <InputItem
                                                itemrowspan="2"
                                                itemname="Role İsmi"
                                                itemid="name"
                                                itemvalue={this.state.currentitem.name}
                                                itemtype="text"
                                                itemplaceholder="Role İsmi"
                                                itemchange={this.handleonchange}
                                            />
                                        </div>
                                        <div className='row'>
                                            <div className='col-12 pr-5'>
                                                <div className='row border border-primary m-2'>
                                                    {roles.map((item) =>
                                                        <div className='col-3' key={item.ConcurrencyStamp}>
                                                            <div className="form-check">
                                                                <label className="form-check-label">
                                                                    <input
                                                                        onChange={(e) => {
                                                                            this.handleonRolehange({
                                                                                target: {
                                                                                    name: item,
                                                                                    checked: e.target.checked,
                                                                                },
                                                                            });
                                                                        }}
                                                                        type="checkbox"
                                                                        key="{item}"
                                                                        className="form-check-input"
                                                                        name={item.name}
                                                                        id={item.name}
                                                                        checked={item.isChecked}
                                                                    />

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
                                            <button type="submit" style={{ minWidth: '150px' }} className="btn btn-primary mr-2">Güncelle</button>
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
    Roles: state.Roles
})

const mapDispatchToProps = { UpdateRole, GetAuthories, GetSelectedRole }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Edit))