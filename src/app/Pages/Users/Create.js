import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom';
import cogoToast from 'cogo-toast';
import InputItem from '../../Components/Common/Forminput'
import "../../../assets/styles/Pages/Create.scss"
import { CreateUser } from "../../Redux/actions/UserAction"
import { GetStationByDepartments , GetStationsByUser } from "../../Redux/actions/StationAction"
import { GetAllRoles } from "../../Redux/actions/RoleActions"
import { GetAllDepartments } from "../../Redux/actions/DepartmentAction"
import Spinner from '../../shared/Spinner'
import Select from 'react-select';
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
            stations: []
        }
       
        this.state = { currentitem };
    }

    componentDidMount() {
        this.getData()
    }

    getData = async () => {
      //  await this.props.GetAllStations();
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

    handleselect = (e) => {
        const newdata = { ...this.state.currentitem }
        newdata.stations =e.map((item) => {
            return item.value;
        })
        this.setState({ currentitem:newdata ,selected_stations:e }, () => {
            console.log('selected_stations: ', this.state.selected_stations);
            console.log('currentitem: ', this.state.currentitem);
        })
    }

    postData = async () => {
        this.props.CreateDepartment(this.state.currentitem, this.props.history)
    };

    render() {
        const { isLoading } = this.props.Departments
        const list = this.props.Stations.list.map((item, index) => {
            return { value: item, label: item.name }
        })
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
                                                itemplaceholder="Departman Adı"
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
                                            <div className='col-3 pr-5 mb-3'>
                                                <Select
                                                    value={this.state.currentitem}
                                                    onChange={this.handleselect}
                                                    isMulti={true}
                                                    options={list}
                                                />
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
    Users: state.Users,
    Stations: state.Stations,
    Roles : state.Roles,
    Departments : state.Departments
})

const mapDispatchToProps = { CreateUser,GetAllRoles,GetStationByDepartments, GetStationsByUser ,GetAllDepartments}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Create))