import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import InputItem from '../../Components/Common/Forminput'
import "../../../assets/styles/Pages/Create.scss"
import { CreateUser } from "../../Redux/actions/UserAction"
import { GetStationByDepartments, GetStationsByUser, ClearfilteredStation, GetAllStations } from "../../Redux/actions/StationAction"
import { GetAllRoles } from "../../Redux/actions/RoleActions"
import { GetAllDepartmentsSettings } from "../../Redux/actions/DepartmentAction"
import Spinner from '../../shared/Spinner'
import Select from 'react-select';
import { Form } from 'react-bootstrap'
import Popup from "../../Utils/Popup"

export class Create extends Component {

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
        const errors = []
        this.state = {
            currentitem, selected_departments, selected_stations, selected_roles,
            departments, stations, roles, language, passswordHashConfirm, currentlanguage, errors
        };
    }

    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        this.props.GetAllDepartmentsSettings();
        this.props.GetAllRoles();
        this.props.GetAllStations();
    }

    componentDidUpdate() {
        if (this.props.Stations.list.length > 0 &&
            this.props.Departments.list.length > 0 &&
            this.props.Roles.list.length > 0 &&
            this.state.stations.length === 0 &&
            this.state.departments.length === 0 &&
            this.state.roles.length === 0) {
            const stationslist = this.props.Stations.list.map((item, index) => {
                return { value: item.concurrencyStamp, label: item.name }
            })
            const departmentlist = this.props.Departments.list.map((item, index) => {
                return { value: item.concurrencyStamp, label: item.name }
            })
            const roleslist = this.props.Roles.list.map((item, index) => {
                return { value: item.concurrencyStamp, label: item.name }
            })
            this.setState({ stations: stationslist, departments: departmentlist, roles: roleslist })
        }
    }

    handlesubmit = (e) => {
        e.preventDefault()
        const data = this.state.currentitem
        let error = []
        if ((data.name || '') === '') {
            error.push({ type: "name", showerrror: true, description: "??sim Gereklidir" })
        }
        if ((data.surname || '') === '') {
            error.push({ type: "surname", showerrror: true, description: "Soyisim Gereklidir" })
        }
        if ((data.password || '') === '') {
            error.push({ type: "password", showerrror: true, description: "??ifre Gereklidir" })
        }
        if ((data.username || '') === '') {
            error.push({ type: "username", showerrror: true, description: "Kullan??c?? Gereklidir" })
        }
        if ((data.stations || []).length === 0) {
            error.push({ type: "stations", showerrror: true, description: "??stasyon Gereklidir" })
        }
        if ((data.departments || []).length === 0) {
            error.push({ type: "departments", showerrror: true, description: "Departman Gereklidir" })
        }
        if ((data.roles || []).length === 0) {
            error.push({ type: "roles", showerrror: true, description: "Rol Gereklidir" })
        }
        if (error.length) {
            this.setState({ errors: error })
        } else {
            if (this.state.currentitem.passwordHash === this.state.passswordHashConfirm) {
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
                    this.props.CreateUser(this.state.currentitem, this.props.history)
                })
            } else {
                Popup("Error", "Kullan??c?? Ekleme", "L??tfen Parolalar?? Do??ru Giriniz")

            }
        }
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

    handlechangepassword = (e) => {
        this.setState({ passswordHashConfirm: e.target.value })
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
        const { isLoading } = this.props.Users
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
                                    <h4 className="card-title">Kullan??c??lar > Yeni</h4>
                                    <form className="form-sample" onSubmit={this.handlesubmit}>
                                        <div className="row">
                                            <InputItem
                                                itemrowspan="4"
                                                itemname="Kullan??c?? Ad??"
                                                itemid="username"
                                                itemvalue={this.state.currentitem.username}
                                                itemtype="text"
                                                itemplaceholder="Kullan??c?? Ad??"
                                                itemchange={this.handleonchange}
                                            />
                                            <InputItem
                                                itemrowspan="4"
                                                itemname="??sim"
                                                itemid="name"
                                                itemvalue={this.state.currentitem.name}
                                                itemtype="text"
                                                itemplaceholder="??sim"
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
                                                itemname="??ehir"
                                                itemid="city"
                                                itemvalue={this.state.currentitem.city}
                                                itemtype="text"
                                                itemplaceholder="??ehir"
                                                itemchange={this.handleonchange}
                                            />
                                            <InputItem
                                                itemrowspan="4"
                                                itemname="??l??e"
                                                itemid="town"
                                                itemvalue={this.state.currentitem.town}
                                                itemtype="text"
                                                itemplaceholder="??l??e"
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
                                            <InputItem
                                                itemrowspan="1"
                                                itemname="??ifre"
                                                itemid="passwordHash"
                                                itemvalue={this.state.currentitem.passwordHash}
                                                itemtype="password"
                                                itemplaceholder="??ifre"
                                                itemchange={this.handleonchange}
                                            />
                                            <InputItem
                                                itemrowspan="1"
                                                itemname="??ifre Yeniden"
                                                itemid="passwordHashre"
                                                itemvalue={this.state.passswordHashConfirm}
                                                itemtype="password"
                                                itemplaceholder="??ifre Yeniden"
                                                itemchange={this.handlechangepassword}
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
                                                    <label style={{ fontSize: "12px" }} className="col-form-label">??stasyonlar</label>
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
                                                itemname="Kullan??c?? Numaras??"
                                                itemid="userID"
                                                itemvalue={this.state.currentitem.userID}
                                                itemtype="number"
                                                itemplaceholder="Kullan??c?? Numaras??"
                                                itemchange={this.handleonchange}
                                            />
                                        </div>
                                        <div className='row d-flex pr-5 justify-content-end align-items-right'>
                                            <button onClick={this.goBack} style={{ minWidth: '150px' }} className="btn btn-dark mr-2">Geri D??n</button>
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
    Users: state.Users,
    Stations: state.Stations,
    Roles: state.Roles,
    Departments: state.Departments
})

const mapDispatchToProps = { CreateUser, GetAllRoles, GetStationByDepartments, GetStationsByUser, GetAllDepartmentsSettings, ClearfilteredStation, GetAllStations }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Create))