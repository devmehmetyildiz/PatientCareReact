import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { GetAllPatienttype, CloseDeleteModal,DeletePatienttype, ClearSelectedPatienttype } from '../../Redux/actions/PatienttypeActions'

export class Delete extends Component {

    DeleteHandle = async () => {
        await this.props.DeletePatienttype(this.props.Patienttypes.selected_patienttype)
        await this.props.GetAllPatienttype()
        await this.props.CloseDeleteModal()
    }

    componentWillUnmount() {
        this.props.ClearSelectedPatienttype()
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
                        Hasta Tür Silme
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        {this.props.Patienttypes.selected_patienttype.name} hasta türünü silmek istediğinize Eminmisiniz?
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
    Patienttypes: state.Patienttypes,
})

const mapDispatchToProps = { GetAllPatienttype, CloseDeleteModal,DeletePatienttype, ClearSelectedPatienttype }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Delete))






