import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import InputItem from '../../Components/Common/Forminput'
import "../../../assets/styles/Pages/Create.scss"
import { CreateDepartment } from "../../Redux/actions/DepartmentAction"
import { GetAllStations } from "../../Redux/actions/StationAction"
import Spinner from '../../shared/Spinner'
import Select from 'react-select';
export class Create extends Component {

    constructor(props) {
        super(props)
        const currentitem = {
            Id: 0,
            Name: "",
            ishavepatients: false,
            ConcurrencyStamp: null,
            CreatedUser: "",
            UpdatedUser: null,
            DeleteUser: null,
            CreateTime: null,
            UpdateTime: null,
            DeleteTime: null,
            IsActive: true,
            Stations: []
        }
        const stations = []
        const selected_stations = []
        this.state = { currentitem, selected_stations, stations };

    }

    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        await this.props.GetAllStations();
    }

    componentDidUpdate() {
        if (this.props.Stations.list.length > 0 && this.state.stations.length === 0) {
            const list = this.props.Stations.list.map((item, index) => {
                return { value: item.concurrencyStamp, label: item.name }
            })
            this.setState({ stations: list })
        }
    }

    handlesubmit = (e) => {
        e.preventDefault()
        let stations = []
        this.state.selected_stations.forEach(element => {
            stations.push(this.props.Stations.list.find(station => station.concurrencyStamp === element.value))
        });
        const newdata = { ...this.state.currentitem }
        newdata.Stations = stations
        this.setState({ currentitem: newdata }, () => {
            this.props.CreateDepartment(this.state.currentitem, this.props.history)
        })

    }

    handleonpatienthange = (e) => {
        const data = this.state.currentitem
        data.ishavepatients = e.target.value
        this.setState({ currentitem: data })
    };

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
        this.setState({ selected_stations: e })
    }

    render() {
        const { isLoading } = this.props.Departments
        const list = this.state.stations
        return (
            <>
                {isLoading ? <Spinner /> :
                    <div className='Page'>
                        <div className="col-12 grid-margin">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Departman > Yeni</h4>
                                    <form className="form-sample" onSubmit={this.handlesubmit}>
                                        <div className="row">
                                            <InputItem
                                                itemrowspan="2"
                                                itemname="Departman Adı"
                                                itemid="Name"
                                                itemvalue={this.state.currentitem.Name}
                                                itemtype="text"
                                                itemplaceholder="Departman Adı"
                                                itemchange={this.handleonchange}
                                            />
                                        </div>
                                        <div className='row'>
                                            <label style={{ fontSize: "12px" }} className="col-form-label">İstasyonlar</label>
                                        </div>
                                        <div className='row'>
                                            <div style={{ marginRight: '-5px' }} className='col-12 pr-5 mb-3'>
                                                <Select
                                                    value={this.state.selected_stations}
                                                    onChange={this.handleselect}
                                                    isMulti={true}
                                                    options={list}
                                                />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className="form-check">
                                                <label className="form-check-label">
                                                    <input
                                                        onChange={(e) => {
                                                            this.handleonpatienthange({
                                                                target: {
                                                                    name: this.state.currentitem.ishavepatients,
                                                                    value: e.target.checked,
                                                                },
                                                            });
                                                        }}
                                                        type="checkbox" className="form-check-input" name="ishavepatients" value={this.state.currentitem.ishavepatients} />
                                                    <i className="input-helper"></i>
                                                    Hastalar tutulacak mı?
                                                </label>
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
                    </div >
                }
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    Departments: state.Departments,
    Stations: state.Stations
})

const mapDispatchToProps = { CreateDepartment, GetAllStations }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Create))