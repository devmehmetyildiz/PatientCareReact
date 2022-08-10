import React, { Component } from 'react'
import { connect } from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { withRouter } from 'react-router-dom';
import { GetAllStockmovements } from '../../Redux/actions/StockmovementActions'
import Spinner from '../../shared/Spinner'
import { Form } from "react-bootstrap";
export class Stockmovements extends Component {

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
      }, {
        dataField: 'stockname',
        text: 'Ürün Adı',
        sort: true
      }, {
        dataField: 'departmentname',
        text: 'Departman',
        sort: true
      }, {
        dataField: 'username',
        text: 'İşlem yapan kullanıcı',
        sort: true
      }
      , {
        dataField: 'movementtypename',
        text: 'Hareket türü',
        sort: true
      }, {
        dataField: 'amount',
        text: 'Miktar',
        sort: true,
      }, {
        dataField: 'prevvalue',
        text: 'Önceki Değer',
        sort: true,
      }, {
        dataField: 'newvalue',
        text: 'Sonraki değer',
        sort: true,
      },
      {
        dataField: 'movementdate',
        text: 'Hareket Tarihi',
        sort: true,
        type: 'date',
        formatter: (cellContent, row) => {
          if (row.movementdate !== null && row.movementdate !== undefined) {
            return row.movementdate.split('T')[0]
          }
          else
            return row.movementdate
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
                      <h4 className="card-title">Stok Hareketleri</h4>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Stockmovements))





