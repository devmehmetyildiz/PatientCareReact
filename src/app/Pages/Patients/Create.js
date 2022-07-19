import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import InputItem from '../../Components/Common/Forminput'
import "../../../assets/styles/Pages/Create.scss"
import { CreatePatient } from "../../Redux/actions/PatientActions"
import { GetAllPatienttype } from "../../Redux/actions/PatienttypeActions"
import Spinner from '../../shared/Spinner'
import Select from 'react-select';
export class Create extends Component {

  constructor(props) {
    super(props)
    const currentitem = {
      id: 0,
      name: "",
      surname: "",
      countryID: "",
      patienttypeid: "",
      patienttypetxt: "",
      patienttype: {},
      concurrencyStamp: null,
      createdUser: "",
      updatedUser: null,
      deleteUser: null,
      createTime: null,
      updateTime: null,
      deleteTime: null,
      isActive: true,
    }
    const patienttypes = []
    const selected_patienttype = []
    this.state = { currentitem, selected_patienttype, patienttypes };

  }

  componentDidMount() {
    this.props.GetAllPatienttype();
  }

  componentDidUpdate() {
    if (this.props.Patienttypes.list.length > 0 && this.state.patienttypes.length === 0) {
      const list = this.props.Patienttypes.list.map((item, index) => {
        return { value: item.concurrencyStamp, label: item.name }
      })
      this.setState({ patienttypes: list })
    }
  }

  handlesubmit = (e) => {
    e.preventDefault()
    const newdata = { ...this.state.currentitem }
    newdata.patienttype = this.props.Patienttypes.list.find(item => item.concurrencyStamp === this.state.selected_patienttype.value)
    this.setState({ currentitem: newdata }, () => {
      this.props.CreatePatient(this.state.currentitem, this.props.history)
    })

  }

  goBack = (e) => {
    e.preventDefault()
    this.props.history.push("/Patients")
  }

  handleonchange = (e) => {
    const newdata = { ...this.state.currentitem }
    newdata[e.target.id] = e.target.value
    this.setState({ currentitem: newdata }, () => {
    })
  }

  handleselect = (e) => {
    this.setState({ selected_patienttype: e })
  }

  render() {
    const  isLoading  = (this.props.Patients.isLoading || this.props.Patienttypes.isLoading)
    const list = this.state.patienttypes
    return (
      <>
        {isLoading ? <Spinner /> :
          <div className='Page'>
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Tanımlı Hastalar > Yeni</h4>
                  <form className="form-sample" onSubmit={this.handlesubmit}>
                    <div className="row">
                      <InputItem
                        itemrowspan="1"
                        itemname="Hasta Adı"
                        itemid="name"
                        itemvalue={this.state.currentitem.name}
                        itemtype="text"
                        itemplaceholder="Hasta Adı"
                        itemchange={this.handleonchange}
                      />
                      <InputItem
                        itemrowspan="1"
                        itemname="Hasta Soyadı"
                        itemid="surname"
                        itemvalue={this.state.currentitem.surname}
                        itemtype="text"
                        itemplaceholder="Hasta Soyadı"
                        itemchange={this.handleonchange}
                      />
                    </div>
                    <div className='row'>
                    <InputItem
                        itemrowspan="3"
                        itemname="Hasta Kimlik Numarası"
                        itemid="countryID"
                        itemvalue={this.state.currentitem.countryID}
                        itemtype="text"
                        itemplaceholder="Kimlik Numarası"
                        itemchange={this.handleonchange}
                      />
                      <div style={{ marginRight: '-5px' }} className='col-8 pr-5 mb-3'>
                      <label style={{ fontSize: "12px" }} className="col-form-label">Hasta Türleri</label>
                        <Select
                          value={this.state.selected_patienttype}
                          onChange={this.handleselect}
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
  Patients: state.Patients,
  Patienttypes: state.Patienttypes
})

const mapDispatchToProps = { CreatePatient, GetAllPatienttype }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Create))