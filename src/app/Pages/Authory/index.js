import React, { Component } from 'react'
import { connect } from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import axios from 'axios';
import { GetToken } from '../../Utils/TokenValidChecker';
import { setCases, selectedCase, removeselectedCase } from '../../Redux/actions/CaseActions'
import { withRouter } from 'react-router-dom';
import cogoToast from 'cogo-toast';

export class Authory extends Component {

    constructor(props) {
        super(props)
        var currentitem = []
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
                dataField: 'roles',
                text: 'Yetkiler',
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
                        this.props.history.push('/Roles/' + row.id)
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

        this.state = { columnvisiblebar, currentitem, defaultSorted, columns,   SearchBar };
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


    changecolumnvisiblebar = () => {
        this.setState({ columnvisiblebar: !this.state.columnvisiblebar })
    }

    handleonaddnew = (e) => {
        this.props.history.push("/Roles/Create")
    }

    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        const response = await axios({
            method: 'get',
            data: this.state.currentitem,
            url: process.env.REACT_APP_BACKEND_URL + '/Authory/GetAll',
            headers: { Authorization: `Bearer ${GetToken()}` }
        }).catch(error => {
            if (error.response !== undefined) {
                if (error.response.status === '401') {
                    this.props.history.push("/Login")
                }
            } else {
                cogoToast.error('Veri Alınırken Hata Alındı', this.toastoptions)
                this.props.history.push("/Login")
            }
        })
        if (response !== undefined) {
            console.log('response: ', response.data);
            response.data.forEach((item, index) => {
                var text = item.roles.map((item) => {
                    return item.name;
                }).join(", ")
                item.roles = text;
            })
            this.setState({ currentitem: response.data })

        }
    };

    render() {
        return (
            <div>
                <div className="row datatable">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className='row'>
                                    <div className='col-6 d-flex justify-content-start'>
                                        <h4 className="card-title">Roller</h4>
                                    </div>
                                    <div className='col-6 d-flex justify-content-end'>
                                        <button style={{ minWidth: '30px', height: '30px' }} onClick={() => { this.setState({ columnvisiblebar: !this.state.columnvisiblebar }) }}>Toggle</button>
                                        <button style={{ minWidth: '120px', height: '30px' }} onClick={this.handleonaddnew} className="btn btn-primary mr-2">Yeni Yetki</button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <ToolkitProvider
                                            keyField="id"
                                            bootstrap4
                                            data={this.state.currentitem}
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

            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Authory))