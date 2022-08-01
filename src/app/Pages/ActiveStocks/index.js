import React, { Component } from 'react'
import { connect } from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { GetAllActivestocks, GetSelectedActivestock, OpenDeleteModal, CloseDeleteModal, UpdateDepartment } from '../../Redux/actions/Activestock'
import { GetAllDepartments } from "../../Redux/actions/DepartmentAction"
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
        sort: true,
        /* formatter: (cellContent, row) => {
          if (row.skt !== null && row.skt !== undefined) {
            console.log('row.skt: ', row.skt);
            return row.skt.toDateString()
          }
          else
            return row.skt
        } */
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
       /*  formatter: (cellContent, row) => {
          if (row.purchasedatedate !== null && row.purchasedatedate !== undefined) {
            console.log('row.purchasedatedate: ', row.purchasedatedate);
            return row.purchasedatedate.toDateString()
          }
          else
            return row.purchasedatedate
        } */
      }, {
        dataField: 'skt',
        text: 'SKT Durumu',
        formatter: (cellContent, row) => {

          let datenow = new Date().toISOString().slice(0, 10)
          if ((this.addDays(row.skt, 0).toISOString().slice(0, 10)) < datenow) {
            return (
              <div className="badge badge-outline-danger">GEÇMİŞ TARİHLİ</div>
            );
          }
          if ((this.addDays(row.skt, 0).toISOString().slice(0, 10)) === datenow) {
            return (
              <div className="badge badge-outline-warning">SON GÜN</div>
            );
          }
          if ((this.addDays(row.skt, 0).toISOString().slice(0, 10)) > datenow) {
            return (
              <div className="badge badge-outline-success">OLUMLU</div>
            );
          }
          return (
            <h5>
              <span className="label label-danger"> BELİRLENEMEDİ</span>
            </h5>
          );
        }
      }, {
        dataField: 'watch',
        text: 'Hareket İzle',
        headerStyle: { margin: '-3px' },
        Style: { margin: '-3px' },
        formatter: () => {
          return (
            <div>
              <button className="btn btn-dark">
                <i className="mdi mdi-arrange-bring-to-front text-primary"></i>
              </button>
            </div>
          );
        },
        events: {
          onClick: (e, column, columnIndex, row, rowIndex) => {
            this.props.history.push('/Activestocks/' + row.id)
          }
        }
      }, {
        dataField: 'update',
        text: 'Güncelle',
        headerStyle: { maxWidht: '10px' },
        Style: { maxWidht: '10px' },
        formatter: () => {
          return (
            <div>
              <button className="btn btn-dark">
                <i className="mdi mdi-tooltip-edit text-primary"></i>
              </button>
            </div>
          );
        },
        events: {
          onClick: (e, column, columnIndex, row, rowIndex) => {
            this.props.history.push('/Activestocks/' + row.id)
          }
        }
      }, {
        dataField: 'kill',
        text: 'İtlaf Et',
        headerStyle: { maxWidht: '10px' },
        Style: { maxWidht: '10px' },
        formatter: () => {
          return (
            <div>
              <button className="btn btn-dark">
                <i className="mdi mdi-backspace text-primary"></i>
              </button>
            </div>
          );
        },
        events: {
          onClick: (e, column, columnIndex, row, rowIndex) => {
            this.props.history.push('/Activestocks/' + row.id)
          }
        }
      }
    ];

    this.state = { columnvisiblebar, currentitem, defaultSorted, columns, SearchBar, isLoading };
  }

  addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  removeTime = (date = new Date()) => {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
  }

  handleDeleteRole = async (e, row) => {
    await this.props.GetSelectedUnit(row.id)
    this.props.OpenDeleteModal()
  }

  changecolumnvisiblebar = () => {
    this.setState({ columnvisiblebar: !this.state.columnvisiblebar })
  }

  handleonaddnew = (e) => {
    this.props.UpdateDepartment(this.props.Departments.list.find(element => element.concurrencyStamp === e.target.id))
    this.props.history.push("/ActiveStocks/Create")
  }

  componentDidMount() {
    this.props.GetAllActivestocks();
    this.props.GetAllDepartments();
  }

  render() {
    const isloading = (this.props.Departments.isLoading || this.props.Activestocks.isLoading)
    const Departments = this.props.Departments.list
    const list = this.props.Activestocks.list
    const Columns = this.state.columns
    return (
      <>
        {isloading ? <Spinner /> :
          <div className="row datatable">
            {Departments.map(item =>
              <div className="col-12 m-2">
                <div className="card">
                  <div className="card-body">
                    <div className='row'>
                      <div className='col-6 d-flex justify-content-start'>
                        <h4 className="card-title">{item.name}</h4>
                      </div>
                      <div className='col-6 d-flex justify-content-end'>
                        <button style={{ minWidth: '120px', height: '30px' }} id={item.concurrencyStamp} onClick={this.handleonaddnew} className="btn btn-primary mr-2">Stok Girişi</button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <ToolkitProvider
                          keyField="id"
                          bootstrap4
                          data={list.filter(listitem => listitem.departmentid === item.concurrencyStamp)}
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
                                  bordered={true}
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
            )}
          </div>
        }
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  Activestocks: state.Activestocks,
  Departments: state.Departments
})

const mapDispatchToProps = { GetAllActivestocks, GetSelectedActivestock, GetAllDepartments, OpenDeleteModal, CloseDeleteModal, UpdateDepartment }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Units))