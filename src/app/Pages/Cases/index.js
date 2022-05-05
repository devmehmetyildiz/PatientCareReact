import React, { Component } from 'react'
import { connect } from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import axios from 'axios';
import { GetToken } from '../../Utils/TokenValidChecker';
import {setCases,selectedCase,removeselectedCase} from '../../Redux/actions/CaseActions'
import { withRouter } from 'react-router-dom';
import cogoToast from 'cogo-toast';

export class Cases extends Component {

    constructor(props) {
        super(props)
        const currentitem = []
        const { SearchBar } = Search;
        const defaultSorted = [{
            dataField: 'Id',
            order: 'asc'
        }] 
        const columns = [
            {
                dataField: 'Id',
                text: 'Id',
                sort: true
            }, {
                dataField: 'CaseGroup',
                text: 'Durum Grubu',
                sort: true
            }, {
                dataField: 'CaseStatus',
                text: 'Durum Değeri',
                sort: true
            }, {
                dataField: 'Name',
                text: 'İsim',
                sort: true
            }, {
                dataField: 'NormalizedName',
                text: 'Norm İsim',
                sort: true
            }, {
                dataField: 'ConcurrencyStamp',
                text: 'Guid',
                sort: true
            }, {
                dataField: 'CreatedUser',
                text: 'Oluşturan Kullanıcı',
                sort: true
            }, {
                dataField: 'UpdatedUser',
                text: 'Güncelleyen Kullanıcı',
                sort: true
            }, {
                dataField: 'DeleteUser',
                text: 'Silen Kullanıcı',
                sort: true
            },
            , {
                dataField: 'CreateTime',
                text: 'Oluşturma Tarihi',
                sort: true
            },
            , {
                dataField: 'UpdateTime',
                text: 'Güncelleyen Kullanıcı',
                sort: true
            },
            , {
                dataField: 'Deletetime',
                text: 'Silme Tarihi',
                sort: true
            },
            , {
                dataField: 'IsActive',
                text: 'Aktiflik Durumu',
                sort: true
            }, {
                dataField: 'update',
                text: 'Güncelle',
                sort: false,
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
                        this.props.history.push('/Stock/' + row.id)
                    }
                }
            }
            , {
                dataField: 'delete',
                text: 'Sil',
                sort: false,
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
        this.state = { currentitem, defaultSorted, columns, SearchBar };

    }

    componentDidMount() {
        console.log("didmounttayım")
        this.getData()
    }

    getData = async () => {
        const response = await axios({
            method: 'get',
            data: this.state.currentitem,
            url: process.env.REACT_APP_BACKEND_URL + '/Case/GetAll',
            headers: { Authorization: `Bearer ${GetToken()}` }
        }).catch(error => {
            if (error.response !== undefined) {
                if (error.response.status === '401') {
                    this.props.history.push("/User/login")
                }
            }else{
                cogoToast.error('Veri Alınırken Hata Alındı', this.toastoptions)
                this.props.history.push("/Login")
            }
        })
        if (response !== undefined) {
            console.log('response: ', response);
            this.props.setCases(response.data);
            this.setState({ currentitem: this.props.setCases.cases })
        }
    };

    render() {
        return (
            <div>
                <div className="row datatable">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Diller</h4>
                                <div className="row">
                                    <div className="col-12">
                                        <ToolkitProvider
                                            keyField="id"
                                            bootstrap4
                                            data={this.state.currentitem}
                                            columns={this.state.columns}
                                            search
                                        >
                                            {
                                                props => (
                                                    <div>
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
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    AllCases: state.AllCases,
    SelectedCase : state.SelectedCase
})

const mapDispatchToProps = { setCases,selectedCase,removeselectedCase }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cases))