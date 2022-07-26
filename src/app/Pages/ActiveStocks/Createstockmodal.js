import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { CreateStock } from "../../Redux/actions/StockActions"
import { GetAllStations } from "../../Redux/actions/StationAction"
import { GetAllDepartments } from "../../Redux/actions/DepartmentAction"
import { GetAllUnits } from "../../Redux/actions/UnitActions"

import InputItem from '../../Components/Common/Forminput'
import "../../../assets/styles/Pages/Create.scss"
import Spinner from '../../shared/Spinner'
import Select from 'react-select';

export class Createstockmodal extends Component {
    constructor(props) {
        super(props)
        const currentitem = {
            id: 0,
            name: "",
            description: "",
            unitid: "",
            unittxt: "",
            unit: {},
            stationid: "",
            stationtxt: "",
            station: {},
            departmentid: "",
            departmenttxt: "",
            department: {},
            concurrencyStamp: null,
            createdUser: "",
            updatedUser: null,
            deleteUser: null,
            createTime: null,
            updateTime: null,
            deleteTime: null,
            isActive: true,
            departmentstxt: "",
            departments: []
        }
        const stations = []
        const selected_station = {}
        const departments = []
        const selected_department = {}
        const units = []
        const selected_unit = {}
        this.state = { currentitem, stations, selected_station, departments, selected_department, units, selected_unit };

    }

    componentDidMount() {
        this.props.GetAllStations();
        this.props.GetAllDepartments();
        this.props.GetAllUnits();
    }

    componentDidUpdate() {
        if (this.props.Stations.list.length > 0 &&
            this.props.Departments.list.length > 0 &&
            this.props.Units.list.length > 0 &&
            this.state.stations.length === 0 &&
            this.state.departments.length === 0 &&
            this.state.units.length === 0) {
            const stationlist = this.props.Stations.list.map((item, index) => {
                return { value: item.concurrencyStamp, label: item.name }
            })
            const departmentlist = this.props.Departments.list.map((item, index) => {
                return { value: item.concurrencyStamp, label: item.name }
            })
            const unitlist = this.props.Units.list.map((item, index) => {
                return { value: item.concurrencyStamp, label: item.name }
            })
            this.setState({ stations: stationlist, departments: departmentlist, units: unitlist })
        }
    }

    handlesubmit = (e) => {
        e.preventDefault()
        const newdata = { ...this.state.currentitem }
        newdata.unit = this.props.Units.list.find(item => item.concurrencyStamp === this.state.selected_unit.value)
        newdata.department = this.props.Departments.list.find(item => item.concurrencyStamp === this.state.selected_department.value)
        newdata.station = this.props.Stations.list.find(item => item.concurrencyStamp === this.state.selected_station.value)
        this.setState({ currentitem: newdata }, () => {
            this.props.CreateStock(this.state.currentitem, this.props.history)
        })

    }

    goBack = (e) => {
        e.preventDefault()
        this.props.history.push("/Stocks")
    }

    handleonchange = (e) => {
        const newdata = { ...this.state.currentitem }
        newdata[e.target.id] = e.target.value
        this.setState({ currentitem: newdata }, () => {
        })
    }

    handleselectdepartment = (e) => {
        this.setState({ selected_department: e })
    }
    handleselectstation = (e) => {
        this.setState({ selected_station: e })
    }
    handleselectunit = (e) => {
        this.setState({ selected_unit: e })
    }

    render() {
        const isLoading = (this.props.Units.isLoading || this.props.Departments.isLoading || this.props.Stations.isLoading || this.props.Stocks.isLoading)
        const { departments, units, stations, selected_department, selected_unit, selected_station, currentitem } = this.state
        return (
            <Modal
                {...this.props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Ürün Silme
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isLoading ? <Spinner /> :
                        <div className='Page'>
                            <div className="col-12 grid-margin">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Tanımlı Ürünler > Yeni</h4>
                                        <form className="form-sample" >
                                            <div className="row">
                                                <InputItem
                                                    itemrowspan="1"
                                                    itemname="Ürün Adı"
                                                    itemid="name"
                                                    itemvalue={currentitem.name}
                                                    itemtype="text"
                                                    itemplaceholder="Ürün Adı"
                                                    itemchange={this.handleonchange}
                                                />
                                                <div style={{ marginRight: '-5px' }} className='col-6 pr-5 mb-3'>
                                                    <label style={{ fontSize: "12px" }} className="col-form-label">Birim</label>
                                                    <Select
                                                        value={selected_unit}
                                                        onChange={this.handleselectunit}
                                                        options={units}
                                                    />
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <InputItem
                                                    itemrowspan="2"
                                                    itemname="Açıklama"
                                                    itemid="description"
                                                    itemvalue={currentitem.description}
                                                    itemtype="text"
                                                    itemplaceholder="Açıklama"
                                                    itemchange={this.handleonchange}
                                                />
                                            </div>
                                            <div className='row'>
                                                <div style={{ marginRight: '-5px' }} className='col-6 pr-5 mb-3'>
                                                    <label style={{ fontSize: "12px" }} className="col-form-label">İstasyon</label>
                                                    <Select
                                                        value={selected_station}
                                                        onChange={this.handleselectstation}
                                                        options={stations}
                                                    />
                                                </div>
                                                <div style={{ marginRight: '-5px' }} className='col-6 pr-5 mb-3'>
                                                    <label style={{ fontSize: "12px" }} className="col-form-label">Departman</label>
                                                    <Select
                                                        value={selected_department}
                                                        onChange={this.handleselectdepartment}
                                                        options={departments}
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.goBack}>Vazgeç</Button>
                    <Button onClick={this.handlesubmit}>Kaydet</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => ({
    Stocks: state.Stocks,
    Departments: state.Departments,
    Stations: state.Stations,
    Units: state.Units
})

const mapDispatchToProps = { CreateStock, GetAllDepartments, GetAllStations, GetAllUnits }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Createstockmodal))






