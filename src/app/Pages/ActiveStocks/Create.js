import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import InputItem from '../../Components/Common/Forminput'
import "../../../assets/styles/Pages/Create.scss"
import { CreateActivestock, OpenStockModal, CloseStockModal } from "../../Redux/actions/Activestock"
import { GetAllDepartments } from "../../Redux/actions/DepartmentAction"
import { GetAllStocks } from '../../Redux/actions/StockActions';
import Spinner from '../../shared/Spinner'
import Select from 'react-select';
import Createstockmodal from './Createstockmodal';
import { Form } from 'react-bootstrap'


export class Create extends Component {

    constructor(props) {
        super(props)
        const currentitem = {
            id: 0,
            caseStatus: 0,
            name: "",
            concurrencyStamp: null,
            createdUser: "",
            updatedUser: null,
            deleteUser: null,
            createTime: null,
            updateTime: null,
            deleteTime: null,
            departmentstxt: "",
            departments: [],
            isActive: true
        }
        const selecteddepartments = []
        const departments = []
        const stocks = []
        const selectedstock = {}
        const dataFetched = false
        this.state = { currentitem, selecteddepartments, departments, stocks, selectedstock, dataFetched };
    }

    handlesubmit = (e) => {
        e.preventDefault()
        /*  let departments = []
         this.state.selecteddepartments.forEach(element => {
             departments.push(this.props.Departments.list.find(station => station.concurrencyStamp===element.value))
         });
         const newdata = { ...this.state.currentitem }
         newdata.departments = departments
         this.setState({ currentitem: newdata }, () => {
             this.props.CreateCase(this.state.currentitem, this.props.history)
         }) */
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
        this.props.history.push("/Cases")
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
                                    <form className="form-sample" onSubmit={this.handlesubmit}>
                                        <div className='row'>
                                            <label style={{ fontSize: "12px" }} className="col-form-label">Tanımlı Ürün</label>
                                        </div>
                                        <div className='row'>
                                            <div style={{ marginRight: '-5px' }} className='col-12 pr-5 mb-3'>
                                                <Select
                                                    value={this.state.selectedstock}
                                                    onChange={this.handleselectstock}
                                                    options={stocks}
                                                />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className="pr-5 col-6">
                                                <div className='row'>
                                                    <label style={{ fontSize: "12px" }} className="col-form-label">SKT</label>
                                                </div>
                                                <Form.Group className="row" >
                                                    <Form.Control
                                                        id="skt"
                                                        value={this.state.currentitem.stk}
                                                        type="date"
                                                        placeholder="Skt"
                                                        onChange={this.handleonchange}
                                                    />
                                                </Form.Group>
                                            </div>
                                            <div className="pr-5 col-6">
                                                <div className='row'>
                                                    <label style={{ fontSize: "12px" }} className="col-form-label">Barkod Numarası</label>
                                                </div>
                                                <Form.Group className="row" >
                                                    <Form.Control
                                                        id="barcodeno"
                                                        value={this.state.currentitem.barcodeno}
                                                        type="number"
                                                        placeholder="Barkod numarası"
                                                        onChange={this.handleonchange}
                                                    />
                                                </Form.Group>
                                            </div>
                                        </div>
                                        <div className="row d-flex justify-content-center align-items-center">
                                            <FormRepeater />
                                        </div>
                                        <div className='row d-flex pr-5 justify-content-end align-items-right'>
                                            <button onClick={this.goBack} style={{ minWidth: '150px' }} className="btn btn-dark mr-2">Geri Dön</button>
                                            <button type="submit" style={{ minWidth: '150px' }} className="btn btn-primary mr-2">Ekle</button>
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

const mapDispatchToProps = { CreateActivestock, GetAllDepartments, GetAllStocks, OpenStockModal, CloseStockModal }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Create))



class FormRepeater extends Component {
    constructor() {
        super();
        this.state = {
            items: [{ id: 1, skt: '',barcodeno:'' }]
        }
        this.inputChangeskt = this.inputChangeskt.bind(this);
        this.inputChangebarcode = this.inputChangebarcode.bind(this);
    }

    inputChangeskt(event, index) {
        const items = this.state.items;
        items[index].skt = event.target.value;
        this.setState(items);;
    }

    inputChangebarcode(event, index) {
        const items = this.state.items;
        items[index].barcodeno = event.target.value;
        this.setState(items);;
    }

    addItem = () => {
        const items = [...this.state.items];
        items.push({ id: this.state.items[this.state.items.length - 1].id + 1, skt: '',barcodeno:'' });
        this.setState({ items: items });
    }

    deleteItem(index) {
        const items = [...this.state.items];
        items.splice(index, 1);
        this.setState({ items: items });
    }

    render() {
        return (
            <form className="form-inline" onSubmit={(event) => { event.preventDefault(); }}>
                <div className="d-flex flex-column">
                    {this.state.items.map((item, index) => {
                        return (
                            <div key={item.id} className="d-flex mb-2">
                                <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="SKT"
                                        value={item.skt}
                                        onChange={(event) => this.inputChangeskt(event, index)}
                                    />
                                </div>
                                <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="BARKOD"
                                        value={item.barcodeno}
                                        onChange={(event) => this.inputChangebarcode(event, index)}
                                    />
                                </div>
                                {(index > 0) ? <button className="btn btn-danger btn-sm icon-btn ml-2" onClick={() => this.deleteItem(index)}><i className="mdi mdi-delete"></i></button> : null}
                            </div>
                        )
                    })}
                </div>
                <button className="btn btn-info btn-sm icon-btn ml-2 mb-2" onClick={this.addItem} ><i className="mdi mdi-plus"></i></button>
            </form>
        )
    }
}