import React, { Component } from 'react'
import { connect } from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { withRouter } from 'react-router-dom';
import { GetAllPatienttype, GetSelectedPatienttype, OpenDeleteModal, CloseDeleteModal } from '../../Redux/actions/PatienttypeActions'
import { GetAllDatatables, CreateDatatable, Updateitem, OpenModal, CloseModal } from '../../Redux/actions/DatatableActions';
import Columnmanagement from "../../Utils/Columnmanagement"
import Spinner from '../../shared/Spinner'
import DeleteCaseModal from "./Delete"
import { Form } from "react-bootstrap";
import { ROUTES } from '../../Utils/Constants';

export class Patienttypes extends React.Component {

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
                text: 'Hasta Tür Adı',
                sort: true
            }, {
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
                hidden: true,
                type: 'bool'
            }, {
                dataField: 'update',
                text: 'Güncelle',
                sort: true,
                hidden: true,
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
                        this.props.history.push('/Patienttypes/' + row.id)
                    }
                }
            }
            , {
                dataField: 'delete',
                text: 'Sil',
                sort: true,
                hidden: true,
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
        const dataFetched = false
        this.state = { columnvisiblebar, defaultSorted, columns, modalShow, dataFetched };

    }

    handleonaddnew = (e) => {
        this.props.history.push("/Patienttypes/Create")
    }

    handleDeleteCase = (e, row) => {
        this.props.GetSelectedPatienttype(row.id)
        this.props.OpenDeleteModal()
    }

    componentDidMount() {
        this.props.GetAllPatienttype()
        this.props.GetAllDatatables()
    }

    componentDidUpdate() {
        if (!this.state.dataFetched &&
            this.props.Patienttypes.list.length !== 0 &&
            !this.props.Patienttypes.isLoading &&
            !this.props.Datatables.isLoading) {
            this.setState({ dataFetched: true }, () => {
                this.props.Datatables.list.forEach((item, index) => {
                    if (item.tablename === ROUTES.PATIENTTYPE) {
                        this.setState({ columns: JSON.parse(item.json) })
                    } else {
                        this.props.CreateDatatable({
                            id: 0,
                            tablename: ROUTES.PATIENTTYPE,
                            json: JSON.stringify(this.state.columns),
                            concurrencyStamp: null,
                            createdUser: "",
                            updatedUser: null,
                            deleteUser: null,
                            createTime: null,
                            updateTime: null,
                            deleteTime: null,
                            isActive: true,
                        })
                    }
                })
                if (this.props.Datatables.list.length === 0) {
                    this.props.CreateDatatable({
                        id: 0,
                        tablename: ROUTES.PATIENTTYPE,
                        json: JSON.stringify(this.state.columns),
                        concurrencyStamp: null,
                        createdUser: "",
                        updatedUser: null,
                        deleteUser: null,
                        createTime: null,
                        updateTime: null,
                        deleteTime: null,
                        isActive: true,
                    })
                }

            })
        }
    }

    handlecolumnview = () => {
        this.props.UpdateDatatable({
            id: 0,
            tablename: ROUTES.PATIENTTYPE,
            json: JSON.stringify(this.state.columns),
            concurrencyStamp: null,
            createdUser: "",
            updatedUser: null,
            deleteUser: null,
            createTime: null,
            updateTime: null,
            deleteTime: null,
            isActive: true,
        })
    }

    render() {
        const { SearchBar } = Search;
        const Data = this.props.Patienttypes.list
        const Columns = this.state.columns
        return (
            <div>
                <Columnmanagement
                    show={this.props.Datatables.isModalOpen}
                    onHide={() => this.props.CloseModal()}
                />
                <DeleteCaseModal
                    show={this.props.Patienttypes.isModalOpen}
                    onHide={() => this.props.CloseDeleteModal()}
                />
                {
                    this.props.Patienttypes.isLoading ? <Spinner /> :
                        <div className="row datatable">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className='row'>
                                            <div className='col-6 d-flex justify-content-start'>
                                                <h4 className="card-title">Hasta Türleri</h4>
                                            </div>
                                            <div className='col-6 d-flex justify-content-end'>
                                                <button style={{ minWidth: '30px', height: '30px' }} className="btn btn-primary mr-2" onClick={() => 
                                                    {this.props.Updateitem(Columns) 
                                                    this.props.OpenModal() }}
                                                    >Görünüm</button>
                                                <button style={{ minWidth: '120px', height: '30px' }} onClick={this.handleonaddnew} className="btn btn-primary mr-2">Yeni Hasta Türü</button>
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
                                                                {this.state.columnvisiblebar ?
                                                                    <div>
                                                                        <this.CustomToggleList {...props.columnToggleProps} />
                                                                        <hr />
                                                                    </div>
                                                                    : <></>}
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
                        </div>
                }
            </div >
        )
    }
}

const mapStateToProps = (state) => ({
    Patienttypes: state.Patienttypes,
    Datatables: state.Datatables
})

const mapDispatchToProps = {
    GetAllPatienttype, GetSelectedPatienttype, OpenDeleteModal, CloseDeleteModal, GetAllDatatables, CreateDatatable, Updateitem,
    OpenModal, CloseModal
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Patienttypes))





