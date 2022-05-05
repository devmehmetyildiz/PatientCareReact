import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios';
import { GetToken } from '../../Utils/TokenValidChecker';
import { setCases, selectedCase, removeselectedCase } from '../../Redux/actions/CaseActions'
import { withRouter,Link } from 'react-router-dom';
import cogoToast from 'cogo-toast';
import InputItem from '../../Components/Common/input'
import "../../../assets/styles/Pages/Create.scss"

export class Create extends Component {

    constructor(props) {
        super(props)
        const currentitem = []
        this.state = { currentitem };

    }

    handlesubmit = () => {

    }

    componentDidMount() {
        //    this.getData()
    }

    getData = async () => {
        const response = await axios({
            method: 'get',
            data: this.state.currentitem,
            url: process.env.REACT_APP_BACKEND_URL + '/Case/GetAll',
            headers: { Authorization: `Bearer ${GetToken()}` }
        }).catch(error => {
            if (error.response !== undefined) {
                if (error.response.status === '401') {
                    this.props.history.push("/User/login")
                }
            } else {
                cogoToast.error('Veri Alınırken Hata Alındı', this.toastoptions)
                this.props.history.push("/Login")
            }
        })
        if (response !== undefined) {
            console.log('response: ', response);
            this.props.setCases(response.data);
            this.setState({ currentitem: this.props.setCases.cases })
        }
    };

    render() {
        return (
            <div className='Page'>
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
                                   
                                    ></InputItem>
                                    <InputItem
                                        itemclass="mdi mdi-lock-outline text-primary"
                                        title="Parola"
                                        itemid="password"
                                        itemtype="password"
                                        itemholder="Parola"
                                  
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
        )
    }
}

const mapStateToProps = (state) => ({
 
})

const mapDispatchToProps = {  }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Create))