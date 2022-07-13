import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { GetAllUsers, CloseDeleteModal, DeleteUser } from '../../Redux/actions/UserAction'

export class Delete extends Component {

    DeleteHandle = async () => {
       await this.props.DeleteUser(this.props.Users.selected_user)
       await this.props.GetAllUsers()
       await this.props.CloseDeleteModal()
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
                        Kullanıcı Silme
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        {this.props.Users.selected_user.username} Kullanıcısını silmek istediğinize Eminmisiniz?
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
    Users: state.Users,
})

const mapDispatchToProps = { GetAllUsers,  CloseDeleteModal,DeleteUser }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Delete))






