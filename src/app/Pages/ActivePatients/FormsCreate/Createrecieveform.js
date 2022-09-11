import React, { Component } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import Select from 'react-select';
import { MARIALSTATUS, BIOLOGICALAFFINITY } from '../../../Utils/Constants';
import Popup from '../../../Utils/Popup';
import "../../../../assets/styles/Pages/Activestock.scss"

const Createrecieveform = (props) => {
  const { data, refreshdata, selectstyle } = props

  if (data.items.length === 0) {
    data.items.push("");
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
    <>
      <div className='row'>
        <h4 className='m-2'>Teslim Eden Formu</h4>
      </div>
      <div className='row'>
        <div className="col-12">
          <div className='row'>
            <div className='col-4'>
              <Form.Group className="row m-2" >
                <label style={{ fontSize: "12px" }} className="col-form-label">Rapor Numarası</label>
                <Form.Control
                  id="reportno"
                  value={data.reportno}
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
    </>

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




