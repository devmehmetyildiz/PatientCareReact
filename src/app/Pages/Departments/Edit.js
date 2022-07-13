import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import InputItem from '../../Components/Common/Forminput'
import "../../../assets/styles/Pages/Create.scss"
import { UpdateDepartment, GetSelectedDepartment,ClearSelectedDepartment } from "../../Redux/actions/DepartmentAction"
import { GetAllStations } from "../../Redux/actions/StationAction"
import Spinner from '../../shared/Spinner'
import Select from 'react-select';

export class Edit extends Component {

    constructor(props) {
        super(props)
        const currentitem = {
            id: 0,
            name: "",
            createdUser: "",
            updatedUser: null,
            deleteUser: null,
            createTime: null,
            updateTime: null,
            deleteTime: null,
            isActive: true,
            stations: []
        }
        const stations = []
        const selected_stations = []
        this.state = { currentitem, selected_stations, stations };
    }

    componentDidMount() {
        this.GetData()
    }

    GetData = async () => {
        await this.props.GetSelectedDepartment(this.props.match.params.DepartmentId);
        await this.props.GetAllStations();
    }

    componentWillUnmount() {
        this.props.ClearSelectedDepartment()
    }

    componentDidUpdate() {
        if (this.props.Stations.list.length > 0 &&
            this.state.stations.length === 0 &&
            Object.keys(this.props.Departments.selected_department).length !== 0 &&
            !this.props.Departments.isLoading) {
            const prevData = this.props.Departments.selected_department.stations.map((item, index) => {
                return { value: item.concurrencyStamp, label: item.name }
            })

            const list = this.props.Stations.list.map((item, index) => {
                return { value: item.concurrencyStamp, label: item.name }
            })

            this.setState({ stations: list, selected_stations: prevData, currentitem: this.props.Departments.selected_department }, () => {
                console.log('currentitem: ', this.state.currentitem);

            })
        }
    }

    handlesubmit = (e) => {
        e.preventDefault()
        let stations = []
        this.state.selected_stations.forEach(element => {
            stations.push(this.props.Stations.list.find(station => station.concurrencyStamp===element.value))
        });
        const newdata = { ...this.state.currentitem }
        newdata.stations = stations
        this.setState({ currentitem: newdata }, () => {
            this.props.UpdateDepartment(this.state.currentitem, this.props.history)
        })
       
    }

    goBack = (e) => {
        e.preventDefault()
        this.props.history.push("/Departments")
    }

    handlechange = (e) => {
        const newdata = { ...this.state.currentitem }
        newdata[e.target.id] = e.target.value
        this.setState({ currentitem: newdata }, () => {
        })
    }

    handleselect = (e) => {
        this.setState({ selected_stations: e })
    }

    render() {
        const { isLoading } = this.props.Departments
        const { selected_stations } = this.state
        const list = this.props.Stations.list.map((item, index) => {
            return { value: item.concurrencyStamp, label: item.name }
        })
        return (
            <>
                {isLoading ? <Spinner /> :
                    <div className='Page'>
                        <div className="col-12 grid-margin">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Departmanlar > Güncelle</h4>
                                    <form className="form-sample" onSubmit={this.handlesubmit}>
                                        <div className="row">
                                            <InputItem
                                                itemrowspan="2"
                                                itemname="Departman Adı"
                                                itemid="name"
                                                itemvalue={this.state.currentitem.name}
                                                itemtype="text"
                                                itemplaceholder="Departman Adı"
                                                itemchange={this.handlechange}
                                            />
                                        </div>
                                        <div className='row'>
                                            <div className='col-12 pr-5 mb-3'>
                                                <Select
                                                    value={selected_stations}
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

const mapDispatchToProps = { UpdateDepartment, GetAllStations, GetSelectedDepartment,ClearSelectedDepartment }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Edit))