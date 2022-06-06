import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom';
import cogoToast from 'cogo-toast';
import InputItem from '../../Components/Common/Forminput'
import "../../../assets/styles/Pages/Create.scss"
import { UpdateDepartment, GetSelectedDepartment } from "../../Redux/actions/DepartmentAction"
import { GetAllStations } from "../../Redux/actions/StationAction"
import Spinner from '../../shared/Spinner'
import Select from 'react-select';

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
            stations: []
        }
        const pagestatus = false
        const selected_stations = []
        const all_stations = []
        this.state = { currentitem, selected_stations ,all_stations};
    }

    componentDidMount() {
        this.GetData()
    }

    GetData = async () => {
        await this.props.GetSelectedDepartment(this.props.match.params.DepartmentId);
        await this.props.GetAllStations();
        const prevData = this.props.Departments.selected_department.stations.map((item, index) => {
            return { value: item, label: item.name }
        })
        const stations = this.props.Stations.list.map((item, index) => {
         if(!this.props.Departments.selected_department.stations.includes(item)){
            return { value: item, label: item.name }
        }})
        console.log('stations: ', stations);
        this.setState({ currentitem: this.props.Departments.selected_department, selected_stations: prevData, all_stations: stations })
        console.log(this.state.currentitem)
    }

    handlesubmit = (e) => {
        e.preventDefault()
        this.postData();
    }

    goBack = (e) => {
        e.preventDefault()
        this.props.history.push("/Departments")
    }

    handleonchange = (e) => {
        const newdata = { ...this.state.currentitem }
        newdata[e.target.id] = e.target.value
        this.setState({ currentitem: newdata }, () => {
        })
    }

    handleselect = (e) => {
        const newdata = { ...this.state.currentitem }
        newdata.stations = e.map((item) => {
            return item.value;
        })
        this.setState({ currentitem: newdata, selected_stations: e }, () => {
        })
    }

    postData = async () => {
        this.props.UpdateDepartment(this.state.currentitem, this.props.history)
    };

    render() {
        const { isLoading } = this.props.Departments
       /*  const list = this.props.Stations.list.map((item, index) => {
            if (this.state.selected_stationguids.includes(item.ConcurrencyStamp)) {
             
            }
            else {
                return  { value: item, label: item.name }
            }
            return { value: item, label: item.name }
        }) */
        const list = this.state.all_stations
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
                                            <div className='col-12 pr-5 mb-3'>
                                                <Select
                                                    value={this.state.selected_stations}
                                                    onChange={this.handleselect}
                                                    isMulti={true}
                                                    options={list}
                                                />
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
    Stations: state.Stations,
    Departments: state.Departments
})

const mapDispatchToProps = { UpdateDepartment, GetAllStations, GetSelectedDepartment }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Edit))