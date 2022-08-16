import React, { Component } from 'react'
import axios from 'axios';

export default class Create extends Component {
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
      createTime: null,
      updateTime: null,
      deleteTime: null,
      isActive: false
    }
    const values = initialfieldvalues
    const errors = {}
    this.state = { values, defaultImageSrc, errors }

  }
  handleInputChange = (e) => {
    const { name, value } = e.target
    const newdata = { ...this.state.values }
    newdata[name] = value
    this.setState({ values: newdata })
  }
  showPreview = e => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0]
      console.log('e.target.files[0]: ', e.target.files[0]);
      const reader = new FileReader()
      reader.onload = x => {
        const newdata = { ...this.state.values }
        newdata.imageFile = imageFile
        newdata.filepath = x.target.result
        this.setState({ values: newdata })
      }
      reader.readAsDataURL(imageFile)
    } else {
      const newdata = { ...this.state.values }
      newdata.imageFile = null
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
      console.log('this.state.values.imageFile: ', this.state.values.imageFile);
      const formData = new FormData();
      formData.append('name', "");
      formData.append('filefolder', "");
      formData.append('filepath', "");
      formData.append('filetype', "");
      formData.append('downloadedcount', 0);
      formData.append('lastdownloadeduser', "");
      formData.append('lastdownloadedip', "");
      formData.append('file', this.state.values.imageFile,this.state.values.imageFile.name);
      this.addOrEdit(formData)
    }
  }

  employeeAPI = (url = "http://localhost:34891/api/File/Add") => {
    const config = {
      headers: {
      'Content-Type': 'multipart/form-data; boundary=12312312312',
      },
    }
    return {
      fetchAll: () => axios.get(url),
      create: newRecord => axios.post(url, newRecord,config),
      update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
      delete: id => axios.delete(url + id)
    }
  }
  addOrEdit = (formData) => {
    this.employeeAPI().create(formData).then(response => {
      console.log('response: ', response);
      console.log("basarılı")
    }).catch(error => {
      console.log('erroraxios: ', error);
    })
  }

  applyerrorclass = field => ((field in this.state.errors && this.state.errors[field] == false) ? ' invalid-field' : '')


  render() {
    return (
      <>
        <div className='container text-center'>
          <p className='lead'>empoyee form</p>
        </div>
        <form enctype="multipart/form-data" onSubmit={this.handleSubmit} autoComplete='off' noValidate>
          <div className='card'>
            <div className='card-body'>
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
              <div className='form-group text-center'>
                <button type='submit' className='btn btn-light'>Submit</button>
              </div>
            </div>
          </div>
        </form>
      </>
    )
  }
}










