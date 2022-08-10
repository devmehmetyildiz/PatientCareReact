import React, { Component } from 'react'
import { connect } from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { withRouter } from 'react-router-dom';
import { GetSelectedStockmovement, GetSelectedStock } from '../../Redux/actions/StockmovementActions'
import { GetAllActivestocks } from '../../Redux/actions/Activestock'
import Spinner from '../../shared/Spinner'
import { Form } from "react-bootstrap";
import Select from 'react-select';

export class stockmovementselect extends Component {

    constructor(props) {
        super(props)
        const stocks = []
        const isDataFetched = false
        this.state = { stocks, isDataFetched };

    }

    componentDidMount() {
        this.props.GetAllActivestocks()
    }

    isUUID = (uuid) => {
        let s = "" + uuid;
        s = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
        if (s === null) {
            return false;
        }
        return true;
    }


    handleselectstock = (e) => {
        this.props.history.push('/Stockmovement/' + e.value)
    }

    componentDidUpdate() {
        if (this.state.stocks.length === 0 &&
            this.props.Activestocks.list.length !== 0 &&
            !this.state.isDataFetched) {
            const stocklist = this.props.Activestocks.list.map((item, index) => {

                return { value: item.concurrencyStamp, label: `${item.stock.name} Barkod no:${item.barcodeno}` }
            })
            this.setState({ stocks: stocklist, isDataFetched: true })
        }
    }

    render() {
        return (

            <div className='Page'>
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Ürün Hareketi İzleme</h4>
                            <form className="form-sample" onSubmit={(e)=>{e.preventDefault()}}>
                                <div className="row">
                                    <div style={{ marginRight: '-5px' }} className='col-12 pr-5 mb-3'>
                                        <Select
                                            onChange={this.handleselectstock}
                                            options={this.state.stocks}
                                            placeholder="Tanımlı Ürün"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    Stockmovements: state.Stockmovements,
    Activestocks: state.Activestocks
})

const mapDispatchToProps = { GetSelectedStockmovement, GetSelectedStock, GetAllActivestocks }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(stockmovementselect))





