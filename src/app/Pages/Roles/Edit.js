import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import InputItem from '../../Components/Common/Forminput'
import "../../../assets/styles/Pages/Create.scss"
import { UpdateRole, GetAuthories, GetSelectedRole, ClearSelectedRole } from "../../Redux/actions/RoleActions"
import Spinner from '../../shared/Spinner'
export class Edit extends Component {

    constructor(props) {
        super(props)
        const currentitem = {
            Id: 0,
            Name: "",
            ConcurrencyStamp: null,
            CreatedUser: "",
            UpdatedUser: null,
            DeleteUser: null,
            CreateTime: null,
            UpdateTime: null,
            DeleteTime: null,
            IsActive: true,
            Authories: []
        }
        this.checkbox = []
        const authories = []
        const pagestatus = false
        const roles = []
        const groupcount = 0
        const allsetup = false
        this.state = { currentitem, authories, roles, pagestatus, groupcount, allsetup };
    }

    componentDidMount() {
        this.GetData()
    }

    GetData = async () => {
        await this.props.GetAuthories();
        await this.props.GetSelectedRole(this.props.match.params.RoleId);
    }


    componentDidUpdate() {
        if (this.props.Roles.roles.length > 0 &&
            this.state.authories.length === 0 &&
            Object.keys(this.props.Roles.selected_role).length !== 0 &&
            !this.props.Roles.isLoading
        ) {
            const currentnewdata = { ...this.props.Roles.selected_role }
            this.setState({ currentitem: currentnewdata })
            const authries = { ...this.props.Roles.roles }
            var newdata = Object.keys(authries)
                .map(function (key) {
                    return authries[key];
                });
            newdata.forEach(element => {
                this.props.Roles.selected_role.authories.forEach(prevelement => {
                    if (prevelement.concurrencyStamp === element.concurrencyStamp) {
                        element.isAdded = true
                    }
                })
            })
            this.setState({ authories: newdata }, () => {
                this.props.Roles.selected_role.authories.forEach(element => {
                    if (this.checkbox[element.concurrencyStamp] !== undefined) {
                        this.checkbox[element.concurrencyStamp].checked = true
                    }
                })
            })
        }
    }

    componentWillUnmount() {
        this.props.ClearSelectedRole()
    }

    handlesubmit = (e) => {
        e.preventDefault()
        const newdata = { ...this.state.currentitem }
        newdata.authories = this.state.authories.filter(element => element.isAdded === true)

        this.setState({ currentitem: newdata }, () => {
            this.postData();
        })
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

    handleaddallauth = () => {
        const authries = { ...this.state.authories }
        var newdata = Object.keys(authries)
            .map(function (key) {
                return authries[key];
            });
        newdata.forEach(element => {
            element.isAdded = true
        })
        this.setState({ authories: newdata })
        const checkboxex = { ...this.checkbox }
        var newdatacheckbox = Object.keys(checkboxex)
            .map(function (key) {
                return checkboxex[key];
            });
            newdatacheckbox.forEach(element => {
            element.checked = true
        })
    }

    handleonRolehange = (e) => {
        const authries = { ...this.state.authories }
        var newdata = Object.keys(authries)
            .map(function (key) {
                return authries[key];
            });
        newdata.forEach(element => {
            if (element.concurrencyStamp === e.target.name.concurrencyStamp) {
                element.isAdded = e.target.value
            }
        })
        this.setState({ authories: newdata })
    };

    postData = async () => {
        this.props.UpdateRole(this.state.currentitem, this.props.history)
    };

    render() {
        const { isLoading } = this.props.Roles
        let authgroups = []
        this.state.authories.forEach(element => {
            if (!authgroups.includes(element.group)) {
                authgroups.push(element.group)
            }
        });
        return (
            <>
                {isLoading ? <Spinner /> :
                    <div className='Page'>
                        <div className="col-12 grid-margin">
                            <div className="card">
                                <div className="card-body">
                                    <div className='row'>
                                        <div className='col-6 d-flex justify-content-start'>
                                            <h4 className="card-title">Roller > Güncelle</h4>
                                        </div>
                                        <div className='col-6 d-flex justify-content-end'>
                                            <button style={{ minWidth: '120px', height: '30px' }} onClick={this.handleaddallauth} className="btn btn-primary mr-2">Tüm Yetkiler</button>
                                        </div>
                                    </div>
                                    <form className="form-sample" onSubmit={this.handlesubmit}>
                                        <div className="row">
                                            <InputItem
                                                itemrowspan="2"
                                                itemname="Role İsmi"
                                                itemid="Name"
                                                itemvalue={this.state.currentitem.name}
                                                itemtype="text"
                                                itemplaceholder="Role İsmi"
                                                itemchange={this.handleonchange}
                                            />
                                        </div>
                                        <div className='row'>
                                            <label style={{ fontSize: "12px" }} className="col-form-label">Yetkiler</label>
                                        </div>
                                        <div className='row'>
                                            <div className='col-12 pr-5'>
                                                <div style={{ borderRadius: "25px", marginBottom: '10px' }} className='row border border-primary p-2'>
                                                    {authgroups.map((item) =>
                                                        <div className='col-12'>
                                                            <label style={{ fontSize: '15px', marginBottom: "-2px" }}>{item}</label>
                                                            <div className='row'>
                                                                {this.state.authories.filter(element => element.group === item).map((subitem) =>
                                                                    <div className='col-3'>
                                                                        <div className="form-check">
                                                                            <label className="form-check-label">
                                                                                <input
                                                                                    onChange={(e) => {
                                                                                        this.handleonRolehange({
                                                                                            target: {
                                                                                                name: subitem,
                                                                                                value: e.target.checked,
                                                                                            },
                                                                                        });
                                                                                    }}
                                                                                    type="checkbox" key="{item}" className="form-check-input" name={subitem.name} value={subitem.IsAdded} ref={checkbox => this.checkbox[subitem.concurrencyStamp] = checkbox} />
                                                                                <i className="input-helper"></i>
                                                                                {subitem.name}
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                )
                                                                }
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

const mapDispatchToProps = { UpdateRole, GetAuthories, GetSelectedRole, ClearSelectedRole }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Edit))