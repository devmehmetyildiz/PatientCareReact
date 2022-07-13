import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import InputItem from '../../Components/Common/Forminput'
import "../../../assets/styles/Pages/Create.scss"
import { EditUser, ClearSelectedUser, GetSelectedUser } from "../../Redux/actions/UserAction"
import { GetStationByDepartments, GetStationsByUser, ClearfilteredStation, GetAllStations } from "../../Redux/actions/StationAction"
import { GetAllRoles } from "../../Redux/actions/RoleActions"
import { GetAllDepartments } from "../../Redux/actions/DepartmentAction"
import Spinner from '../../shared/Spinner'
import Select from 'react-select';
import { Form } from 'react-bootstrap'
export class Edit extends Component {

    constructor(props) {
        super(props)
        const currentitem = {
            id: 0,
            name: "",
            normalizedName: null,
            concurrencyStamp: null,
            createdUser: "",
            updatedUser: null,
            deleteUser: null,
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
        const passswordHashConfirm = ""
        const { selected_stations, selected_departments, selected_roles } = []
        this.state = { currentitem, selected_departments, selected_stations, selected_roles, language, passswordHashConfirm };
    }

    componentDidMount() {
        this.getData()
    }

    componentWillUnmount() {
        this.props.ClearSelectedUser()
    }

    getData = async () => {
        await this.props.GetAllDepartments();
        await this.props.GetAllRoles();
        await this.props.GetAllStations();
        await this.props.ClearfilteredStation();
        await this.props.GetSelectedUser()
    }

    handlesubmit = (e) => {
        e.preventDefault()
        this.postData();
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
        const newdata = { ...this.state.currentitem }
        newdata.stations = (e || []).map((item) => {
            return this.props.Stations.list.find(station => station.concurrencyStamp === item.value);
        })
        this.setState({ currentitem: newdata, selected_stations: e }, () => {
        })
    }

    handleselectdepartments = (e) => {
        let stations = this.state.selected_stations
        const newdata = { ...this.state.currentitem }
        newdata.departments = (e || []).map((item) => {
            return this.props.Departments.list.find(department => department.concurrencyStamp === item.value);
        })
        const departments = (e || []).map((item) => {
            return item.value
        })
        if (e === null) {
            this.props.ClearfilteredStation()
            newdata.stations = []
            stations = []
        } else {
            this.props.GetStationByDepartments(departments);
            stations = []
        }
        this.setState({ currentitem: newdata, selected_departments: e, selected_stations: stations }, () => {
        })
    }

    handleselectroles = (e) => {
        const newdata = { ...this.state.currentitem }
        newdata.roles = (e || []).map((item) => {
            return this.props.Roles.list.find(role => role.concurrencyStamp === item.value);
        })
        this.setState({ currentitem: newdata, selected_roles: e }, () => {
        })
    }

    handleselectLanguage = (e) => {
        const newdata = { ...this.state.currentitem }
        newdata.language = (e || {}).value
        this.setState({ currentitem: newdata }, () => {
        })
    }

    postData = async () => {
       // this.props.createdUser(this.state.currentitem, this.props.history)
    };

    render() {
        const { isLoading } = this.props.Users
        const Departments = this.props.Departments.list.map((item, index) => {
            return { value: item.concurrencyStamp, label: item.name }
        })
        const Stations = this.props.Stations.filtered_stations.map((item, index) => {
            return { value: item.concurrencyStamp, label: item.name }
        })
        const Roles = this.props.Roles.list.map((item, index) => {
            return { value: item.concurrencyStamp, label: item.name }
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
                                                itemid="phonenumber"
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
                                            <InputItem
                                                itemrowspan="1"
                                                itemname="Şifre"
                                                itemid="passwordHash"
                                                itemvalue={this.state.currentitem.passwordHash}
                                                itemtype="password"
                                                itemplaceholder="Şifre"
                                                itemchange={this.handleonchange}
                                            />
                                            <InputItem
                                                itemrowspan="1"
                                                itemname="Şifre Yeniden"
                                                itemid="passwordHash"
                                                itemvalue={this.state.passswordHashConfirm}
                                                itemtype="password"
                                                itemplaceholder="Şifre Yeniden"
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
                                                            value={this.state.currentitem.language}
                                                            onChange={this.handleselectLanguage}
                                                            isMulti={true}
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
                                                itemtype="text"
                                                itemplaceholder="Kullanıcı Numarası"
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

const mapDispatchToProps = { GetAllRoles, GetStationByDepartments, GetStationsByUser, GetAllDepartments, ClearfilteredStation, GetAllStations, EditUser, ClearSelectedUser, GetSelectedUser }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Edit))