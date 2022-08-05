import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import InputItem from '../../Components/Common/Forminput'
import "../../../assets/styles/Pages/Create.scss"
import { UpdateActivestock, GetSelectedActivestock, ClearSelectedActivestock } from "../../Redux/actions/Activestock"
import { GetAllStocks } from "../../Redux/actions/StockActions"
import Spinner from '../../shared/Spinner'
import Select from 'react-select';
export class Edit extends Component {

    constructor(props) {
        super(props)
        const currentitem = {
            id: 0,
            stockid: "",
            stockname: "",
            stock: {},
            departmentid: "",
            departmentname: "",
            department: {},
            skt: "",
            barcodeno: "",
            amount: "",
            purchaseprice: 0,
            purchasedate: null,
            info: "",
            concurrencyStamp: null,
            createdUser: "",
            updatedUser: null,
            deleteUser: null,
            createTime: null,
            updateTime: null,
            deleteTime: null,
            isActive: true,
        }
        const selectedstock = {}
        const stocks = []
        const dataFetched = false
        this.state = { currentitem, selectedstock, stocks, dataFetched };
    }

    componentWillUnmount() {
        this.props.ClearSelectedActivestock()
    }

    handlesubmit = (e) => {
        e.preventDefault()
        const newdata = { ...this.state.currentitem }
        newdata.stock = this.props.Stocks.list.find(item => item.concurrencyStamp === this.state.selectedstock.value)
        this.setState({ currentitem: newdata }, () => {
            this.props.UpdateActivestock(this.state.currentitem, this.props.history)
        })
    }

    componentDidMount() {
        this.props.GetSelectedActivestock(this.props.match.params.ActivestockId);
        this.props.GetAllStocks();
    }
    componentDidUpdate() {
        if (this.props.Stocks.list.length > 0 &&
            this.state.stocks.length === 0 &&
            this.props.Activestocks.selected_activestock.id !== 0 &&
            !this.props.Activestocks.isLoading &&
            !this.props.Stocks.isLoading &&
            !this.state.dataFetched
        ) {
            const currentvalue = this.props.Activestocks.selected_activestock
            currentvalue.skt = currentvalue.skt.toISOString().split('T')[0]
            console.log('currentvalue: ', currentvalue);
            const prevData = {
                value: this.props.Activestocks.selected_activestock.stock.concurrencyStamp,
                label: this.props.Activestocks.selected_activestock.stock.name
            }

            const list = this.props.Stocks.list.map((item, index) => {
                return { value: item.concurrencyStamp, label: item.name }
            })
            this.setState({ stocks: list, selectedstock: prevData, currentitem:currentvalue , dataFetched: true })
        }
    }

    goBack = (e) => {
        e.preventDefault()
        this.props.history.push("/Activestocks")
    }

    handleonchange = (e) => {
        const newdata = { ...this.state.currentitem }
        newdata[e.target.id] = e.target.value
        this.setState({ currentitem: newdata })
    }

    handleselectstock = (e) => {
        this.setState({ selectedstock: e })
    }

    render() {
        const list = this.state.stocks
        const isLoading = (this.props.Activestocks.isLoading || this.props.Stocks.isLoading)
        return (
            <>
                {isLoading ? <Spinner /> :
                    <div className='Page'>
                        <div className="col-12 grid-margin">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Ürün Girişi > Güncelle</h4>
                                    <form className="form-sample" >
                                        <div className='row'>
                                            <label style={{ fontSize: "12px" }} className="pr-5 col-form-label">Tanımlı Ürün</label>
                                        </div>
                                        <div className='row'>
                                            <div style={{ marginRight: '-5px' }} className='col-12 pr-5 mb-3'>
                                                <Select
                                                    value={this.state.selectedstock}
                                                    onChange={this.handleselectstock}
                                                    options={list}
                                                    placeholder="Tanımlı Ürün"
                                                />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className="col-6 pr-5">
                                                <label style={{ fontSize: "12px" }} className="col-form-label">SKT</label>
                                                <input
                                                    id='skt'
                                                    type="date"
                                                    className="form-control"
                                                    placeholder="SKT"
                                                    value={this.state.currentitem.skt}
                                                    onChange={this.handleonchange}
                                                />
                                            </div>
                                            <div className="col-6 pr-5">
                                                <label style={{ fontSize: "12px" }} className="col-form-label">Barkod No</label>
                                                <input
                                                    id='barcodeno'
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="BARKOD"
                                                    value={this.state.currentitem.barcodeno}
                                                    onChange={this.handleonchange}
                                                />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className="col-6 pr-5">
                                                <label style={{ fontSize: "12px" }} className="col-form-label">Adet</label>
                                                <input
                                                    id='amount'
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="ADET"
                                                    value={this.state.currentitem.amount}
                                                    onChange={this.handleonchange}
                                                />
                                            </div>
                                            <div className="col-6 pr-5">
                                                <label style={{ fontSize: "12px" }} className="col-form-label">Açıklama</label>
                                                <input
                                                    id='info'
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Açıklama"
                                                    value={this.state.currentitem.info}
                                                    onChange={this.handleonchange}
                                                />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className="col-6 pr-5">
                                                <label style={{ fontSize: "12px" }} className="col-form-label">Satın Alma Tarihi</label>
                                                <input
                                                    id='purchasedate'
                                                    type="date"
                                                    className="form-control"
                                                    placeholder="Satın Alma Tarihi"
                                                    value={this.state.currentitem.purchasedate}
                                                    onChange={this.handleonchange}
                                                />
                                            </div>
                                            <div className="col-6 pr-5">
                                                <label style={{ fontSize: "12px" }} className="col-form-label">Tutar</label>
                                                <input
                                                    id='purchaseprice'
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Tutar"
                                                    value={this.state.currentitem.purchaseprice}
                                                    onChange={this.handleonchange}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className='row d-flex pr-5 justify-content-end align-items-right'>
                            <button onClick={this.goBack} style={{ minWidth: '150px' }} className="btn btn-dark mr-2">Geri Dön</button>
                            <button onClick={this.handlesubmit} style={{ minWidth: '150px' }} className="btn btn-primary mr-2">Güncelle</button>
                        </div>
                    </div>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    Activestocks: state.Activestocks,
    Stocks: state.Stocks
})

const mapDispatchToProps = { UpdateActivestock, GetSelectedActivestock, ClearSelectedActivestock, GetAllStocks }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Edit))