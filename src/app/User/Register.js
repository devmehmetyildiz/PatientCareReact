import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import InputItem from "../Components/Common/Authinput"
import ErrorHandler from '../Utils/ErrorHandler';
import Popup from '../Utils/Popup';
import "../../assets/styles/Custom/Login.scss"
export class Register extends Component {
  constructor(props) {
    super(props)
    const currentitem = {
      username: "",
      password: "",
      email: ""
    }
    this.state = { currentitem }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post(process.env.REACT_APP_BACKEND_URL + '/Auth/Register', this.state.currentitem)
      .then(res => {
        Popup("Success", "Kullanıcı Oluşturma", res.data.massage)
        this.props.history.push("/Login")     
      })
      .catch(err => {
        ErrorHandler(err.response,"Kullanıcı Kaydı","Kullanıcı Oluşturuldu.")
      })
  }

  handleChangeInput = (e) => {
    const newdata = { ...this.state.currentitem }
    newdata[e.target.id] = e.target.value
    this.setState({ currentitem: newdata }, () => {
    })
  }

  render() {
    return (
      <div className='loginpage'>
        <div className="d-flex align-items-center auth px-0 h-100">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5 registerformscreen">
                <div className="brand-logo">
                  <img src={require("../../assets/images/Custom/Login/Amblem.png")} alt="logo" />
                </div>
                <h4 className='text-center'>HASTA BAKIM YARDIM UYGULAMASI</h4>
                <h6 className="font-weight-light text-center">Sadece Bir Kaç Adımda Kayıt Ol</h6>
                <form className="pt-3" onSubmit={this.handleSubmit}>
                  <InputItem
                    itemclass="mdi mdi-account-outline text-primary"
                    title="Kullanıcı Adı"
                    itemid="username"
                    itemtype="text" itemholder="Kullanıcı Adı"
                    itemvalue={this.state.currentitem.username || ''}
                    itemchangefunc={this.handleChangeInput}
                  ></InputItem>
                  <InputItem
                    itemclass="mdi mdi-gmail text-primary"
                    title="E-posta"
                    itemid="email"
                    itemtype="mail" itemholder="E-Posta"
                    itemvalue={this.state.currentitem.email || ''}
                    itemchangefunc={this.handleChangeInput}
                  ></InputItem>
                  <InputItem
                    itemclass="mdi mdi-lock-outline text-primary"
                    title="Parola"
                    itemid="password"
                    itemtype="password" itemholder="Parola"
                    itemvalue={this.state.currentitem.password || ''}
                    itemchangefunc={this.handleChangeInput}
                  ></InputItem>
                  <div className="mb-4">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        <i className="input-helper"></i>
                        Kullanım Koşullarını Kabul Ettim
                      </label>
                    </div>
                  </div>
                  <div className="mt-3">
                    <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" >Kayıt Ol</button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    <span>Zaten bir hesabınız var mı?</span> <Link to="/Login" className="text-primary">Giriş Yap</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Register
