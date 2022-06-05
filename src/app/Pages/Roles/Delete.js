import React, { Component } from 'react'
import { Button, Modal, Form, Col, Row, Container } from 'react-bootstrap';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import {  CloseDeleteModal, DeleteRole } from '../../Redux/actions/RoleActions'

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
                        Rol Silme
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        {this.props.Roles.selected_role.name} rolünü silmek istediğinize eminmisiniz?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { this.props.CloseDeleteModal() }}>Vazgeç</Button>
                    <Button onClick={() => { this.props.DeleteRole(this.props.Roles.selected_role) }}>Sil</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => ({
    Roles: state.Roles,
})

const mapDispatchToProps = {  CloseDeleteModal, DeleteRole }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Delete))






