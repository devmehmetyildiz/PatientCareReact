import React, { Component } from 'react'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'
import Cookies from 'universal-cookie';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import InputItem from "../Components/Common/Authinput"
import "../../assets/styles/Custom/Login.scss"
import Spinner from "../shared/Spinner"
import ErrorHandler from '../Utils/ErrorHandler';
import {  SetLogin } from '../Redux/actions/loginActions';
import Popup from '../Utils/Popup';
export class Login extends Component {
    constructor(props) {
        super(props)
        const currentitem = {
            username: '',
            password: ''
        }
        const isLoading = false;
        this.state = {
            currentitem,
            isLoading
        }
    }

    handlesubmit = (e) => {
        e.preventDefault();
        this.PostData()

    }
    handleChangeInput = (e) => {
        const newdata = { ...this.state.currentitem }
        newdata[e.target.id] = e.target.value
        this.setState({ currentitem: newdata }, () => {
        })
    }

    PostData = async () => {
        this.props.SetLogin(this.state.currentitem,this.props.history)
    }

    render() {
        const isLoading = this.props.user.isloading;
        return (
            <>
                {
                    isLoading ? <Spinner /> :
                        <div className='loginpage'>
                            <div className="d-flex align-items-stretch auth auth-img-bg h-100">
                                <div className="row flex-grow">
                                    <div className="col-lg-12 d-flex align-items-center justify-content-center">
                                        <div className="auth-form-transparent text-left formscreen">
                                            <div className="brand-logo">
                                                <img src={require("../../assets/images/Custom/Login/Amblem.png")} alt="logo" />
                                                <h3 className="text-center">HASTA BAKIM VE YARDIM</h3>
                                            </div>
                                            <form className="pt-3" onSubmit={this.handlesubmit}>
                                                <InputItem
                                                    itemclass="mdi mdi-account-outline text-primary"
                                                    title="Kullanıcı Adı"
                                                    itemid="username"
                                                    itemtype="text"
                                                    itemholder="Kullanıcı Adı"
                                                    itemvalue={this.state.currentitem.username || ''}
                                                    itemchangefunc={this.handleChangeInput}
                                                ></InputItem>
                                                <InputItem
                                                    itemclass="mdi mdi-lock-outline text-primary"
                                                    title="Parola"
                                                    itemid="password"
                                                    itemtype="password"
                                                    itemholder="Parola"
                                                    itemvalue={this.state.currentitem.password || ''}
                                                    itemchangefunc={this.handleChangeInput}
                                                ></InputItem>
                                                <div className="my-2 d-flex justify-content-between align-items-center">
                                                    <div className="form-check">
                                                        <label className="form-check-label text-muted">
                                                            <input type="checkbox" className="form-check-input" />
                                                            <i className="input-helper"></i>
                                                            Beni Hatırla
                                                        </label>
                                                    </div>
                                                    <a href="!#" onClick={event => event.preventDefault()} className="auth-link text-muted">Şifreyi mi unuttun?</a>
                                                </div>
                                                <div className="my-3">
                                                    <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" >Giriş Yap</button>
                                                </div>
                                                <div className="text-center mt-4 font-weight-light">
                                                    <span>Hesabın Yok mu?</span> <Link to="/User/Register" className="text-primary">Kayıt Ol</Link>
                                                </div>
                                            </form>
                                        </div>
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
    user: state.ActiveUser
})
const mapDispatchToProps = { SetLogin  }
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))