import React, { Component } from 'react'
import { connect } from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { GetAllFiles, GetSelectedFile, OpenDeleteModal, CloseDeleteModal } from '../../Redux/actions/FileActions'
import { withRouter } from 'react-router-dom';
import Spinner from "../../shared/Spinner"
import DeleteModal from "./Delete"

export class Create extends Component {
  constructor(props) {
    super(props)
    const defaultImageSrc = '/img/user.png'
    const initialfieldvalues = {
      id: 0,
      name: "",
      filefolder: ' ',
      filetype: ' ',
      downloadedcount: 0,
      lastdownloadeduser: ' ',
      lastdownloadedip: ' ',
      filepath: defaultImageSrc,
      imageFile: null,
      concurrencyStamp: '',
      createdUser: '',
      updatedUser: '',
      deleteUser: '',
      createTime: "2022-07-12 23:37:05",
      updateTime: "2022-07-12 23:37:05",
      deleteTime: "2022-07-12 23:37:05",
      isActive: false
    }
    const values = initialfieldvalues
    const errors = {}
    this.state = { values, defaultImageSrc, errors }

  }
  handleInputChange = (e) => {
    const { name, value } = e.target
    const newdata = this.state.values
    newdata.name = value
    this.setState({ values: newdata })
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.validate()) {
      const formData = new FormData();
      formData.append('id', this.state.values.id)
      formData.append('name', this.state.values.name)
      formData.append('filefolder', this.state.values.filefolder)
      formData.append('filetype', this.state.values.filetype)
      formData.append('downloadedcount', this.state.values.downloadedcount)
      formData.append('lastdownloadeduser', this.state.values.lastdownloadeduser)
      formData.append('lastdownloadedip', this.state.values.lastdownloadedip)
      formData.append('filepath', this.state.values.filepath)
      formData.append('imageFile', this.state.values.imageFile)
      formData.append('concurrencyStamp', this.state.values.concurrencyStamp)
      formData.append('createdUser', this.state.values.createdUser)
      formData.append('updatedUser', this.state.values.updatedUser)
      formData.append('deleteUser', this.state.values.deleteUser)
      formData.append('createTime', this.state.values.createTime)
      formData.append('updateTime', this.state.values.updateTime)
      formData.append('deleteTime', this.state.values.deleteTime)
      formData.append('isActive', this.state.values.isActive)

    }
  }

  showPreview = e => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0]
      console.log(' e.target.files[0]: ',  e.target.files[0]);
      const reader = new FileReader()
      reader.onload = x => {
        console.log('reader: ', reader);
        const data = this.state.values
        data.imageFile = imageFile
        data.filepath = x.target.result
        this.setState({
          values: data
        })
      }
      reader.readAsDataURL(imageFile)
    } else {
      const data = this.state.values
      data.imageFile = null
      data.filepath = this.state.defaultImageSrc
      this.setState({
        values: data
      })
    }
  }

  validate = () => {
    let temp = {}
    temp.name = this.state.values.name == "" ? false : true
    temp.filepath = this.state.values.filepath == this.state.defaultImageSrc ? false : true
    this.setState({ errors: temp })
    return Object.values(temp).every(x => x == true)
  }

  resetForm = () => {
    this.setState({ values: this.state.initialfieldvalues })
  }

  applyerrorclass = field => ((field in this.state.errors && this.state.errors[field] == false) ? ' invalid-field' : '')


  render() {
    return (
      <>
        <div className='container text-center'>
          <p className='lead'>empoyee form</p>
        </div>
        <div className='card'>
          <div className='card-body'>
            <form onSubmit={this.handleSubmit} autoComplete='off' noValidate>
              <div className='row'>
                <div className='col'>
                  <img style={{ margin: '10px', width: '200px', height: '200px' }} src={this.state.values.filepath} className="card-img-top" />
                  <div className='form-group'>
                    <input className={"form-control-file" + this.applyerrorclass('filepath')} accept='image/*' type="file"
                      onChange={this.showPreview}
                    />
                  </div>
                  <div className='form-group'>
                    <input className={"form-control" + this.applyerrorclass('name')} placeholder=' Name' name='name'
                      value={this.state.values.name}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
                <div className='col ml-4'>
                  <div className='row'>
                    <h4>Dosya Adı</h4>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='form-group text-center ml-10'>
                  <button type='submit' className='btn btn-light'>Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
}
const mapStateToProps = (state) => ({
  Files: state.Files
})

const mapDispatchToProps = { GetAllFiles, GetSelectedFile, OpenDeleteModal, CloseDeleteModal }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Create))
