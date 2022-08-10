import React, { Component } from 'react'
import { connect } from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { withRouter } from 'react-router-dom';
import { GetSelectedStockmovement, GetSelectedStock } from '../../Redux/actions/StockmovementActions'
import Spinner from '../../shared/Spinner'
import { MOVEMENTTYPES } from '../../Utils/Constants';
export class Stockmovements extends Component {

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
      }, {
        dataField: 'stockname',
        text: 'Ürün Adı',
        sort: true
      }, {
        dataField: 'departmentname',
        text: 'Departman',
        sort: true
      }, {
        dataField: 'username',
        text: 'İşlem yapan kullanıcı',
        sort: true
      }
      , {
        dataField: 'movementtypename',
        text: 'Hareket türü',
        sort: true
      }, {
        dataField: 'amount',
        text: 'Miktar',
        sort: true,
      }, {
        dataField: 'prevvalue',
        text: 'Önceki Değer',
        sort: true,
      }, {
        dataField: 'newvalue',
        text: 'Sonraki değer',
        sort: true,
      },
      {
        dataField: 'movementdate',
        text: 'Hareket Tarihi',
        sort: true,
        type: 'date',
        formatter: (cellContent, row) => {
          if (row.movementdate !== null && row.movementdate !== undefined) {
            return row.movementdate.split('T')[0]
          }
          else
            return row.movementdate
        }
      }

    ];
    this.state = { columnvisiblebar, defaultSorted, columns, modalShow };
  }

  componentDidMount() {
    let guid = this.props.match.params.StockGuid
    if (guid !== 'WithoutOption' && this.isUUID(guid)) {
      this.props.GetSelectedStockmovement(this.props.match.params.StockGuid)
    }
  }

  isUUID = (uuid) => {
    let s = "" + uuid;
    s = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
    if (s === null) {
      return false;
    }
    return true;
  }

  render() {
    const { SearchBar } = Search;
    let Data = []
    this.props.Stockmovements.selected_list.forEach((element, index) => {
      let classname = ""
      if (index % 2 == 0) {
        classname = "timeline-wrapper " + (MOVEMENTTYPES.find(item => item.value === element.movementtype)).timelineclass
      } else {
        classname = "timeline-wrapper timeline-inverted " + (MOVEMENTTYPES.find(item => item.value === element.movementtype)).timelineclass
      }
      Data.push({
        movement: element,
        itemclassname: classname
      })
    });
    let stockname = ""
    let skt = ""
    let barcodeno = ""
    if (this.props.Stockmovements.selected_list.length !== 0) {
      stockname = this.props.Stockmovements.selected_list[0].activestock.stock.name
      skt = this.props.Stockmovements.selected_list[0].activestock.skt
      barcodeno = this.props.Stockmovements.selected_list[0].activestock.barcodeno
    }
    const Columns = this.state.columns
    return (
      <div>
        {this.props.Stockmovements.isLoading ? <Spinner /> :
          <>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">{stockname} Ürün Hareketi</h4>
                    <p className="card-description">Skt:{skt.split('T')[0]}  Barkod No:{barcodeno}</p>
                    <div className="mt-5">
                      <div className="timeline">
                        {Data.map(item =>
                          <div className={item.itemclassname}>
                            <div className="timeline-badge"></div>
                            <div className="timeline-panel">
                              <div className="timeline-heading">
                                <h6 className="timeline-title">{item.movement.movementtypename}</h6>
                              </div>
                              <div className="timeline-body">
                                <p>{item.movement.username} kullanıcısı tarafından gerçekleştirildi. İşlem sonucunda ürün sayısı {item.movement.newvalue} olarak güncellendi</p>
                              </div>
                              <div className="timeline-footer d-flex align-items-center flex-wrap">
                                <span>Eski Değer : {item.movement.prevvalue} Yeni Değer: {item.movement.newvalue} Değişim Miktarı : {item.movement.amount}</span>
                                <span className="ml-md-auto font-weight-bold">İşlem Tarihi : {item.movement.movementdate.split('T')[0]}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  Stockmovements: state.Stockmovements,
})

const mapDispatchToProps = { GetSelectedStockmovement, GetSelectedStock }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Stockmovements))





