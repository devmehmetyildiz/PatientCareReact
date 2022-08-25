import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { CreateActivestock, CreateActivestocks, OpenStockModal, CloseStockModal, UpdateDetails, UpdateDepartmentguid } from "../../Redux/actions/Activestock"
import { GetAllDepartments } from "../../Redux/actions/DepartmentAction"
import { GetAllStocks } from '../../Redux/actions/StockActions';
import Spinner from '../../shared/Spinner'
import Select from 'react-select';
import { OverlayTrigger, Button, Tooltip } from 'react-bootstrap';
import Popup from '../../Utils/Popup';

export class Create extends Component {

    constructor(props) {
        super(props)
        const dataFetched = false
        this.state = {};
    }

    handlesubmit = (e) => {
        e.preventDefault()

    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    goBack = (e) => {
        e.preventDefault()
        this.props.history.push("/ActiveStocks")
    }

    handleonchange = (e) => {

    }

    handleselectstock = (e) => {

    }

    render() {

        return (
            <>
                <div className='Page'>
                    <div className="col-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Hasta Türleri > Yeni</h4>
                                <form className="form-sample" >
                                    <div className="row">
                                        <div className="col-9">
                                            <div className='row'>
                                                <div className='col-3'>

                                                </div>
                                                <div className='col-3'>
                                                    <div className='form-group'>
                                                        <label>İsim</label>
                                                        <input className={"form-control"} placeholder='İsim' name='name'
                                                        />
                                                    </div>
                                                    <div className='form-group'>
                                                        <label>Soyisim</label>
                                                        <input className={"form-control"} placeholder='Soyisim' name='name'
                                                        />
                                                    </div>
                                                    <div className='form-group'>
                                                        <label>Baba Adı</label>
                                                        <input className={"form-control"} placeholder='Baba Adı' name='name'
                                                        />
                                                    </div>
                                                    <div className='form-group'>
                                                        <label>Anne Adı</label>
                                                        <input className={"form-control"} placeholder='Anne Adı' name='name'
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col-3'>
                                                    <label>Hasta Fotoğrafı</label>
                                                    <img style={{ objectFit: 'contain', margin: '10px', width: '200px', height: '200px' }} className="card-img-top" />
                                                    <div className='form-group'>
                                                        <input className={"form-control-file"} type="file"
                                                        />
                                                    </div>
                                                    <div className='form-group'>
                                                        <label>Dosya Adı</label>
                                                        <input className={"form-control"} placeholder=' Name' name='name'
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col-3'>
                                                    <label>Hasta Fotoğrafı</label>
                                                    <img style={{ objectFit: 'contain', margin: '10px', width: '200px', height: '200px' }} className="card-img-top" />
                                                    <div className='form-group'>
                                                        <input className={"form-control-file"} style={{ width: '170px' }} type="file"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-3 d-flex" style={{ flexDirection: 'column' }}>
                                            <label>Hasta Fotoğrafı</label>
                                            <img style={{ objectFit: 'contain', margin: '10px', width: '200px', height: '200px' }} className="card-img-top" />
                                            <div className='form-group'>
                                                <input className={"form-control-file"} style={{ width: '230px' }} type="file"
                                                />
                                            </div>
                                            <button onClick={this.goBack} style={{ width: '250px' }} className="btn btn-primary m-2">Engelli Sağlık Kurul Raporu</button>
                                            <button onClick={this.goBack} style={{ width: '250px' }} className="btn btn-primary m-2">İlk Görüş Ve Değerlendirme Formu</button>
                                            <button onClick={this.goBack} style={{ width: '250px' }} className="btn btn-primary m-2">Teslim Alma Formu</button>
                                            <button onClick={this.goBack} style={{ width: '250px' }} className="btn btn-primary m-2">Mülkiyet Teslim Alma Formu</button>
                                            <button onClick={this.goBack} style={{ width: '250px' }} className="btn btn-primary m-2">İlk Kabul Formu</button>
                                            <button onClick={this.goBack} style={{ width: '250px' }} className="btn btn-primary m-2">Genel Vücut Kontrol Formu</button>
                                            <button onClick={this.goBack} style={{ width: '250px' }} className="btn btn-primary m-2">Engelli İzin Formu</button>
                                        </div>
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
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    Activestocks: state.Activestocks,
    Departments: state.Departments,
    Stocks: state.Stocks
})

const mapDispatchToProps = { CreateActivestock, GetAllDepartments, GetAllStocks, OpenStockModal, CloseStockModal, UpdateDetails, CreateActivestocks, UpdateDepartmentguid }

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

    addItem = (e) => {
        e.preventDefault()
        const items = [...this.state.items];
        items.push({ id: this.state.items[this.state.items.length - 1].id + 1, skt: '', barcodeno: '', amount: 1 });
        this.props.dispatch(items)
        this.setState({ items: items });
    }

    deleteItem(index) {
        if (index === 0) {
            Popup("Error", "Silme Hatası", "İlk Kayıt Silinemez")
            return
        }
        const items = [...this.state.items];
        items.splice(index, 1);
        this.props.dispatch(items)
        this.setState({ items: items });
    }

    copySkt = (e) => {
        e.preventDefault()
        const items = [...this.state.items];
        const item = items[0]
        if (items.length > 0 || item.skt !== "") {
            items.forEach(element => element.skt = item.skt)
            this.setState({ items: items });
        }
    }
    copyAmount = (e) => {
        e.preventDefault()
        const items = [...this.state.items];
        const item = items[0]
        if (items.length > 0 || item.amount !== "") {
            items.forEach(element => element.amount = item.amount)
            this.setState({ items: items });
        }
    }

    copyBarcode = (e) => {
        e.preventDefault()
        const items = [...this.state.items];
        const item = items[0]
        if (items.length > 0 || item.barcodeno !== "") {
            items.forEach(element => element.barcodeno = item.barcodeno)
            this.setState({ items: items });
        }
    }

    copyInfo = (e) => {
        e.preventDefault()
        const items = [...this.state.items];
        const item = items[0]
        if (items.length > 0 || item.info !== "") {
            items.forEach(element => element.info = item.info)
            this.setState({ items: items });
        }
    }
    copyPurchasedate = (e) => {
        e.preventDefault()
        const items = [...this.state.items];
        const item = items[0]
        if (items.length > 0 || item.purchasedate !== "") {
            items.forEach(element => element.purchasedate = item.purchasedate)
            this.setState({ items: items });
        }
    }
    copyPurchaseprice = (e) => {
        e.preventDefault()
        const items = [...this.state.items];
        const item = items[0]
        if (items.length > 0 || item.purchaseprice !== "") {
            items.forEach(element => element.purchaseprice = item.purchaseprice)
            this.setState({ items: items });
        }
    }

    render() {
        return (

            <div className='form' onSubmit={(e) => { e.preventDefault() }}>
                <div className='row'>
                    <div className='col'>
                        {this.state.items.map((item, index) => {
                            return (
                                <div key={item.id} className="row mb-2">
                                    <div className="col mb-2 mr-sm-2 mb-sm-0" style={{ flexFlow: 'column' }}>
                                        <div className='row'>
                                            {(index === 0) ?
                                                <div className='col' style={{ flexFlow: 'row', whiteSpace: 'nowrap' }}>
                                                    <label style={{ marginBottom: '2px' }} >SKT</label>
                                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">SKT'leri Eşle</Tooltip>}>
                                                        <span className="d-inline-block">
                                                            <button onClick={this.copySkt} variant="primary" className='btn btn-info btn-sm icon-btn ml-2 mb-2' >
                                                                <i className="mdi mdi-content-copy"></i>
                                                            </button>
                                                        </span>
                                                    </OverlayTrigger>
                                                </div>
                                                : null}
                                            <input
                                                id='skt'
                                                type="date"
                                                className="form-control"
                                                placeholder="SKT"
                                                value={item.skt}
                                                onChange={(event) => this.inputChange(event, index)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col mb-2 mr-sm-2 mb-sm-0" style={{ flexFlow: 'column' }}>
                                        <div className='row'>
                                            {(index === 0) ?
                                                <div className='col' style={{ flexFlow: 'row', whiteSpace: 'nowrap' }}>
                                                    <label style={{ marginBottom: '2px' }} >Barkod No</label>
                                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Barkodlari Eşle</Tooltip>}>
                                                        <span className="d-inline-block">
                                                            <button onClick={this.copyBarcode} variant="primary" className='btn btn-info btn-sm icon-btn ml-2 mb-2' >
                                                                <i className="mdi mdi-content-copy"></i>
                                                            </button>
                                                        </span>
                                                    </OverlayTrigger>
                                                </div>
                                                : null}
                                        </div>
                                        <input
                                            id='barcodeno'
                                            type="text"
                                            className="form-control"
                                            placeholder="BARKOD"
                                            value={item.barcodeno}
                                            onChange={(event) => this.inputChange(event, index)}
                                        />
                                    </div>
                                    <div className="col mb-2 mr-sm-2 mb-sm-0" style={{ flexFlow: 'column' }}>
                                        <div className='row'>
                                            {(index === 0) ?
                                                <div className='col' style={{ flexFlow: 'row', whiteSpace: 'nowrap' }}>
                                                    <label style={{ marginBottom: '2px' }} >Adet</label>
                                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Adetleri Eşle</Tooltip>}>
                                                        <span className="d-inline-block">
                                                            <button onClick={this.copyAmount} variant="primary" className='btn btn-info btn-sm icon-btn ml-2 mb-2' >
                                                                <i className="mdi mdi-content-copy"></i>
                                                            </button>
                                                        </span>
                                                    </OverlayTrigger>
                                                </div>
                                                : null}
                                        </div>
                                        <input
                                            id='amount'
                                            type="number"
                                            className="form-control"
                                            placeholder="ADET"
                                            value={item.amount}
                                            onChange={(event) => this.inputChange(event, index)}
                                        />
                                    </div>
                                    <div className="col mb-2 mr-sm-2 mb-sm-0" style={{ flexFlow: 'column' }}>
                                        <div className='row'>
                                            {(index === 0) ?
                                                <div className='col' style={{ flexFlow: 'row', whiteSpace: 'nowrap' }}>
                                                    <label style={{ marginBottom: '2px' }} >Tarih</label>
                                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Tarihleri Eşle</Tooltip>}>
                                                        <span className="d-inline-block">
                                                            <button onClick={this.copyPurchasedate} variant="primary" className='btn btn-info btn-sm icon-btn ml-2 mb-2' >
                                                                <i className="mdi mdi-content-copy"></i>
                                                            </button>
                                                        </span>
                                                    </OverlayTrigger>
                                                </div>
                                                : null}
                                        </div>
                                        <input
                                            id='purchasedate'
                                            type="date"
                                            className="form-control"
                                            placeholder="Alış Tarihi"
                                            value={item.purchasedate}
                                            onChange={(event) => this.inputChange(event, index)}
                                        />
                                    </div>
                                    <div className="col mb-2 mr-sm-2 mb-sm-0" style={{ flexFlow: 'column', whiteSpace: 'nowrap' }}>
                                        <div className='row'>
                                            {(index === 0) ?
                                                <div className='col' style={{ flexFlow: 'row' }}>
                                                    <label style={{ marginBottom: '2px' }} >Ücret</label>
                                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Ücretleri Eşle</Tooltip>}>
                                                        <span className="d-inline-block">
                                                            <button onClick={this.copyPurchaseprice} variant="primary" className='btn btn-info btn-sm icon-btn ml-2 mb-2' >
                                                                <i className="mdi mdi-content-copy"></i>
                                                            </button>
                                                        </span>
                                                    </OverlayTrigger>
                                                </div>
                                                : null}
                                        </div>
                                        <input
                                            id='purchaseprice'
                                            type="number"
                                            className="form-control"
                                            placeholder="Fiyat"
                                            value={item.purchaseprice}
                                            onChange={(event) => this.inputChange(event, index)}
                                        />
                                    </div>
                                    {(index > 0) ?
                                        <div className="col mb-2 mr-sm-2 mb-sm-0" style={{ flexFlow: 'column' }}>
                                            <div className='row'>
                                                {(index === 0) ?
                                                    <div className='col' style={{ flexFlow: 'row', whiteSpace: 'nowrap' }}>
                                                        <label style={{ marginBottom: '2px' }} >Açıklama</label>
                                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Açıklamaları Eşle</Tooltip>}>
                                                            <span className="d-inline-block">
                                                                <button onClick={this.copyInfo} variant="primary" className='btn btn-info btn-sm icon-btn ml-2 mb-2' >
                                                                    <i className="mdi mdi-content-copy"></i>
                                                                </button>
                                                            </span>
                                                        </OverlayTrigger>
                                                    </div>
                                                    : null}
                                            </div>
                                            <input
                                                id='info'
                                                type="text"
                                                placeholder="Açıklama"
                                                className="form-control"
                                                value={item.info}
                                                onChange={(event) => this.inputChange(event, index)}
                                            />
                                        </div>
                                        :
                                        <div className="col mb-2 mr-sm-2 mb-sm-0 firstrow" style={{ flexFlow: 'column' }}>
                                            <div className='row'>
                                                {(index === 0) ?
                                                    <div className='col' style={{ flexFlow: 'row', whiteSpace: 'nowrap' }}>
                                                        <label style={{ marginBottom: '2px' }} >Açıklama</label>
                                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Açıklamaları Eşle</Tooltip>}>
                                                            <span className="d-inline-block">
                                                                <button onClick={this.copyInfo} variant="primary" className='btn btn-info btn-sm icon-btn ml-2 mb-2' >
                                                                    <i className="mdi mdi-content-copy"></i>
                                                                </button>
                                                            </span>
                                                        </OverlayTrigger>
                                                    </div>
                                                    : null}
                                            </div>
                                            <input
                                                id='info'
                                                type="text"
                                                placeholder="Açıklama"
                                                className="form-control"
                                                value={item.info}
                                                onChange={(event) => this.inputChange(event, index)}
                                            />
                                        </div>
                                    }
                                    {(index > 0) ? <button className="btn btn-danger btn-sm icon-btn ml-2" onClick={() => this.deleteItem(index)}><i className="mdi mdi-delete"></i></button> : null}
                                </div>
                            )
                        })}
                    </div>
                    <div className='col' style={{ maxWidth: '30px', marginRight: '10px' }}>
                        <button className="btn btn-info btn-sm icon-btn ml-2 mb-2" style={{ verticalAlign: 'top' }} onClick={this.addItem} ><i className="mdi mdi-plus"></i></button>
                    </div>
                </div >
            </div>

        )
    }
}