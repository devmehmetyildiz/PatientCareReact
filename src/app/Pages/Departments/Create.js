import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom';
import cogoToast from 'cogo-toast';
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
        const selected_stations = []
        this.state = { currentitem, selected_stations };
    }

    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        await this.props.GetAllStations();
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
    Departments: state.Departments,
    Stations: state.Stations
})

const mapDispatchToProps = { CreateDepartment, GetAllStations }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Create))