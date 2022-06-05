import React, { Component } from 'react'
import { connect } from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { withRouter } from 'react-router-dom';
import ToggleColumns from "../../Components/Common/ToggleColumns"
import { GetAllStations, GetSelectedStation, OpenDeleteModal, CloseDeleteModal } from '../../Redux/actions/StationAction'
import Spinner from '../../shared/Spinner'
import DeleteCaseModal from "./Delete"
import { Form } from "react-bootstrap";

export class Stations extends Component {

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
            },  {
                dataField: 'name',
                text: 'İsim',
                sort: true
            }, {
                dataField: 'normalizedName',
                text: 'Normalize İsim',
                sort: true,
                hidden: true
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
            , {
                dataField: 'createTime',
                text: 'Oluşturma Tarihi',
                sort: true,
                type: 'date',
                hidden: true
            },
            , {
                dataField: 'updateTime',
                text: 'Güncelleme Tarihi',
                sort: true,
                type: 'date',
                hidden: true
            },
            , {
                dataField: 'deletetime',
                text: 'Silme Tarihi',
                sort: true,
                type: 'date',
                hidden: true
            },
            , {
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



    CustomToggleList = ({
        columns,
        onColumnToggle,
        toggles
    }) => (
        <div className="text-center">
            {columns
                .map(column => ({
                    ...column,
                    toggle: toggles[column.dataField]
                }))
                .map((column, index) => (
                    <Form.Check
                        type="checkbox"
                        key={column.dataField}
                        inline
                        label={column.text}
                        id={column.dataField}
                        //aria-pressed={(column.toggle) ? "true" : "false"}
                        checked={column.toggle}
                        aria-checked={column.toggle ? "true" : "false"}
                        onChange={() => onColumnToggle(column.dataField)}
                    //onClick={() => onColumnToggle(column.dataField)}
                    />
                ))}
        </div>
    );

    handleonaddnew = (e) => {
        this.props.history.push("/Stations/Create")
    }

    handleDeleteCase = (e, row) => {
        this.props.GetSelectedStation(row.id)
        this.props.OpenDeleteModal()
    }

    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        await this.props.GetAllStations();
    };


    render() {
        const { SearchBar } = Search;
        const Data = this.props.Stations.list
        const Columns = this.state.columns
        return (
            <div>
                <DeleteCaseModal
                    show={this.props.Stations.isModalOpen}
                    onHide={() => this.props.CloseDeleteModal()}
                />
                {this.props.Stations.isLoading ? <Spinner /> :
                    <div className="row datatable">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className='row'>
                                        <div className='col-6 d-flex justify-content-start'>
                                            <h4 className="card-title">Durumlar</h4>
                                        </div>
                                        <div className='col-6 d-flex justify-content-end'>
                                           {/*  <button style={{ minWidth: '30px', height: '30px' }} onClick={() => { this.setState({ columnvisiblebar: !this.state.columnvisiblebar }) }}>Toggle</button> */}
                                            <button style={{ minWidth: '120px', height: '30px' }} onClick={this.handleonaddnew} className="btn btn-primary mr-2">Yeni Durum</button>
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
                    </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    Stations: state.Stations,
})

const mapDispatchToProps = { GetAllStations, GetSelectedStation, OpenDeleteModal, CloseDeleteModal }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cases))





