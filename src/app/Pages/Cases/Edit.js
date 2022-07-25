import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import InputItem from '../../Components/Common/Forminput'
import "../../../assets/styles/Pages/Create.scss"
import { UpdateCase, GetSelectedCase, ClearSelectedCase } from "../../Redux/actions/CaseActions"
import { GetAllDepartments } from "../../Redux/actions/DepartmentAction"
import Spinner from '../../shared/Spinner'
import Select from 'react-select';
export class Edit extends Component {

    constructor(props) {
        super(props)
        const currentitem = {
            id: 0,
            caseStatus: 0,
            name: "",
            concurrencyStamp: null,
            createdUser: "",
            updatedUser: null,
            deleteUser: null,
            createTime: null,
            updateTime: null,
            deleteTime: null,
            departmentstxt: "",
            departments: [],
            isActive: true
        }
        const selecteddepartments = []
        const departments = []
        this.state = { currentitem, selecteddepartments, departments };
    }

    componentWillUnmount() {
        this.props.ClearSelectedCase()
    }

    handlesubmit = (e) => {
        e.preventDefault()
        let departments = []
        this.state.selecteddepartments.forEach(element => {
            departments.push(this.props.Departments.list.find(station => station.concurrencyStamp === element.value))
        });
        const newdata = { ...this.state.currentitem }
        newdata.departments = departments
        this.setState({ currentitem: newdata }, () => {
            this.props.UpdateCase(this.state.currentitem, this.props.history)
        })
    }

    componentDidMount() {
        this.props.GetSelectedCase(this.props.match.params.CaseId);
        this.props.GetAllDepartments();
    }
    componentDidUpdate() {
        if (this.props.Departments.list.length > 0 &&
            this.state.departments.length === 0 &&
            Object.keys(this.props.Cases.selected_case).length !== 0 &&
            !this.props.Departments.isLoading &&
            !this.props.Cases.isLoading) {

            const prevData = this.props.Cases.selected_case.departments.map((item, index) => {
                return { value: item.concurrencyStamp, label: item.name }
            })

            const list = this.props.Departments.list.map((item, index) => {
                return { value: item.concurrencyStamp, label: item.name }
            })
            this.setState({ departments: list, selecteddepartments: prevData, currentitem: this.props.Cases.selected_case })
        }
    }

    goBack = (e) => {
        e.preventDefault()
        this.props.history.push("/Cases")
    }

    handleonchange = (e) => {
        const newdata = { ...this.state.currentitem }
        newdata[e.target.id] = e.target.value
        this.setState({ currentitem: newdata })
    }

    handleselect = (e) => {
        this.setState({ selecteddepartments: e })
    }

    render() {
        const list = this.state.departments
        const isLoading = (this.props.Departments.isLoading || this.props.Cases.isLoading)
        return (
            <>
                {isLoading ? <Spinner /> :
                    <div className='Page'>
                        <div className="col-12 grid-margin">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Durumlar > Yeni</h4>
                                    <form className="form-sample" onSubmit={this.handlesubmit}>
                                        <div className="row">
                                            <InputItem
                                                itemrowspan="1"
                                                itemname="isim"
                                                itemid="name"
                                                itemvalue={this.state.currentitem.name}
                                                itemtype="text"
                                                itemplaceholder="İsim"
                                                itemchange={this.handleonchange}
                                            />
                                            <InputItem
                                                itemrowspan="1"
                                                itemname="Durum Değeri"
                                                itemid="caseStatus"
                                                itemvalue={this.state.currentitem.caseStatus}
                                                itemtype="number"
                                                itemplaceholder="Durum Değeri"
                                                itemchange={this.handleonchange}
                                            />
                                        </div>
                                        <div className='row'>
                                            <label style={{ fontSize: "12px" }} className="col-form-label">Departmanlar</label>
                                        </div>
                                        <div className='row'>
                                            <div style={{ marginRight: '-5px' }} className='col-12 pr-5 mb-3'>
                                                <Select
                                                    value={this.state.selecteddepartments}
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
    Cases: state.Cases,
    Departments: state.Departments
})

const mapDispatchToProps = { UpdateCase, GetSelectedCase, GetAllDepartments }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Edit))