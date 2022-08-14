import React, { Component } from 'react'
import { connect } from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { GetAllActivepatients, GetSelectedActivepatient, UpdateDepartmentguid } from '../../Redux/actions/ActivepatientActions'
import { GetAllDepartments } from "../../Redux/actions/DepartmentAction"
import { withRouter } from 'react-router-dom';
import Spinner from "../../shared/Spinner"
import SweetAlert from 'sweetalert2-react';

export class Index extends Component {
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
      }
    ];
    this.state = { columnvisiblebar, currentitem, defaultSorted, columns, SearchBar, isLoading };
  }

  changecolumnvisiblebar = () => {
    this.setState({ columnvisiblebar: !this.state.columnvisiblebar })
  }

  handleonaddnew = (e) => {
    this.props.history.push(`/Activepatients/Create/${e.target.id}`)
  }

  componentDidMount() {
    this.props.GetAllActivepatients();
    this.props.GetAllDepartments();
  }

  render() {
    const isloading = (this.props.Departments.isLoading || this.props.Activepatients.isLoading)
    const Departments = this.props.Departments.list
    const list = this.props.Activepatients.list
    const Columns = this.state.columns
    return (
      <>
        {isloading ? <Spinner /> :
          <div className="row datatable">
            {Departments.filter(u=>u.ishavepatients).map(item =>
              <div className="col-12 m-2">
                <div className="card">
                  <div className="card-body">
                    <div className='row'>
                      <div className='col-6 d-flex justify-content-start'>
                        <h4 className="card-title">{item.name}</h4>
                      </div>
                      <div className='col-6 d-flex justify-content-end'>
                        <button style={{ minWidth: '120px', height: '30px' }} key={item.concurrencyStamp} id={item.concurrencyStamp} onClick={this.handleonaddnew} className="btn btn-primary mr-2">Hasta Girişi</button>
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
  Activepatients: state.Activepatients,
  Departments: state.Departments
})

const mapDispatchToProps = { GetAllActivepatients, GetSelectedActivepatient, GetAllDepartments, UpdateDepartmentguid }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Index))