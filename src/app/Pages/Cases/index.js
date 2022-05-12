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

export class Cases extends Component {

    constructor(props) {
        super(props)
        var currentitem = []
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
                type : 'number',
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
                type:'date',
                hidden: true
            },
            , {
                dataField: 'updateTime',
                text: 'Güncelleme Tarihi',
                sort: true,
                type:'date',
                hidden: true
            },
            , {
                dataField: 'deletetime',
                text: 'Silme Tarihi',
                sort: true,
                type:'date',
                hidden: true
            },
            , {
                dataField: 'isActive',
                text: 'Aktiflik Durumu',
                sort: true,
                type:'bool'
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
                        this.props.history.push('/Stock/' + row.id)
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
        
        this.state = { currentitem, defaultSorted, columns, SearchBar };

    }

    handleonaddnew = (e) => {
        this.props.history.push("/Cases/Create")
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
                    this.props.history.push("/Login")
                }
            } else {
                cogoToast.error('Veri Alınırken Hata Alındı', this.toastoptions)
                this.props.history.push("/Login")
            }
        })
        if (response !== undefined) {
            this.props.setCases(response.data);
            this.setState({ currentitem: this.props.AllCases.AllCases })
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
                                        <h4 className="card-title">Durumlar</h4>
                                    </div>
                                    <div className='col-6 d-flex justify-content-end'>
                                        <button style={{minWidth:'120px',height:'30px'}} onClick={this.handleonaddnew} className="btn btn-primary mr-2">Yeni Durum</button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                    <ToolkitProvider
                                            keyField="id"
                                            bootstrap4
                                            data={this.state.currentitem}
                                            columns={this.state.columns}
                                        >
                                            {
                                                props => (
                                                    <div>
                                                        <div className="d-flex align-items-center">
                                                            <p className="mb-2 mr-2">Arama Yap:</p>
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
    SelectedCase: state.SelectedCase
})

const mapDispatchToProps = { setCases, selectedCase, removeselectedCase }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cases))