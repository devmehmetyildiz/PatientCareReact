import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { GetAllDepartments, CloseDeleteModal, DeleteDepartment, ClearSelectedDepartment } from '../../Redux/actions/DepartmentAction'

export class Delete extends Component {

    DeleteHandle = async () => {
        await this.props.DeleteDepartment(this.props.Departments.selected_department)
        await this.props.GetAllDepartments()
        await this.props.CloseDeleteModal()
    }

    componentWillUnmount() {
        this.props.ClearSelectedDepartment()
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
                        Departman Silme
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        {this.props.Departments.selected_department.name} departmanını silmek istediğinize Eminmisiniz?
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
    Departments: state.Departments,
})

const mapDispatchToProps = { GetAllDepartments, CloseDeleteModal, DeleteDepartment, ClearSelectedDepartment }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Delete))






