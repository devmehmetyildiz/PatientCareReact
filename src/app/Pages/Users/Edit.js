import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import InputItem from '../../Components/Common/Forminput'
import "../../../assets/styles/Pages/Create.scss"
import { EditUser, GetSelectedUser, ClearSelectedUser } from "../../Redux/actions/UserAction"
import { GetStationByDepartments, GetStationsByUser, ClearfilteredStation, GetAllStations } from "../../Redux/actions/StationAction"
import { GetAllRoles } from "../../Redux/actions/RoleActions"
import { GetAllDepartments } from "../../Redux/actions/DepartmentAction"
import Spinner from '../../shared/Spinner'
import Select from 'react-select';
import { Form } from 'react-bootstrap'
import Popup from "../../Utils/Popup"

export class Edit extends Component {

    constructor(props) {
        super(props)
        const currentitem = {
            id: 0,
            name: "",
            surname: "",
            normalizedUsername: "",
            concurrencyStamp: "",
            createdUser: "",
            updatedUser: "",
            deleteUser: "",
            createTime: null,
            updateTime: null,
            deleteTime: null,
            isActive: true,
            username: "",
            passwordHash: "",
            email: "",
            emailConfirmed: false,
            phoneNumber: "",
            phoneNumberConfirmed: false,
            accessFailedCount: 0,
            town: "",
            address: "",
            city: "",
            language: "",
            userID: 0,
            stations: [],
            roles: [],
            departments: []
        }
        const language = [
            { label: 'TR', value: 'TR' },
            { label: 'EN', value: 'EN' }
        ]
        const currentlanguage = {}
        const passswordHashConfirm = ""
        const selected_stations = []
        const selected_departments = []
        const selected_roles = []
        const roles = []
        const stations = []
        const departments = []
        this.state = {
            currentitem, selected_departments, selected_stations, selected_roles,
            departments, stations, roles, language, passswordHashConfirm, currentlanguage
        };
    }

    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        this.props.GetSelectedUser(this.props.match.params.UserId);
        this.props.GetAllDepartments();
        this.props.GetAllRoles();
        this.props.GetAllStations();
    }

    componentDidUpdate() {
        if (this.props.Stations.list.length > 0 &&
            this.props.Departments.list.length > 0 &&
            this.props.Roles.list.length > 0 &&
            this.state.stations.length === 0 &&
            this.state.departments.length === 0 &&
            Object.keys(this.props.Users.selected_user).length !== 0 &&
            this.state.roles.length === 0) {

            const newdata = { ...this.props.Users.selected_user }

            const currentlanguage = { value: this.props.Users.selected_user.language, label : this.props.Users.selected_user.language }

            const currentstationslist = (this.props.Users.selected_user.stations || []).map((item, index) => {
                return { value: item.concurrencyStamp, label: item.name }
            })

            const currentdepartmentslist = (this.props.Users.selected_user.departments || []).map((item, index) => {
                return { value: item.concurrencyStamp, label: item.name }
            })

            const currentroleslist = (this.props.Users.selected_user.roles || []).map((item, index) => {
                return { value: item.concurrencyStamp, label: item.name }
            })

            const stationslist = (this.props.Stations.list || []).map((item, index) => {
                return { value: item.concurrencyStamp, label: item.name }
            })
            const departmentlist = (this.props.Departments.list || []).map((item, index) => {
                return { value: item.concurrencyStamp, label: item.name }
            })
            const roleslist = (this.props.Roles.list || []).map((item, index) => {
                return { value: item.concurrencyStamp, label: item.name }
            })
            this.setState({
                stations: stationslist, departments: departmentlist, roles: roleslist, selected_stations: currentstationslist,
                selected_roles: currentroleslist, selected_departments: currentdepartmentslist, currentitem: newdata ,currentlanguage:currentlanguage
            })
        }
    }

    handlesubmit = (e) => {
        e.preventDefault()
        let stations = [];
        let roles = [];
        let departments = [];
        (this.state.selected_stations || []).map(element => {
            stations.push(this.props.Stations.list.find(station => station.concurrencyStamp === element.value))
        });
        (this.state.selected_roles || []).map(element => {
            roles.push(this.props.Roles.list.find(roles => roles.concurrencyStamp === element.value))
        });
        (this.state.selected_departments || []).map(element => {
            departments.push(this.props.Departments.list.find(department => department.concurrencyStamp === element.value))
        });

        const newdata = { ...this.state.currentitem }
        newdata.stations = stations
        newdata.departments = departments
        newdata.roles = roles
        newdata.language = this.state.currentlanguage.value
        this.setState({ currentitem: newdata }, () => {
            this.props.EditUser(this.state.currentitem, this.props.history)
        })
    }

    goBack = (e) => {
        e.preventDefault()
        this.props.history.push("/Users")
    }

    handleonchange = (e) => {
        const newdata = { ...this.state.currentitem }
        newdata[e.target.id] = e.target.value
        this.setState({ currentitem: newdata }, () => {
        })

    }

    handleselectstation = (e) => {
        this.setState({ selected_stations: e })
    }

    handleselectdepartments = (e) => {
        this.setState({ selected_departments: e }, () => {
            const Stations = [];
            (this.state.stations || []).map(item => {
                let returnitem = {};
                (this.state.selected_departments || []).map(department => {
                    let departmentobj = this.props.Departments.list.find(u => u.concurrencyStamp === department.value)
                    if (departmentobj.stations.filter(e => e.concurrencyStamp === item.value).length > 0) {
                        returnitem = item
                    }
                });
                if (Object.keys(returnitem).length !== 0) {
                    Stations.push(returnitem)
                }
            })
            const newselectedstation = [];
            (this.state.selected_stations || []).map(element => {
                if (Stations.filter(e => e.value === element.value).length > 0) {
                    newselectedstation.push(element)
                }
            });
            this.setState({ selected_stations: newselectedstation })
        })
    }

    handleselectroles = (e) => {
        this.setState({ selected_roles: e })
    }

    handleselectLanguage = (e) => {
        this.setState({ currentlanguage: e })
    }

    render() {
        const  isLoading  = (this.props.Users.isLoading || this.props.Stations.isLoading || this.props.Roles.isLoading || this.props.Departments.isLoading)
        const Departments = this.state.departments
        const Roles = this.state.roles
        const Stations = [];
        (this.state.stations || []).map(item => {
            let returnitem = {};
            (this.state.selected_departments || []).map(department => {
                let departmentobj = this.props.Departments.list.find(u => u.concurrencyStamp === department.value)
                if (departmentobj.stations.filter(e => e.concurrencyStamp === item.value).length > 0) {
                    returnitem = item
                }
            });
            if (Object.keys(returnitem).length !== 0) {
                Stations.push(returnitem)
            }
        })

        const Languages = this.state.language

        return (
            <>
                {isLoading ? <Spinner /> :
                    <div className='Page'>
                        <div className="col-12 grid-margin">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Kullanıcılar > Yeni</h4>
                                    <form className="form-sample" onSubmit={this.handlesubmit}>
                                        <div className="row">
                                            <InputItem
                                                itemrowspan="4"
                                                itemname="Kullanıcı Adı"
                                                itemid="username"
                                                itemvalue={this.state.currentitem.username}
                                                itemtype="text"
                                                itemplaceholder="Kullanıcı Adı"
                                                itemchange={this.handleonchange}
                                                readonly={true}
                                            />
                                            <InputItem
                                                itemrowspan="4"
                                                itemname="İsim"
                                                itemid="name"
                                                itemvalue={this.state.currentitem.name}
                                                itemtype="text"
                                                itemplaceholder="İsim"
                                                itemchange={this.handleonchange}
                                            />
                                            <InputItem
                                                itemrowspan="4"
                                                itemname="Soyisim"
                                                itemid="surname"
                                                itemvalue={this.state.currentitem.surname}
                                                itemtype="text"
                                                itemplaceholder="Soyisim"
                                                itemchange={this.handleonchange}
                                            />
                                            <InputItem
                                                itemrowspan="4"
                                                itemname="E-Posta"
                                                itemid="email"
                                                itemvalue={this.state.currentitem.email}
                                                itemtype="text"
                                                itemplaceholder="E-Posta"
                                                itemchange={this.handleonchange}
                                            />
                                        </div>
                                        <div className='row'>
                                            <InputItem
                                                itemrowspan="4"
                                                itemname="Telefon"
                                                itemid="phoneNumber"
                                                itemvalue={this.state.currentitem.phoneNumber}
                                                itemtype="text"
                                                itemplaceholder="Telefon"
                                                itemchange={this.handleonchange}
                                            />
                                            <InputItem
                                                itemrowspan="4"
                                                itemname="Şehir"
                                                itemid="city"
                                                itemvalue={this.state.currentitem.city}
                                                itemtype="text"
                                                itemplaceholder="Şehir"
                                                itemchange={this.handleonchange}
                                            />
                                            <InputItem
                                                itemrowspan="4"
                                                itemname="İlçe"
                                                itemid="town"
                                                itemvalue={this.state.currentitem.town}
                                                itemtype="text"
                                                itemplaceholder="İlçe"
                                                itemchange={this.handleonchange}
                                            />
                                            <InputItem
                                                itemrowspan="4"
                                                itemname="Adres"
                                                itemid="address"
                                                itemvalue={this.state.currentitem.address}
                                                itemtype="text"
                                                itemplaceholder="Adres"
                                                itemchange={this.handleonchange}
                                            />
                                        </div>
                                        <div className='row'>
                                            <div className="pr-5 col-6">
                                                <div className='row'>
                                                    <label style={{ fontSize: "12px" }} className="col-form-label">Departmanlar</label>
                                                </div>
                                                <Form.Group className="row" >
                                                    <div style={{ margin: '0 0 0 -10px' }} className='col-12'>
                                                        <Select
                                                            value={this.state.selected_departments}
                                                            onChange={this.handleselectdepartments}
                                                            isMulti={true}
                                                            options={Departments}
                                                        />
                                                    </div>
                                                </Form.Group>
                                            </div>
                                            <div className="pr-5 col-6">
                                                <div className='row'>
                                                    <label style={{ fontSize: "12px" }} className="col-form-label">İstasyonlar</label>
                                                </div>
                                                <Form.Group className="row" >
                                                    <div style={{ margin: '0 0 0 -10px' }} className='col-12'>
                                                        <Select
                                                            value={this.state.selected_stations}
                                                            onChange={this.handleselectstation}
                                                            isMulti={true}
                                                            options={Stations}
                                                        />
                                                    </div>
                                                </Form.Group>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className="pr-5 col-6">
                                                <div className='row'>
                                                    <label style={{ fontSize: "12px" }} className="col-form-label">Roller</label>
                                                </div>
                                                <Form.Group className="row" >
                                                    <div style={{ margin: '0 0 0 -10px' }} className='col-12'>
                                                        <Select
                                                            value={this.state.selected_roles}
                                                            onChange={this.handleselectroles}
                                                            isMulti={true}
                                                            options={Roles}
                                                        />
                                                    </div>
                                                </Form.Group>
                                            </div>
                                            <div className="pr-5 col-3">
                                                <div className='row'>
                                                    <label style={{ fontSize: "12px" }} className="col-form-label">Uygulama Dili</label>
                                                </div>
                                                <Form.Group className="row" >
                                                    <div style={{ margin: '0 0 0 -10px' }} className='col-12'>
                                                        <Select
                                                            value={this.state.currentlanguage}
                                                            onChange={this.handleselectLanguage}
                                                            options={Languages}
                                                        />
                                                    </div>
                                                </Form.Group>
                                            </div>
                                            <InputItem
                                                itemrowspan="4"
                                                itemname="Kullanıcı Numarası"
                                                itemid="userID"
                                                itemvalue={this.state.currentitem.userID}
                                                itemtype="number"
                                                itemplaceholder="Kullanıcı Numarası"
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
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    Users: state.Users,
    Stations: state.Stations,
    Roles: state.Roles,
    Departments: state.Departments
})

const mapDispatchToProps = {
    EditUser, GetAllRoles, GetStationByDepartments, GetStationsByUser, GetAllDepartments, ClearfilteredStation, GetAllStations,
    GetSelectedUser, ClearSelectedUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Edit))