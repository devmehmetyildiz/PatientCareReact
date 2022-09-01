import React, { useState, useEffect } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import filterFactory, { textFilter, numberFilter } from 'react-bootstrap-table2-filter';
import { OverlayTrigger, Tooltip, Button, ButtonToolbar, Popover } from 'react-bootstrap';
import { COLUMNTYPES } from './Constants';
import "../../assets/styles/Pages/Datatable.scss"
import { connect } from 'react-redux'
import "../../assets/styles/Pages/File.scss"


export const Datatable = (props) => {
    const { columns, data } = props
    const [filters, setfilters] = useState([])
    const [showFilter, setshowFilter] = useState(false)
    const defaultSorted = [{
        dataField: 'Id',
        order: 'asc'
    }]

    const handleshowfilter = () => {
        let isok = false
        filters.forEach(element => {
            if (element.filtertext !== '') {
                isok = true
            }
        });
        setshowFilter(isok)
    }

    const Removefilter = (id) => {
        const filterdata = filters
        filterdata.forEach((element, index) => {
            if (element.id === id) {
                element.filtertext = ''
                element.func('')
            }
        }
        )
        handleshowfilter()
        setfilters([...filters], filterdata)
    }

    const Clearallfilter = () => {
        const filterdata = filters
        filterdata.forEach((element, index) => {
            element.filtertext = ''
            element.func('')
        })
        handleshowfilter()
        setfilters([...filters], filterdata)
    }

    const Addfilter = (id, filtertext, displaytext) => {
        const filterdata = filters
        filterdata.forEach(element => {
            if (element.id === id) {
                element.filtertext = filtertext
                element.func(filtertext)
            }
        });
        handleshowfilter()
        setfilters([...filters], filterdata)
    }

    columns.forEach(element => {
        if (element.Formatheader) {
            element.headerFormatter = columnFormatter
        }
        if (element.Columntype === COLUMNTYPES.TEXT) {
            const filterdata = filters
            if (!(filterdata.find(e => e.id === element.dataField))) {
                filterdata.push({ id: element.dataField, filtertext: '', displaytext: '', func: undefined })
                setfilters([...filters], filterdata)
            }
            element.filter = textFilter({
                getFilter: (filter) => {
                    filters.find(u => u.id === element.dataField).func = filter;
                }
            })
        }
    });

    return (
        <div>
            {showFilter ?
                <div className='row' style={{ display: 'flex', flexWrap: 'nowrap', marginBottom: '10px' }}>
                    <h5 className='mr-5'> Filtreler </h5>
                    {filters.map(filter =>
                        filter.filtertext.length > 0 ?
                            <div className='mr-2 d-flex filtereditem' style={{ flexWrap: 'nowrap' }}>
                                {filter.displaytext} : {filter.filtertext}
                                <i onClick={() => { Removefilter(filter.id) }} style={{ cursor: 'pointer' }} className="mdi mdi-bookmark-remove ml-4 "></i>
                            </div>
                            : null
                    )
                    }
                    <span onClick={() => Clearallfilter()} style={{ color: 'red', cursor: 'pointer', fontSize: '13px', marginTop: '4px' }}>Hepsini Temizle</span>

                </div> : null
            }
            <div className="row">
                <div className="col-12">
                    <ToolkitProvider
                        keyField="id"
                        bootstrap4
                        data={data}
                        columns={columns}
                        columnToggle
                    >
                        {
                            props => (
                                <div>
                                    <BootstrapTable
                                        defaultSorted={defaultSorted}
                                        pagination={paginationFactory()}
                                        {...props.baseProps}
                                        filter={filterFactory()}
                                        wrapperClasses="table-responsive"

                                    />
                                </div>
                            )
                        }
                    </ToolkitProvider>
                </div>
            </div>
        </div>

    )


    function columnFormatter(column, colIndex, { sortElement, filterElement }) {
        let filtervalue = ""
        const item = filters.find(element => element.id === column.dataField)
        if (item) {
            filtervalue = item.filtertext
        }
        return (
            <div className='containerclassheader'>
                <div className=' d-inline'>
                    <div className=' containerclasstext'>
                        <div className='text-nowrap'> {column.text} </div>
                        <div style={{ display: 'none' }}>{filterElement}</div>
                    </div>
                </div>
                <div className=' d-inline'>
                    <div className=' containerclassicons'>
                        <i style={{ cursor: 'pointer' }} className="ti-arrows-vertical"> </i>
                        <i style={{ cursor: 'pointer' }} className="ti-pin2"></i>
                        <OverlayTrigger
                            trigger="click"
                            placement="right"
                            rootClose={true}
                            overlay={
                                <Popover id="popover-basic">
                                    <Popover.Title as="h3">Filtre</Popover.Title>
                                    <Popover.Content>
                                        <input autoFocus onChange={(e) => { Addfilter(column.dataField, e.target.value, column.text) }} className="form-control" placeholder='İlgili Kelimeyi Arayınız' name='name'
                                            value={filtervalue}
                                        />
                                    </Popover.Content>
                                </Popover>
                            }
                        >
                            <i style={{ cursor: 'pointer' }} className="ti-pencil-alt"></i>
                        </OverlayTrigger>
                    </div>
                </div>
            </div>


        );
    }

}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Datatable)
