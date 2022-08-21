import axios from 'axios';
import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { GetAllFiles, CloseDeleteModal, DeleteFile, ClearSelectedFile } from '../../Redux/actions/FileActions'
import { ROUTES } from '../../Utils/Constants';
import { GetToken } from '../../Utils/TokenValidChecker';

export class Delete extends Component {

  constructor(props) {
    super(props)
    const isDataFetched = false
    const file = {}
    this.state = { file, isDataFetched }
  }

  DeleteHandle = async () => {
    await this.props.DeleteFile(this.props.Files.selected_file)
    await this.props.GetAllFiles()
    await this.props.CloseDeleteModal()
    await this.props.ClearSelectedFile()
  }

  componentDidUpdate() {
    if (
      this.props.Files.selected_file.id !== 0 &&
      !this.props.Files.isLoading &&
      !this.state.isDataFetched
    ) {
      this.setState({ isDataFetched: true }, () => {
        axios
          .get(process.env.REACT_APP_BACKEND_URL + `/${ROUTES.FILE}/GetFile?ID=${this.props.Files.selected_file.concurrencyStamp}`, {
            headers: { Authorization: `Bearer ${GetToken()}` },
            responseType: "arraybuffer",
          })
          .then((response) => {
            console.log('response: ', response);
            let data = `data:${response.headers["content-type"]
              };base64,${new Buffer(response.data, "binary").toString("base64")}`;
            console.log("aldım")
            this.setState({ file: data })
          })
      })

    }
  }

  componentWillUnmount() {
    this.props.ClearSelectedFile()
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
            Dosya Silme
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img style={{ objectFit:'contain', margin: '10px', width: '200px', height: '200px' }} src={this.state.file} className="card-img-top" />
          <p>
            {this.props.Files.selected_file.name} dosyasını silmek istediğinize Eminmisiniz?
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
  Files: state.Files,
})

const mapDispatchToProps = { GetAllFiles, CloseDeleteModal, DeleteFile, ClearSelectedFile }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Delete))






