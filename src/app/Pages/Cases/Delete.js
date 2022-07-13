import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { GetAllCases, GetSelectedCase, CloseDeleteModal, DeleteCase } from '../../Redux/actions/CaseActions'

export class Delete extends Component {
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
                        Durum Silme
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        {this.props.Cases.selected_case.name} durumunu silmek istediğinize Eminmisiniz?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { this.props.CloseDeleteModal() }}>Vazgeç</Button>
                    <Button onClick={() => { this.props.DeleteCase(this.props.Cases.selected_case) }}>Sil</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => ({
    Cases: state.Cases,
})

const mapDispatchToProps = { GetAllCases, GetSelectedCase, CloseDeleteModal, DeleteCase }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Delete))






