import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import cogoToast from 'cogo-toast';
import { connect } from 'react-redux'
import { setUser } from '../Redux/actions/loginActions'
import { withRouter } from 'react-router-dom';
import InputItem from "../Components/Common/input"
import "../../assets/styles/Custom/Login.scss"
import "../../assets/styles/Custom/input.css"
export class Login extends Component {
    constructor(props) {
        super(props)

        const currentitem = {
            username: '',
            password: ''
        }
        this.state = {
            currentitem
        }
    }

    toastoptions = {
        hideAfter: 5,
        position: 'top-right',
        heading: 'Kullanıcı Girişi'
    }

    Get_User = async () => {
        const response = await axios({
            method: 'post',
            data: this.state.currentitem,
            url: process.env.REACT_APP_BACKEND_URL + '/User/GetUser',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }).catch(error => {
            if (error.response != undefined) {
                if (error.response.status == '401') {
                    cogoToast.error('Veri Alınırken Hata Alındı', this.toastoptions)
                    this.props.history.push("/Login")
                }
            } else {
                cogoToast.error('Veri Alınırken Hata Alındı', this.toastoptions)
                this.props.history.push("/Login")
            }
        })
        if (response != undefined) {
            localStorage.setItem('currentUser', JSON.stringify(response.data))
            this.props.setUser(response.data);
            this.props.history.push("/dashboard")
        }

    };
    handlesubmit = (e) => {
        e.preventDefault();
        console.log('this.state.currentitem: ', this.state.currentitem);
        axios.post(process.env.REACT_APP_BACKEND_URL + '/Login', this.state.currentitem)
            .then(res => {
                localStorage.setItem('token', res.data)
                this.Get_User();
            })
            .catch(err => {
                console.log('err: ', err);
                if (err.response != undefined)
                    cogoToast.error('Giriş Yapılırken Hata oluştu : ' + err.response.data, this.toastoptions)
                else
                    cogoToast.error('Giriş Yapılamadı', this.toastoptions)
            })
    }
    handleChangeInput = (e) => {
        const newdata = { ...this.state.currentitem }
        newdata[e.target.id] = e.target.value
        console.log('newdata: ', newdata);
        this.setState({ currentitem: newdata }, () => {
        })
    }


    render() {
        return (
            <div className='loginpage'>
                <div className="d-flex align-items-stretch auth auth-img-bg h-100">
                    <div className="row flex-grow">
                        <div className="col-lg-12 d-flex align-items-center justify-content-center">
                            <div className="auth-form-transparent text-left formscreen">
                                <div className="brand-logo">
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
                                        title="Şifre"
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
                                                Beni Giriş Yapılı Tut
                                            </label>
                                        </div>
                                        <a href="!#" onClick={event => event.preventDefault()} className="auth-link text-muted">Şifreyi Unuttum?</a>
                                    </div>
                                    <div className="my-3">
                                        <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" >Giriş Yap</button>
                                    </div>
                                    <div className="text-center mt-4 font-weight-light">
                                        <span>Hesabın Yok mu?</span> <Link to="/Register" className="text-primary">Kayıt Ol</Link>
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
const mapStateToProps = (state) => ({
    user: state.user
})
const mapDispatchToProps = { setUser }
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))