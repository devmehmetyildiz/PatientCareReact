import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import Select from 'react-select';
import { MARIALSTATUS, BIOLOGICALAFFINITY } from '../../../Utils/Constants';

const Createfirstapproachreport = (props) => {
  const { data, refreshdata } = props

  const handleonchange = (e) => {
    const { id, value } = e.target
    const datatemp = data
    datatemp[e.target.id] = e.target.value
    refreshdata((data) => ({ ...data, [id]: value }));
  }

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">İlk Görüşme ve Değerlendirme Formu > Yeni</h4>
        <form className="form-sample" >
          <div className="row">
            <div className="col-12">
              <div className='row'>
                <div className='col-4'>
                  <Form.Group className="row m-2" >
                    <label style={{ fontSize: "12px" }} className="col-form-label">Kabul Tarihi</label>
                    <Form.Control
                      id="acceptancedate"
                      value={data.acceptancedate}
                      type="date"
                      placeholder="Kabul Tarihi"
                      onChange={handleonchange}
                    />
                  </Form.Group>
                  <Form.Group className="row m-2" >
                    <label style={{ fontSize: "12px" }} className="col-form-label">Görüşme Tarihi</label>
                    <Form.Control
                      id="interviewdate"
                      value={data.interviewdate}
                      type="text"
                      placeholder="Görüşme Tarihi"
                      onChange={handleonchange}
                    />
                  </Form.Group>
                  <Form.Group className="row m-2" >
                    <label style={{ fontSize: "12px" }} className="col-form-label">İlk Görüşme Tarihi</label>
                    <Form.Control
                      id="healthinitialassesmentdate"
                      value={data.healthinitialassesmentdate}
                      type="date"
                      placeholder="İlk Görüşme Tarihi"
                      onChange={handleonchange}
                    />
                  </Form.Group>
                </div>
                <div className='col-4'>
                  <Form.Group className="row m-2" >
                    <label style={{ fontSize: "12px" }} className="col-form-label">Kontrol Eden</label>
                    <Form.Control
                      id="controllername"
                      value={data.controllername}
                      type="text"
                      placeholder="Kontrol Eden"
                      onChange={handleonchange}
                    />
                  </Form.Group>
                  <Form.Group className="row m-2" >
                    <label style={{ fontSize: "12px" }} className="col-form-label">Geliş Sebebi</label>
                    <Form.Control
                      id="reasonforhealtcare"
                      value={data.reasonforhealtcare}
                      type="text"
                      placeholder="Geliş Sebebi"
                      onChange={handleonchange}
                    />
                  </Form.Group>

                </div>
                <div className='col-4'>
                  <Form.Group className="row m-2" >
                    <label style={{ fontSize: "12px" }} className="col-form-label">Değerlendirme Açıklaması</label>
                    <Form.Control
                      id="ratinginfo"
                      value={data.ratinginfo}
                      type="text"
                      placeholder="Değerlendirme Açıklaması"
                      onChange={handleonchange}
                    />
                  </Form.Group>
                  <Form.Group className="row m-2" >
                    <label style={{ fontSize: "12px" }} className="col-form-label">Bilgi Kaynağı</label>
                    <Form.Control
                      id="knowledgesource"
                      value={data.knowledgesource}
                      type="text"
                      placeholder="Bilgi Kaynağı"
                      onChange={handleonchange}
                    />
                  </Form.Group>
                </div>

              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Createfirstapproachreport





/*
        activepatientID: '',
        acceptancedate: null,
        interviewdate: null,
        healthinitialassesmentdate: null,
        reasonforhealtcare: '',
        ratinginfo: '',
        knowledgesource: '',
        controllername: '',
  */




