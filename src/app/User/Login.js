import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import InputItem from "../Components/Common/Forminput"
import Spinner from "../shared/Spinner"
import { SetLogin } from '../Redux/actions/loginActions';
import { Button, Form } from 'react-bootstrap';
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
        this.props.SetLogin(this.state.currentitem, this.props.history)
    }

    render() {
        const isLoading = this.props.user.isloading;
        return (
            <>
                {
                    isLoading ? <Spinner /> :
                        <div>
                            <div className="d-flex align-items-center auth px-0">
                                <div className="row w-100 mx-0">
                                    <div className="col-lg-4 mx-auto">
                                        <div className="card text-left py-5 px-4 px-sm-5">
                                            <div className="brand-logo">
                                                <img src={require("../../assets/images/logo.svg")} alt="logo" />
                                            </div>
                                            <h4>Patient Care Hasta Bakım Yardım Uygulaması</h4>
                                            <h6 className="font-weight-light">Devam Etmek için Giriş Yapın.</h6>
                                            <Form className="pt-3">
                                                <div className='row'>
                                                    <InputItem
                                                        itemrowspan="2"
                                                        itemname="Kullanıcı Adı"
                                                        itemid="username"
                                                        itemvalue={this.state.currentitem.username}
                                                        itemtype="text"
                                                        itemplaceholder="Kullanıcı Adı"
                                                        itemchange={this.handleChangeInput}
                                                    />
                                                </div>
                                                <div className='row'>
                                                    <InputItem
                                                        itemrowspan="2"
                                                        itemname="Şifre"
                                                        itemid="password"
                                                        itemvalue={this.state.currentitem.password}
                                                        itemtype="password"
                                                        itemplaceholder="Şifre"
                                                        itemchange={this.handleChangeInput}
                                                    />
                                                </div>
                                                <div className="mt-3 col-12 pr-5">
                                                    <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={this.handlesubmit}>Giriş Yap</button>
                                                </div>
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
                                            </Form>
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
const mapDispatchToProps = { SetLogin }
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))