import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import InputItem from '../../Components/Common/Forminput'
import "../../../assets/styles/Pages/Create.scss"
import { UpdateFile, GetSelectedFile } from "../../Redux/actions/FileActions"
import Spinner from '../../shared/Spinner'
import Select from 'react-select';
import { GetToken } from '../../Utils/TokenValidChecker';
import { ROUTES } from '../../Utils/Constants';
import axios from 'axios';

export class Edit extends Component {
  constructor(props) {
    super(props)
    const defaultImageSrc = '/img/user.png'

    const initialfieldvalues = {
      id: 0,
      name: "",
      filename: '',
      filefolder: ' ',
      filetype: ' ',
      downloadedcount: 0,
      lastdownloadeduser: ' ',
      lastdownloadedip: ' ',
      filepath: defaultImageSrc,
      file: null,
      concurrencyStamp: '',
      createdUser: '',
      updatedUser: '',
      deleteUser: '',
      createTime: null,
      updateTime: null,
      deleteTime: null,
      isActive: false
    }
    const values = initialfieldvalues
    const errors = {}
    const isDataFetched = false
    const fileimg = {}
    this.state = { values, defaultImageSrc, errors, fileimg }
  }
  handleInputChange = (e) => {
    const { name, value } = e.target
    const newdata = { ...this.state.values }
    newdata[name] = value
    this.setState({ values: newdata })
  }
  showPreview = e => {
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = x => {
        const newdata = { ...this.state.values }
        newdata.file = file
        newdata.filepath = x.target.result
        this.setState({ values: newdata })
      }
      reader.readAsDataURL(file)
    } else {
      const newdata = { ...this.state.values }
      newdata.file = null
      newdata.filepath = this.state.defaultImageSrc
      this.setState({ values: newdata })
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
  handleSubmit = e => {
    e.preventDefault()
    if (this.validate()) {
      const formData = new FormData();
      formData.append('id', this.state.values.id);
      formData.append('name', this.state.values.name);
      formData.append('filefolder', this.state.values.filefolder);
      formData.append('filetype', this.state.values.filetype);
      formData.append('downloadedcount', this.state.values.downloadedcount);
      formData.append('lastdownloadeduser', this.state.values.lastdownloadeduser);
      formData.append('lastdownloadedip', this.state.values.lastdownloadedip);
      formData.append('file', this.state.values.file);
      formData.append('concurrencyStamp', this.state.values.concurrencyStamp);
      formData.append('createdUser', this.state.values.createdUser);
      formData.append('updatedUser', this.state.values.updatedUser);
      formData.append('deleteUser', this.state.values.deleteUser);
      formData.append('isActive', this.state.values.isActive);
      this.props.UpdateFile(formData, this.props.history)
    }
  }

  componentDidMount() {
    this.props.GetSelectedFile(this.props.match.params.FileId);

  }

  goBack = (e) => {
    e.preventDefault()
    this.props.history.push("/Files")
}

  componentDidUpdate() {
    if (
      this.props.Files.selected_file.id !== 0 &&
      !this.props.Files.isLoading &&
      !this.state.dataFetched
    ) {
      this.setState({ values: this.props.Files.selected_file, dataFetched: true }, () => {
        axios
          .get(process.env.REACT_APP_BACKEND_URL + `/${ROUTES.FILE}/GetFile?ID=${this.state.values.concurrencyStamp}`, {
            headers: { Authorization: `Bearer ${GetToken()}` },
            responseType: "arraybuffer",
          })
          .then((response) => {
            console.log('response: ', response);
            let data = `data:${response.headers["content-type"]
              };base64,${new Buffer(response.data, "binary").toString("base64")}`;
            const newdata = this.state.values
            newdata.filepath = data
            this.setState({ values: newdata })
          })
      })
    }
  }

  applyerrorclass = field => ((field in this.state.errors && this.state.errors[field] == false) ? ' invalid-field' : '')

  render() {
    const isLoading = this.props.Files.isLoading
    return (
      <>
        {isLoading ? <Spinner /> :
          <>
            <div className='Page'>
              <div className="col-12 grid-margin">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Dosya Yükleme Erkanı</h4>
                    <form onSubmit={this.handleSubmit} autoComplete='off' noValidate>
                      <div className='row'>
                        <div className='col'>
                          <img style={{ objectFit: 'contain', margin: '10px', width: '200px', height: '200px' }} src={this.state.values.filepath} className="card-img-top" />
                          <div className='form-group'>
                            <input className={"form-control-file" + this.applyerrorclass('filepath')}  type="file"
                              onChange={this.showPreview}
                            />
                          </div>
                          <div className='form-group'>
                            <label>Dosya Adı</label>
                            <input className={"form-control" + this.applyerrorclass('name')} placeholder=' Name' name='name'
                              value={this.state.values.name}
                              onChange={this.handleInputChange}
                            />
                          </div>
                          <div className='row d-flex pr-5 justify-content-end align-items-right'>
                            <button onClick={this.goBack} style={{ minWidth: '150px' }} className="btn btn-dark mr-2">Geri Dön</button>
                            <button type="submit" style={{ minWidth: '150px' }} className="btn btn-primary mr-2">Ekle</button>
                          </div>
                        </div>
                        <div className='col mr-5'>
                          <div className='card' style={{ backgroundColor: '#3e3e3f' }}>
                            <div className='card-body'>
                              <div className='row'>
                                <label>Dosya Adı : {this.state.values.name}</label>
                              </div>
                              <div className='row'>
                                <label>İndirilme Sayısı : {this.state.values.downloadedcount}</label>
                              </div>
                              <div className='row'>
                                <label>En Son İndiren Kullanıcı: {this.state.values.lastdownloadeduser}</label>
                              </div>
                              <div className='row'>
                                <label>En Son İndiren ip Adresi: {this.state.values.lastdownloadedip}</label>
                              </div>
                              <div className='row'>
                                <label>En Son İndiren ip Adresi: {this.state.values.lastdownloadedip}</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      </>
    )
  }
}
const mapStateToProps = (state) => ({
  Files: state.Files,
})

const mapDispatchToProps = { UpdateFile, GetSelectedFile }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Edit))