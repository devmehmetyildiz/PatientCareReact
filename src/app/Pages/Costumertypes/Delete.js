import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { GetAllCostumertypes, GetSelectedCostumertype, CloseDeleteModal, DeleteCostumertype, ClearSelectedCostumertype } from '../../Redux/actions/CostumertypeActions'

export class Delete extends Component {

    DeleteHandle = async () => {
       await  this.props.DeleteCostumertype(this.props.Costumertypes.selected_costumertype)
       await this.props.ClearSelectedCostumertype()
       await this.props.CloseDeleteModal()
       await this.props.GetAllCostumertypes()
    }

    componentWillUnmount() {
        this.props.ClearSelectedCostumertype()
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
                        Müşteri Türü Silme
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        {this.props.Costumertypes.selected_costumertype.name} durumunu silmek istediğinize Eminmisiniz?
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
    Costumertypes: state.Costumertypes,
})

const mapDispatchToProps = { GetAllCostumertypes, GetSelectedCostumertype, CloseDeleteModal, DeleteCostumertype, ClearSelectedCostumertype }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Delete))






