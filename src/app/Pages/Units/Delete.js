import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { GetAllUnitsSettings, CloseDeleteModal,DeleteUnit, ClearSelectedUnit } from '../../Redux/actions/UnitActions'

export class Delete extends Component {

    DeleteHandle = async () => {
        await this.props.DeleteUnit(this.props.Units.selected_units)
        await this.props.GetAllUnitsSettings()
        await this.props.CloseDeleteModal()
    }

    componentWillUnmount() {
        this.props.ClearSelectedUnit()
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
                        Birim Silme
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        {this.props.Units.selected_unit.name} birimini silmek istediğinize Eminmisiniz?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { this.props.CloseDeleteModal() }}>Vazgeç</Button>
                    <Button onClick={() => { this.DeleteHandle() }}>Sil</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => ({
    Units: state.Units,
})

const mapDispatchToProps = { GetAllUnitsSettings, CloseDeleteModal,DeleteUnit,ClearSelectedUnit }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Delete))






