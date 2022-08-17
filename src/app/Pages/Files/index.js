import React, { Component } from 'react'
import { connect } from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { GetAllFiles, GetSelectedFile, OpenDeleteModal, CloseDeleteModal } from '../../Redux/actions/FileActions'
import { withRouter } from 'react-router-dom';
import Spinner from "../../shared/Spinner"
import DeleteModal from "./Delete"


export class Files extends Component {

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
      }, {
        dataField: 'name',
        text: 'İsim',
        sort: true
      }, 
       {
        dataField: 'filename',
        text: 'Dosya Adı',
        sort: true
      }, {
        dataField: 'filefolder',
        text: 'Bulut Klasör',
        sort: true,
      }, {
        dataField: 'filepath',
        text: 'Klasör Dizini',
        sort: true,
      }, {
        dataField: 'downloadedcount',
        text: 'İndirilme Sayısı',
        sort: true,
      }, {
        dataField: 'lastdownloadeduser',
        text: 'En Son İndiren Kullanıcı',
        sort: true,
      },
      {
        dataField: 'lastdownloadedip',
        text: 'En Son İndiren IP',
        sort: true,
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
            this.props.history.push('/Files/' + row.id)
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
    await this.props.GetSelectedFile(row.id)
    this.props.OpenDeleteModal()
  }

  changecolumnvisiblebar = () => {
    this.setState({ columnvisiblebar: !this.state.columnvisiblebar })
  }

  handleonaddnew = (e) => {
    this.props.history.push("/Files/Create")
  }

  componentDidMount() {
    this.props.GetAllFiles();
  }

  render() {
    const { isLoading, list } = this.props.Files;
    return (
      <div>
        <DeleteModal
          show={this.props.Files.isModalOpen}
          onHide={() => this.props.CloseDeleteModal()}
        />
        {isLoading ? <Spinner /> :
          <div className="row datatable">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className='row'>
                    <div className='col-6 d-flex justify-content-start'>
                      <h4 className="card-title">Dosyalar</h4>
                    </div>
                    <div className='col-6 d-flex justify-content-end'>
                      {/*   <button style={{ minWidth: '30px', height: '30px' }} onClick={() => { this.setState({ columnvisiblebar: !this.state.columnvisiblebar }) }}>Toggle</button> */}
                      <button style={{ minWidth: '120px', height: '30px' }} onClick={this.handleonaddnew} className="btn btn-primary mr-2">Yeni Dosya Ekle</button>
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
  Files: state.Files
})

const mapDispatchToProps = { GetAllFiles, GetSelectedFile, OpenDeleteModal, CloseDeleteModal }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Files))