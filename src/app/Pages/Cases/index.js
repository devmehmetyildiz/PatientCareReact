import React, { Component } from 'react'
import { connect } from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { withRouter } from 'react-router-dom';
import ToggleColumns from "../../Components/Common/ToggleColumns"
import { GetAllCases } from '../../Redux/actions/CaseActions'
import Spinner from '../../shared/Spinner'
export class Cases extends Component {

    constructor(props) {
        super(props)
      
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
                dataField: 'caseGroup',
                text: 'Durum Grubu',
                sort: true
            }, {
                dataField: 'caseStatus',
                text: 'Durum Değeri',
                sort: true
            }, {
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
                        this.props.history.push('/Stock/' + row.id)
                    }
                }
            }

        ];

        this.state = { columnvisiblebar,  defaultSorted, columns, SearchBar };

    }

    CustomToggleList = ({
        columns,
        onColumnToggle,
        toggles
    }) => (
        console.log(toggles),
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

    handleonaddnew = (e) => {
        this.props.history.push("/Cases/Create")
    }

    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        this.props.GetAllCases();
    };

    render() {
        return (
            <div>
                {this.props.Cases.isLoading ? <Spinner /> :
                    <div className="row datatable">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className='row'>
                                        <div className='col-6 d-flex justify-content-start'>
                                            <h4 className="card-title">Durumlar</h4>
                                        </div>
                                        <div className='col-6 d-flex justify-content-end'>
                                            <button style={{ minWidth: '30px', height: '30px' }} onClick={() => { this.setState({ columnvisiblebar: !this.state.columnvisiblebar }) }}>Toggle</button>
                                            <button style={{ minWidth: '120px', height: '30px' }} onClick={this.handleonaddnew} className="btn btn-primary mr-2">Yeni Durum</button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <ToolkitProvider
                                                keyField="id"
                                                bootstrap4
                                                data={this.props.Cases.list}
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
    Cases: state.Cases,
})

const mapDispatchToProps = { GetAllCases }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cases))