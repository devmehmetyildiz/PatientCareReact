import React, { Component } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import Select from 'react-select';
import { MARIALSTATUS, BIOLOGICALAFFINITY } from '../../../Utils/Constants';
import Popup from '../../../Utils/Popup';
import "../../../../assets/styles/Pages/Activestock.scss"

const Createrecieveform = (props) => {
  const { data, refreshdata, selectstyle } = props

  if (data.diagnosies.length === 0) {
    data.diagnosies.push({
      id: 0,
      reportid: '',
      diagnosisname: '',
      diagnosisstatus: '',
      info: '',
      concurrencyStamp: '',
      createdUser: '',
      updatedUser: '',
      deleteUser: '',
      createTime: null,
      updateTime: null,
      deleteTime: null,
      isActive: true
    });
    refreshdata(data);
  }


  const handleonchange = (e) => {
    console.log('e: ', e);
    const { id, value } = e.target
    const datatemp = data
    datatemp[e.target.id] = e.target.value
    refreshdata((data) => ({ ...data, [id]: value }));
  }

  const diagnosiesitemchange = (e, index) => {
    const { id, value } = e.target
    const prevdata = data.diagnosies[index]
    prevdata[id] = value
    refreshdata((data) => ({ ...data, prevdata }));
  }

  const addItem = (e) => {
    console.log('e: ', e);
    e.preventDefault()
    const items = { ...data };
    console.log('items.diagnosies: ', items.diagnosies);
    items.diagnosies.push({
      id: data.diagnosies[data.diagnosies.length - 1].id + 1,
      reportid: '',
      diagnosisname: '',
      diagnosisstatus: '',
      info: '',
      concurrencyStamp: '',
      createdUser: '',
      updatedUser: '',
      deleteUser: '',
      createTime: null,
      updateTime: null,
      deleteTime: null,
      isActive: true
    });
    refreshdata((data) => ({ ...data, items }));

  }

  const deleteItem = (index) => {
    if (index === 0) {
      Popup("Error", "Silme Hatası", "İlk Kayıt Silinemez")
      return
    }
    const items = { ...data };
    items.diagnosies.splice(index, 1);
    refreshdata((data) => ({ ...data, items }));
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Hasta Yakını Bilgi Girme Ekranı
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Hastalar > Yeni</h4>
            <form className="form-sample" >
              <div className="row">
                <div className="col-12">
                  <div className='row'>
                    <div className='col-4'>
                      <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Rapor Tarihi</label>
                        <Form.Control
                          id="Reportdate"
                          value={data.Reportdate}
                          type="text"
                          placeholder="Rapor No"
                          onChange={handleonchange}
                        />
                      </Form.Group>
                      <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Rapor Adı</label>
                        <Form.Control
                          id="reportname"
                          value={data.reportname}
                          type="text"
                          placeholder="Rapor Adı"
                          onChange={handleonchange}
                        />
                      </Form.Group>
                      <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Gönderen Kurum</label>
                        <Form.Control
                          id="sendinginstitution"
                          value={data.sendinginstitution}
                          type="text"
                          placeholder="Gönderen Kurum"
                          onChange={handleonchange}
                        />
                      </Form.Group>
                    </div>
                    <div className='col-4'>
                      <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Temyiz Tarihi</label>
                        <Form.Control
                          id="appealdate"
                          value={data.appealdate}
                          type="date"
                          placeholder="Temyiz Tarihi"
                          onChange={handleonchange}
                        />
                      </Form.Group>
                      <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Engel Adı</label>
                        <Form.Control
                          id="disabilityname"
                          value={data.disabilityname}
                          type="text"
                          placeholder="Engel Adı"
                          onChange={handleonchange}
                        />
                      </Form.Group>
                      <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Engel Açıklaması</label>
                        <Form.Control
                          id="disabilityinfo"
                          value={data.disabilityinfo}
                          type="text"
                          placeholder="Engel Açıklaması"
                          onChange={handleonchange}
                        />
                      </Form.Group>
                    </div>
                    <div className='col-4'>
                      <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Engel Yüzdesi</label>
                        <Form.Control
                          id="disabilityrate"
                          value={data.disabilityrate}
                          type="int"
                          placeholder="Engel Yüzdesi"
                          onChange={handleonchange}
                        />
                      </Form.Group>
                      <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Çalışamayacağı İşler</label>
                        <Form.Control
                          id="wontworkjobs"
                          value={data.wontworkjobs}
                          type="text"
                          placeholder="Çalışamayacağı İşler"
                          onChange={handleonchange}
                        />
                      </Form.Group>
                      <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Sürekli mi?</label>
                        <Form.Control
                          id="Ispermanent"
                          value={data.Ispermanent}
                          type="text"
                          placeholder="Sürekli mi?"
                          onChange={handleonchange}
                        />
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <div className='container border m-2'>
                    <div className='form' onSubmit={(e) => { e.preventDefault() }}>
                      <div className='row'>
                        <div className='col'>
                          {data.diagnosies.map((item, index) => {
                            return (
                              <div key={item.id} className="row mb-2">
                                <div className="col mb-2 mr-sm-2 mb-sm-0" style={{ flexFlow: 'column' }}>
                                  <div className='row'>
                                    {(index === 0) ?
                                      <div className='col' style={{ flexFlow: 'row', whiteSpace: 'nowrap' }}>
                                        <label style={{ marginBottom: '2px' }} >Teşhis Adı</label>
                                      </div>
                                      : null}
                                  </div>
                                  <input
                                    id='diagnosisname'
                                    type="text"
                                    className="form-control"
                                    placeholder="Teşhis Adı"
                                    value={item.diagnosisname}
                                    onChange={(event) => diagnosiesitemchange(event, index)}
                                  />
                                </div>
                                <div className="col mb-2 mr-sm-2 mb-sm-0" style={{ flexFlow: 'column' }}>
                                  <div className='row'>
                                    {(index === 0) ?
                                      <div className='col' style={{ flexFlow: 'row', whiteSpace: 'nowrap' }}>
                                        <label style={{ marginBottom: '2px' }} >Teşhis Durumu</label>
                                      </div>
                                      : null}
                                  </div>
                                  <input
                                    id='diagnosisstatus'
                                    type="text"
                                    className="form-control"
                                    placeholder="Teşhis Durumu"
                                    value={item.diagnosisstatus}
                                    onChange={(event) => diagnosiesitemchange(event, index)}
                                  />
                                </div>
                                {(index > 0) ?
                                  <div className="col mb-2 mr-sm-2 mb-sm-0" style={{ flexFlow: 'column' }}>
                                    <div className='row'>
                                      {(index === 0) ?
                                        <div className='col' style={{ flexFlow: 'row', whiteSpace: 'nowrap' }}>
                                          <label style={{ marginBottom: '2px' }} >Açıklama</label>
                                        </div>
                                        : null}
                                    </div>
                                    <input
                                      id='info'
                                      type="text"
                                      placeholder="Açıklama"
                                      className="form-control"
                                      value={item.info}
                                      onChange={(event) => diagnosiesitemchange(event, index)}
                                    />
                                  </div>
                                  :
                                  <div className="col mb-2 mr-sm-2 mb-sm-0 firstrow" style={{ flexFlow: 'column' }}>
                                    <div className='row'>
                                      {(index === 0) ?
                                        <div className='col' style={{ flexFlow: 'row', whiteSpace: 'nowrap' }}>
                                          <label style={{ marginBottom: '2px' }} >Açıklama</label>
                                        </div>
                                        : null}
                                    </div>
                                    <input
                                      id='info'
                                      type="text"
                                      placeholder="Açıklama"
                                      className="form-control"
                                      value={item.info}
                                      onChange={(event) => diagnosiesitemchange(event, index)}
                                    />
                                  </div>
                                }
                                {(index > 0) ? <button className="btn btn-danger btn-sm icon-btn ml-2" onClick={() => deleteItem(index)}><i className="mdi mdi-delete"></i></button> : null}
                              </div>
                            )
                          })}
                        </div>
                        <div className='col' style={{ maxWidth: '30px', marginRight: '10px' }}>
                          <button className="btn btn-info btn-sm icon-btn mb-2" style={{ verticalAlign: 'top' }} onClick={addItem} ><i className="mdi mdi-plus"></i></button>
                        </div>
                      </div >
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Kapat</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Createrecieveform

/*
        public string Activepatientid { get; set; }
        public DateTime? Reportdate { get; set; }
        public string Itemstxt { get; set; }
        [NotMapped]
        public List<string> Items { get; set; }
        public string Submittername { get; set; }
        public string Submittercountryid { get; set; }
  */




