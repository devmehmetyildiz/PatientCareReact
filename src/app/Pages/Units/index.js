import React, { Component } from 'react'
import { connect } from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { GetAllUnits,GetSelectedUnit, OpenDeleteModal, CloseDeleteModal } from '../../Redux/actions/UnitActions'
import { withRouter } from 'react-router-dom';
import Spinner from "../../shared/Spinner"
import DeleteModal from "./Delete"


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
                dataField: 'name',
                text: 'Birim Adı',
                sort: true
            }, {
                dataField: 'concurrencyStamp',
                text: 'Unik ID',
                sort: true,
                hidden: true
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
                dataField: 'departmentstxt',
                text: 'Gerçerli Departmanlar',
                sort: false,
                type: 'string'
            }
            , {
                dataField: 'isActive',
                text: 'Aktiflik Durumu',
                sort: true,
                type: 'bool',
                hidden: true
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
                        this.props.history.push('/Units/' + row.id)
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
        await this.props.GetSelectedUnit(row.id)
        this.props.OpenDeleteModal()
    }

    changecolumnvisiblebar = () => {
        this.setState({ columnvisiblebar: !this.state.columnvisiblebar })
    }

    handleonaddnew = (e) => {
        this.props.history.push("/Units/Create")
    }

    componentDidMount() {
        this.props.GetAllUnits();
    }

    render() {
        const { SearchBar } = Search;
        const Data = this.props.Units.list
        const Columns = this.state.columns
        return (
            <div>
                <DeleteModal
                    show={this.props.Units.isModalOpen}
                    onHide={() => this.props.CloseDeleteModal()}
                />
                {this.props.Units.isLoading ? <Spinner /> :
                    <div className="row datatable">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className='row'>
                                        <div className='col-6 d-flex justify-content-start'>
                                            <h4 className="card-title">Birimler</h4>
                                        </div>
                                        <div className='col-6 d-flex justify-content-end'>
                                           {/*  <button style={{ minWidth: '30px', height: '30px' }} onClick={() => { this.setState({ columnvisiblebar: !this.state.columnvisiblebar }) }}>Toggle</button> */}
                                            <button style={{ minWidth: '120px', height: '30px' }} onClick={this.handleonaddnew} className="btn btn-primary mr-2">Yeni Birim</button>
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
    Units: state.Units
})

const mapDispatchToProps = { GetAllUnits,GetSelectedUnit, OpenDeleteModal, CloseDeleteModal  }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Units))