import React, { Component } from 'react'
import { connect } from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { GetAllStocks,GetSelectedStock, OpenDeleteModal, CloseDeleteModal } from '../../Redux/actions/StockActions'
import { withRouter } from 'react-router-dom';
import Spinner from "../../shared/Spinner"
import DeleteModal from "./Delete"


export class Stocks extends Component {
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
      },{
        dataField: 'name',
        text: 'Ürün Adı',
        sort: true
      },{
        dataField: 'description',
        text: 'Ürün Açıklaması',
        sort: true
      },{
        dataField: 'unittxt',
        text: 'Birim',
        sort: true
      },{
        dataField: 'stationtxt',
        text: 'İstasyon',
        sort: true
      }
      ,{
        dataField: 'departmenttxt',
        text: 'Departman',
        sort: true
      },{
        dataField: 'concurrencyStamp',
        text: 'Unik ID',
        sort: true,
        hidden: true
      },{
        dataField: 'createdUser',
        text: 'Oluşturan Kullanıcı',
        sort: true,
        hidden: true
      },{
        dataField: 'updatedUser',
        text: 'Güncelleyen Kullanıcı',
        sort: true,
        hidden: true
      },{
        dataField: 'deleteUser',
        text: 'Silen Kullanıcı',
        sort: true,
        hidden: true
      },{
        dataField: 'createTime',
        text: 'Oluşturma Tarihi',
        sort: true,
        type: 'date',
        hidden: true
      },{
        dataField: 'updateTime',
        text: 'Güncelleme Tarihi',
        sort: true,
        type: 'date',
        hidden: true
      },{
        dataField: 'deletetime',
        text: 'Silme Tarihi',
        sort: true,
        type: 'date',
        hidden: true
      },{
        dataField: 'isActive',
        text: 'Aktiflik Durumu',
        sort: true,
        type: 'bool',
        hidden: true
      },{
        dataField: 'update',
        text: 'Güncelle',
        sort: true,
        formatter: () => {
          return (
            <div>
              <button className="btn btn-dark">
                <i className="mdi mdi-tooltip-edit text-primary"></i>Güncelle
              </button>
            </div>
          );
        },
        events: {
          onClick: (e, column, columnIndex, row, rowIndex) => {
            this.props.history.push('/Stocks/' + row.id)
          }
        }
      },{
        dataField: 'delete',
        text: 'Sil',
        sort: true,
        formatter: () => {
          return (
            <div>
              <button className="btn btn-dark">
                <i className="mdi mdi-trash-can text-primary"></i>Sil
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

  CustomToggleList = ({
    columns,
    onColumnToggle,
    toggles
  }) => (
    <div className="btn-group btn-group-toggle btn-group-vertical" data-toggle="buttons">
      {
        columns
          .map(column => ({
            ...column,
            toggle: toggles[column.dataField]
          }))
          .map(column => (
            <button
              type="button"
              key={column.dataField}
              className={`m-1 btn btn-warning ${column.toggle ? 'active' : ''}`}
              data-toggle="button"
              aria-pressed={column.toggle ? 'true' : 'false'}
              onClick={() => onColumnToggle(column.dataField)}
            >
              {column.text}
            </button>
          ))
      }
    </div>
  );


  handleDeleteRole = async (e, row) => {
    this.props.GetSelectedStock(row.id)
    this.props.OpenDeleteModal()
  }

  changecolumnvisiblebar = () => {
    this.setState({ columnvisiblebar: !this.state.columnvisiblebar })
  }

  handleonaddnew = (e) => {
    this.props.history.push("/Stocks/Create")
  }

  componentDidMount() {
    this.props.GetAllStocks();
  }

  render() {
    const { isLoading, list } = this.props.Stocks;
    return (
      <div>
        <DeleteModal
          show={this.props.Stocks.isModalOpen}
          onHide={() => this.props.CloseDeleteModal()}
        />
        {isLoading ? <Spinner /> :
          <div className="row datatable">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className='row'>
                    <div className='col-6 d-flex justify-content-start'>
                      <h4 className="card-title">Tanımlı Hastalar</h4>
                    </div>
                    <div className='col-6 d-flex justify-content-end'>
                      {/*   <button style={{ minWidth: '30px', height: '30px' }} onClick={() => { this.setState({ columnvisiblebar: !this.state.columnvisiblebar }) }}>Toggle</button> */}
                      <button style={{ minWidth: '120px', height: '30px' }} onClick={this.handleonaddnew} className="btn btn-primary mr-2">Yeni Hasta</button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <ToolkitProvider
                        keyField="id"
                        bootstrap4
                        data={list}
                        columns={this.state.columns}
                        search
                        columnToggle
                      >
                        {
                          props => (
                            <div>
                              {this.state.columnvisiblebar ?
                                <div>
                                  <this.CustomToggleList {...props.columnToggleProps} />
                                  <hr />
                                </div>
                                : <></>}
                              <div className="d-flex align-items-center">
                                <p className="mb-2 mr-2">Arama Yap:</p>
                                <this.state.SearchBar {...props.searchProps} />
                              </div>
                              <BootstrapTable
                                expandRow={this.state.expandRow}
                                defaultSorted={this.state.defaultSorted}
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
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  Stocks: state.Stocks
})

const mapDispatchToProps = { GetAllStocks,GetSelectedStock, OpenDeleteModal, CloseDeleteModal }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Stocks))