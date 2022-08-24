import React, { useState, useEffect } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import filterFactory, { textFilter, numberFilter } from 'react-bootstrap-table2-filter';
import { OverlayTrigger, Tooltip, Button, ButtonToolbar, Popover } from 'react-bootstrap';
import { COLUMNTYPES } from './Constants';
import "../../assets/styles/Pages/Datatable.scss"

export const Datatable = (props) => {
    const { columns, data } = props
    const [filters, setfilters] = useState([])
    const defaultSorted = [{
        dataField: 'Id',
        order: 'asc'
    }]

    const Removefilter = (id) => {
        const filterdata = filters
        filterdata.forEach((element, index) => {
            if (element.id === id) {
                filterdata.splice(index, 1)
            }
        }
        )
        setfilters([...filters], filterdata)
    }

    const Addfilter = (id, filtertext, displaytext) => {
        const filterdata = filters
        if (filtertext === '') {
            filterdata.forEach((element, index) => {
                if (element.id === id) {
                    filterdata.splice(index, 1)
                }
            });
        } else {
            let ishave = false
            filterdata.forEach(element => {
                if (element.id === id) {
                    ishave = true
                    element.filtertext = filtertext
                }
            });
            if (!ishave) {
                filterdata.push({ id: id, filtertext: filtertext, displaytext: displaytext })
            }
        }
        setfilters([...filters], filterdata)
    }

    function columnFormatter(column, colIndex) {
        let filtervalue = ""
        const item = filters.find(element => element.id === column.dataField)
        if (item) {
            filtervalue = item.filtertext
        }
        return (
            <div className='row'>
                <div className='col-6 containerclasstext'>
                    <div > {column.text} </div>
                </div>
                <div className='col-6 containerclassicons'>
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
                                    <input onChange={(e) => { Addfilter(column.dataField, e.target.value, column.text) }} className="form-control" placeholder='İlgili Kelimeyi Arayınız' name='name'
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


        );
    }

    columns.forEach(element => {
        if (element.Formatheader) {
            element.headerFormatter = columnFormatter
        }
        if (element.Columntype === COLUMNTYPES.TEXT) {
            let filtervalue = ""
            let value = filters.find(item => item.id === element.dataField)
            if (value) {
                filtervalue = value.filtertext
            }
            
            element.filter = textFilter({
                onFilter: filtervalue => console.log(`Filter Value: ${filtervalue}`)
              })
        }
    });
    console.log('columns: ', columns);
    return (
        <div>
            {filters.length > 0 ?
                <div className='row' style={{ display: 'flex', flexWrap: 'nowrap', marginBottom: '10px' }}>
                    <h5 className='mr-5'> Filtreler </h5>
                    {filters.map(filter =>
                        <div className='mr-2 d-flex filtereditem' style={{ flexWrap: 'nowrap' }}>
                            {filter.displaytext} : {filter.filtertext}
                            <i onClick={() => { Removefilter(filter.id) }} style={{ cursor: 'pointer' }} className="mdi mdi-bookmark-remove ml-4 "></i>
                        </div>
                    )
                    }
                    <span onClick={() => setfilters([])} style={{ color: 'red', cursor: 'pointer', fontSize: '13px', marginTop: '4px' }}>Hepsini Temizle</span>

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
}

export default Datatable