import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { GetAllCasesSettings, GetSelectedCase, CloseDeleteModal, DeleteCase, ClearSelectedCase } from '../../Redux/actions/CaseActions'

export class Delete extends Component {

    DeleteHandle = async () => {
        await this.props.DeleteCase(this.props.Cases.selected_case)
        await this.props.ClearSelectedCase()
        await this.props.GetAllCasesSettings()
        await this.props.CloseDeleteModal()
    }

    componentWillUnmount() {
        this.props.ClearSelectedCase()
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
                    <Button onClick={() => { this.DeleteHandle()}}>Sil</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => ({
    Cases: state.Cases,
})

const mapDispatchToProps = { GetAllCasesSettings, GetSelectedCase, CloseDeleteModal, DeleteCase, ClearSelectedCase }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Delete))






