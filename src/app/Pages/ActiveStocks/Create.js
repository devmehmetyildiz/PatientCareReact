import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import InputItem from '../../Components/Common/Forminput'
import "../../../assets/styles/Pages/Create.scss"
import { CreateActivestock, CreateActivestocks, OpenStockModal, CloseStockModal, UpdateDetails } from "../../Redux/actions/Activestock"
import { GetAllDepartments } from "../../Redux/actions/DepartmentAction"
import { GetAllStocks } from '../../Redux/actions/StockActions';
import Spinner from '../../shared/Spinner'
import Select from 'react-select';
import Createstockmodal from './Createstockmodal';
import { OverlayTrigger, Button, Tooltip } from 'react-bootstrap';


export class Create extends Component {

    constructor(props) {
        super(props)
        const currentitem =[]
        const details = [{ id: 1, skt: '', barcodeno: '', amount: 1 }]
        const selecteddepartments = []
        const departments = []
        const stocks = []
        const selectedstock = {}
        const dataFetched = false
        this.state = { currentitem, selecteddepartments, departments, stocks, selectedstock, dataFetched, details };
    }

    handlesubmit = (e) => {
        e.preventDefault()
        const item = []
        const details = this.props.Activestocks.details
        details.forEach(element => {
            item.push({
                stock: this.props.Stocks.list.find(item => item.concurrencyStamp === this.state.selectedstock.value),
                skt: element.skt,
                barcodeno: element.barcodeno,
                amount:element.amount,
                element: element.info,
                department:this.props.Activestocks.department,
                ...this.state.currentitem
            })
        })
        this.setState({ currentitem: item }, () => {
            this.props.CreateActivestocks(this.state.currentitem, this.props.history)
        })
       
    }

    componentDidMount() {
        //  this.props.OpenStockModal()
        this.props.GetAllDepartments();
        this.props.GetAllStocks()
    }

    componentDidUpdate() {
        if (!this.state.dataFetched && !this.props.Stocks.isLoading && !this.props.Departments.isLoading) {
            const departmentlist = this.props.Departments.list.map((item, index) => {
                return { value: item.concurrencyStamp, label: item.name }
            })
            const stockslist = this.props.Stocks.list.map((item, index) => {
                return { value: item.concurrencyStamp, label: item.name }
            })
            this.setState({ departments: departmentlist, stocks: stockslist, dataFetched: true })
        }
    }

    goBack = (e) => {
        e.preventDefault()
        this.props.history.push("/ActiveStocks")
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
        const stocks = this.state.stocks
        const departments = this.state.departments
        const isLoading = (this.props.Departments.isLoading || this.props.Stocks.isLoading)
        return (
            <>
                <Createstockmodal
                    show={this.props.Activestocks.isStockModalOpen}
                    onHide={() => this.props.CloseStockModal()}
                />
                {isLoading ? <Spinner /> :
                    <div className='Page'>
                        <div className="col-12 grid-margin">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Ürün Girişi > Yeni</h4>
                                    <form className="form-sample" >
                                        <div className='row'>
                                            <label style={{ fontSize: "12px" }} className="pr-5 col-form-label">Tanımlı Ürün</label>
                                        </div>
                                        <div className='row'>
                                            <div style={{ marginRight: '-5px' }} className='col-12 pr-5 mb-3'>
                                                <Select
                                                    value={this.state.selectedstock}
                                                    onChange={this.handleselectstock}
                                                    options={stocks}
                                                    placeholder="Tanımlı Ürün"
                                                />
                                            </div>
                                        </div>
                                        <div className="row d-flex justify-content-center align-items-center">
                                            <Details dispatch={this.props.UpdateDetails} details={this.state.details} />
                                        </div>
                                        <div className='row d-flex pr-5 justify-content-end align-items-right'>
                                            <button onClick={this.goBack} style={{ minWidth: '150px' }} className="btn btn-dark mr-2">Geri Dön</button>
                                            <button type="submit" style={{ minWidth: '150px' }} onClick={this.handlesubmit} className="btn btn-primary mr-2">Ekle</button>
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
    Activestocks: state.Activestocks,
    Departments: state.Departments,
    Stocks: state.Stocks
})

const mapDispatchToProps = { CreateActivestock, GetAllDepartments, GetAllStocks, OpenStockModal, CloseStockModal, UpdateDetails,CreateActivestocks }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Create))



class Details extends Component {
    constructor() {
        super();
        this.state = {
            items: []
        }
        this.inputChange = this.inputChange.bind(this);
    }

    componentDidMount() {
        this.setState({ items: this.props.details })
    }

    inputChange(event, index) {
        const items = this.state.items;
        const item = items[index]
        item[event.target.id] = event.target.value;
        this.props.dispatch(items)
        this.setState(items);;
    }

    addItem = () => {
        const items = [...this.state.items];
        items.push({ id: this.state.items[this.state.items.length - 1].id + 1, skt: '', barcodeno: '', amount: 1 });
        this.props.dispatch(items)
        this.setState({ items: items });
    }

    deleteItem(index) {
        const items = [...this.state.items];
        items.splice(index, 1);
        this.props.dispatch(items)
        this.setState({ items: items });
    }

    copySkt = () => {
        const items = [...this.state.items];
        const item = items[0]
        if (items.length > 0 || item.skt !== "") {
            items.forEach(element => element.skt = item.skt)
            this.setState({ items: items });
        }
    }

    copyBarcode = () => {
        const items = [...this.state.items];
        const item = items[0]
        if (items.length > 0 || item.barcodeno !== "") {
            items.forEach(element => element.barcodeno = item.barcodeno)
            this.setState({ items: items });
        }
    }

    render() {
        return (
            <form className="form-inline" style={{ marginBottom: '10px' }} onSubmit={(event) => { event.preventDefault(); }}>
                <div className="d-flex flex-column">
                    {this.state.items.map((item, index) => {
                        return (
                            <div key={item.id} className="d-flex mb-2">
                                <div className="form-group mb-2 mr-sm-2 mb-sm-0" style={{ flexFlow: 'column' }}>
                                    {(index === 0) ? <label style={{ marginBottom: '2px' }} for="exampleInputEmail1">SKT</label> : null}
                                    <input
                                        id='skt'
                                        type="date"
                                        className="form-control"
                                        placeholder="SKT"
                                        value={item.skt}
                                        onChange={(event) => this.inputChange(event, index)}
                                    />
                                </div>
                                <div className="form-group mb-2 mr-sm-2 mb-sm-0" style={{ flexFlow: 'column' }}>
                                    {(index === 0) ? <label style={{ marginBottom: '2px' }} for="exampleInputEmail1">Barkod No</label> : null}
                                    <input
                                        id='barcodeno'
                                        type="text"
                                        className="form-control"
                                        placeholder="BARKOD"
                                        value={item.barcodeno}
                                        onChange={(event) => this.inputChange(event, index)}
                                    />
                                </div>
                                <div className="form-group mb-2 mr-sm-2 mb-sm-0" style={{ flexFlow: 'column' }}>
                                    {(index === 0) ? <label style={{ marginBottom: '2px' }} for="exampleInputEmail1">Adet</label> : null}
                                    <input
                                        id='amount'
                                        type="number"
                                        className="form-control"
                                        placeholder="ADET"
                                        value={item.amount}
                                        onChange={(event) => this.inputChange(event, index)}
                                    />
                                </div>
                                <div className="form-group mb-2 mr-sm-2 mb-sm-0" style={{ flexFlow: 'column' }}>
                                    {(index === 0) ? <label style={{ marginBottom: '2px' }} for="exampleInputEmail1">AÇIKLAMA</label> : null}
                                    <input
                                        id='info'
                                        type="text"
                                        className="form-control"
                                        placeholder="Açıklama"
                                        value={item.info}
                                        onChange={(event) => this.inputChange(event, index)}
                                    />
                                </div>
                                {(index > 0) ? <button className="btn btn-danger btn-sm icon-btn ml-2" onClick={() => this.deleteItem(index)}><i className="mdi mdi-delete"></i></button> : null}
                            </div>
                        )
                    })}
                </div>
                <button className="btn btn-info btn-sm icon-btn ml-2 mb-2" style={{ verticalAlign: 'top' }} onClick={this.addItem} ><i className="mdi mdi-plus"></i></button>
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">SKT'leri Eşle</Tooltip>}>
                    <span className="d-inline-block">
                        <button onClick={this.copySkt} variant="primary" className='btn btn-info btn-sm icon-btn ml-2 mb-2' >
                            <i className="mdi mdi-content-copy"></i>
                        </button>
                    </span>
                </OverlayTrigger>
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Barkod'lari Eşle</Tooltip>}>
                    <span className="d-inline-block">
                        <button onClick={this.copyBarcode} variant="primary" className='btn btn-info btn-sm icon-btn ml-2 mb-2' >
                            <i className="mdi mdi-content-copy"></i>
                        </button>
                    </span>
                </OverlayTrigger>
            </form >
        )
    }
}