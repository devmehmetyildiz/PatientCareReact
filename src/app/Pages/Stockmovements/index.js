import React, { Component } from 'react'
import { connect } from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { withRouter } from 'react-router-dom';
import { GetAllStockmovements } from '../../Redux/actions/StockmovementActions'
import Spinner from '../../shared/Spinner'
import { Form } from "react-bootstrap";
export class Cases extends Component {

  constructor(props) {
    super(props)
    const modalShow = false;
    const columnvisiblebar = false
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
        dataField: 'name',
        text: 'İsim',
        sort: true
      }, {
        dataField: 'caseStatus',
        text: 'Durum Değeri',
        sort: true
      }, {
        dataField: 'departmentstxt',
        text: 'Geçerli Departmanlar',
        sort: true
      }
      , {
        dataField: 'concurrencyStamp',
        text: 'Unik ID',
        sort: true
      }, {
        dataField: 'createdUser',
        text: 'Oluşturan Kullanıcı',
        sort: true,
        hidden: true
      }, {
        dataField: 'updatedUser',
        text: 'Güncelleyen Kullanıcı',
        sort: true,
        hidden: true
      }, {
        dataField: 'deleteUser',
        text: 'Silen Kullanıcı',
        sort: true,
        hidden: true
      },
      {
        dataField: 'createTime',
        text: 'Oluşturma Tarihi',
        sort: true,
        type: 'date',
        hidden: true
      },
      {
        dataField: 'updateTime',
        text: 'Güncelleme Tarihi',
        sort: true,
        type: 'date',
        hidden: true
      },
      {
        dataField: 'deletetime',
        text: 'Silme Tarihi',
        sort: true,
        type: 'date',
        hidden: true
      },
      {
        dataField: 'isActive',
        text: 'Aktiflik Durumu',
        sort: true,
        type: 'bool'
      }, {
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
            this.props.history.push('/Cases/' + row.id)
          }
        }
      }
      , {
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
            this.handleDeleteCase(e, row)
          }
        }
      }

    ];
    this.state = { columnvisiblebar, defaultSorted, columns, modalShow };

  }

  componentDidMount() {
    this.props.GetAllStockmovements();
  }


  render() {
    const { SearchBar } = Search;
    const Data = this.props.Stockmovements.list
    const Columns = this.state.columns
    return (
      <div>
        {this.props.Stockmovements.isLoading ? <Spinner /> :
          <div className="row datatable">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className='row'>
                    <div className='col-6 d-flex justify-content-start'>
                      <h4 className="card-title">Stok Hreketleri</h4>
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
                              <div className="d-flex align-items-center">
                                <p className="mb-2 mr-2">Arama Yap:</p>
                                <SearchBar {...props.searchProps} />
                              </div>
                              <BootstrapTable
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
          </div>}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  Stockmovements: state.Stockmovements,
})

const mapDispatchToProps = { GetAllStockmovements }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cases))





