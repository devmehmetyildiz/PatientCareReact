import React, { Component } from 'react'
import { connect } from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { GetAllUnits, GetSelectedUnit, OpenDeleteModal, CloseDeleteModal } from '../../Redux/actions/UnitActions'
import { withRouter } from 'react-router-dom';
import Spinner from "../../shared/Spinner"

export class Units extends Component {
  constructor(props) {
    super(props)
    var currentitem = []
    const isLoading = true
    const columnvisiblebar = false
    const { SearchBar } = Search;
    const defaultSorted = [{
      dataField: 'Id',
      order: 'asc'
    }]
    const columns = [
      {
        dataField: 'id',
        text: 'id',
        sort: true,
        type: 'number',
        hidden: true
      }, {
        dataField: 'stockname',
        text: 'Ürün Adı',
        sort: true
      }, {
        dataField: 'skt',
        text: 'SKT',
        sort: true
      }, {
        dataField: 'barcodeno',
        text: 'Barkod Numarası',
        sort: true
      }, {
        dataField: 'amount',
        text: 'Miktar',
        sort: true,
      }, {
        dataField: 'purchaseprice',
        text: 'Alış Fiyatı',
        sort: true
      },
      {
        dataField: 'purchasedate',
        text: 'Alış Tarihi',
        sort: true,
        type: 'date'
      }, {
        dataField: 'skt',
        text: 'SKT Durumu',
        formatter: (cellContent, row) => {
          if (row.inStock) {
            return (
              <h5>
                <span className="label label-success"> Available</span>
              </h5>
            );
          }
          return (
            <h5>
              <span className="label label-danger"> Backordered</span>
            </h5>
          );
        }
      }, {
        dataField: 'delete',
        text: 'Sil',
        formatter: () => {
          return (
            <div>
              <button className="btn btn-dark">
                <i className="mdi mdi-trash-can text-primary"></i>
              </button>
            </div>
          );
        },
        events: {
          onClick: (e, column, columnIndex, row, rowIndex) => {
            this.handleDeleteRole(e, row)
          }
        }
      }

    ];

    this.state = { columnvisiblebar, currentitem, defaultSorted, columns, SearchBar, isLoading };
  }




  handleDeleteRole = async (e, row) => {
    await this.props.GetSelectedUnit(row.id)
    this.props.OpenDeleteModal()
  }

  changecolumnvisiblebar = () => {
    this.setState({ columnvisiblebar: !this.state.columnvisiblebar })
  }

  handleonaddnew = (e) => {
    this.props.history.push("/Units/Create")
  }

  componentDidMount() {
    this.props.GetAllUnits();
  }

  render() {
    const Data = this.props.Units.list
    const Columns = this.state.columns
    return (
      <>
        <div className="row datatable">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className='row'>
                  <div className='col-6 d-flex justify-content-start'>
                    <h4 className="card-title">Aktif Stoklar</h4>
                  </div>
                  <div className='col-6 d-flex justify-content-end'>
                    <button style={{ minWidth: '120px', height: '30px' }} onClick={this.handleonaddnew} className="btn btn-primary mr-2">Yeni Birim</button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <ToolkitProvider
                      keyField="id"
                      bootstrap4
                      data={Data}
                      columns={Columns}
                      search
                      columnToggle
                    >
                      {
                        props => (
                          <div>
                            <BootstrapTable
                              defaultSorted={this.state.defaultSorted}
                              hover
                              condensed
                              pagination={paginationFactory()}
                              {...props.baseProps}
                              wrapperClasses="table-responsive"
                            />
                          </div>
                        )
                      }
                    </ToolkitProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  Units: state.Units
})

const mapDispatchToProps = { GetAllUnits, GetSelectedUnit, OpenDeleteModal, CloseDeleteModal }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Units))