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
        sort: true,
        hidden: true
      },
      {
        dataField: 'purchasedate',
        text: 'Alış Tarihi',
        sort: true,
        type: 'date',
        hidden: true
      }, {
        dataField: 'skt',
        text: 'SKT Durumu',
        formatter: (cellContent, row) => {

          let datenow =  new Date().toISOString().slice(0, 10)
          console.log('datenow: ', datenow);
          console.log('this.addDays(row.skt, 0): ', this.addDays(row.skt, 0));
          if ((this.addDays(row.skt, 0).toISOString().slice(0, 10))  < datenow) {
            return (
              <div className="badge badge-outline-danger">GEÇMİŞ TARİHLİ</div>
            );
          }
          if ((this.addDays(row.skt, 0).toISOString().slice(0, 10))  ===  datenow) {
            return (
              <div className="badge badge-outline-warning">SON GÜN</div>
            );
          }
          if ((this.addDays(row.skt, 0).toISOString().slice(0, 10))  >  datenow) {
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
      }
    ];

    this.state = { columnvisiblebar, currentitem, defaultSorted, columns, SearchBar, isLoading };
  }

  addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
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
                                  bordered={false}
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