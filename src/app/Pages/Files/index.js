import React, { Component } from 'react'
import { connect } from 'react-redux'
import { OverlayTrigger, Tooltip, Button, ButtonToolbar, Popover } from 'react-bootstrap';
import { COLUMNTYPES } from '../../Utils/Constants';
import { GetAllFiles, GetSelectedFile, OpenDeleteModal, CloseDeleteModal } from '../../Redux/actions/FileActions'
import { withRouter } from 'react-router-dom';
import Spinner from "../../shared/Spinner"
import DeleteModal from "./Delete"
import "../../../assets/styles/Pages/File.scss"
import Datatable from '../../Utils/Datatable';
export class Files extends Component {

  constructor(props) {
    super(props)
    var currentitem = []
    const isLoading = true

    const columns = [
      {
        dataField: 'id',
        text: 'id',
        type: 'number',
        Columntype: COLUMNTYPES.NUMBER,
        Formatheader: true,

      }, {
        dataField: 'name',
        text: 'İsim',
        Columntype: COLUMNTYPES.TEXT,
        Formatheader: true,
      },
      {
        dataField: 'filename',
        text: 'Dosya Adı',
        Columntype: COLUMNTYPES.TEXT,
        Formatheader: true,
      }, {
        dataField: 'filefolder',
        text: 'Bulut Klasör',
        Columntype: COLUMNTYPES.TEXT,
        Formatheader: true,
      }, {
        dataField: 'filepath',
        text: 'Klasör Dizini',
        Columntype: COLUMNTYPES.TEXT,
        Formatheader: true,
      }, {
        dataField: 'downloadedcount',
        text: 'İndirilme Sayısı',
        Columntype: COLUMNTYPES.NUMBER,
        Formatheader: true,
      }, {
        dataField: 'lastdownloadeduser',
        text: 'En Son İndiren Kullanıcı',
        Columntype: COLUMNTYPES.TEXT,
        Formatheader: true,
      },
      {
        dataField: 'lastdownloadedip',
        text: 'En Son İndiren IP',
        Columntype: COLUMNTYPES.TEXT,
        Formatheader: true,
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
            this.props.history.push('/Files/' + row.concurrencyStamp)
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

    this.state = { currentitem, columns, isLoading };
  }




  handleDeleteRole = async (e, row) => {
    await this.props.GetSelectedFile(row.concurrencyStamp)
    this.props.OpenDeleteModal()
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
          onHide={() => {
            this.props.CloseDeleteModal()
          }}
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
                      <button style={{ minWidth: '120px', height: '30px' }} onClick={this.handleonaddnew} className="btn btn-primary mr-2">Yeni Dosya Ekle</button>
                    </div>
                  </div>
                  <Datatable columns={this.state.columns} data={list} />
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