import React from 'react'
import { Modal } from 'react-bootstrap'

export default function Createapplicant() {

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
        <Button onClick={() => { this.DeleteHandle() }}>Sil</Button>
      </Modal.Footer>
    </Modal>
  )
}






