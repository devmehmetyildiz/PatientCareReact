import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { GetAllStocks, GetSelectedStock, CloseDeleteModal, DeleteStock,ClearSelectedStock } from '../../Redux/actions/StockActions'

export class Delete extends Component {

    DeleteHandle = async () => {
         this.props.DeleteStock(this.props.Stocks.selected_stock)
         this.props.ClearSelectedStock()
         this.props.CloseDeleteModal()
        //await this.props.GetAllStocks()
      }
      
      componentWillUnmount() {
        this.props.ClearSelectedStock()
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Ürün Silme
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        {this.props.Stocks.selected_stock.name} ürününü silmek istediğinize Eminmisiniz?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { this.props.CloseDeleteModal() }}>Vazgeç</Button>
                    <Button onClick={() => { this.DeleteHandle()}}>Sil</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => ({
    Stocks: state.Stocks,
})

const mapDispatchToProps = { GetAllStocks, GetSelectedStock, CloseDeleteModal, DeleteStock, ClearSelectedStock }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Delete))






