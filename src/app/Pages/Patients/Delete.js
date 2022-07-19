import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { GetAllPatients, CloseDeleteModal,DeletePatient, ClearSelectedPatient } from '../../Redux/actions/PatientActions'

export class Delete extends Component {

    DeleteHandle = async () => {
        await this.props.DeletePatient(this.props.Patients.selected_patient)
        await this.props.GetAllPatients()
        await this.props.CloseDeleteModal()
    }

    componentWillUnmount() {
        this.props.ClearSelectedPatient()
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
                        Tanımlı Hasta Silme
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        {this.props.Patients.selected_patient.name} {this.props.Patients.selected_patient.surname} hastasını silmek istediğinize Eminmisiniz?
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
    Patients: state.Patients,
})

const mapDispatchToProps = { GetAllPatients, CloseDeleteModal,DeletePatient,ClearSelectedPatient }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Delete))






