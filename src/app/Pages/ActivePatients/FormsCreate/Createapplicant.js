import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import Select from 'react-select';
import { MARIALSTATUS, BIOLOGICALAFFINITY } from '../../../Utils/Constants';

const Createapplicant = (props) => {
  const { data, refreshdata, selectstyle } = props

  const handleonchange = (e) => {
    const { id, value } = e.target
    const datatemp = data
    datatemp[e.target.id] = e.target.value
    refreshdata((data) => ({ ...data, [id]: value }));
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
            <h4 className="card-title">Hasta Yakını Bilgi Girme > Yeni</h4>
            <form className="form-sample" >
              <div className="row">
                <div className="col-12">
                  <div className='row'>
                    <div className='col-4'>
                      <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">İsim</label>
                        <Form.Control
                          id="firstname"
                          value={data.firstname}
                          type="text"
                          placeholder="İsim"
                          onChange={handleonchange}
                        />
                      </Form.Group>
                      <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Soyisim</label>
                        <Form.Control
                          id="lastname"
                          value={data.lastname}
                          type="text"
                          placeholder="Soyisim"
                          onChange={handleonchange}
                        />
                      </Form.Group>
                      <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Yakınlık Durumu</label>
                        <Form.Control
                          id="proximitystatus"
                          value={data.proximitystatus}
                          type="text"
                          placeholder="Yakınlık Durumu"
                          onChange={handleonchange}
                        />
                      </Form.Group>
                      <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">TC Kimlik No</label>
                        <Form.Control
                          id="countryid"
                          value={data.countryid}
                          type="text"
                          placeholder="TC Kimlik No"
                          onChange={handleonchange}
                        />
                      </Form.Group>
                      <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Baba Adı</label>
                        <Form.Control
                          id="fathername"
                          value={data.fathername}
                          type="text"
                          placeholder="Baba Adı"
                          onChange={handleonchange}
                        />
                      </Form.Group>
                      <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Anne Adı</label>
                        <Form.Control
                          id="mothername"
                          value={data.mothername}
                          type="text"
                          placeholder="Anne Adı"
                          onChange={handleonchange}
                        />
                      </Form.Group>
                      <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Doğum Tarihi</label>
                        <Form.Control
                          id="dateofbirth"
                          value={data.dateofbirth}
                          type="date"
                          placeholder="Doğum Tarihi"
                          onChange={handleonchange}
                        />
                      </Form.Group>
                      <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Cinsiyet</label>
                        <div style={{ marginRight: '-5px' }} className='col-12'>
                          <Select
                            // value={selecteddepartments}
                            //  onChange={}
                            options={BIOLOGICALAFFINITY}
                            placeholder="Seçiniz..."
                            styles={selectstyle}
                          />
                        </div>
                      </Form.Group>

                    </div>
                    <div className='col-4'>
                      <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Medeni Durumu</label>
                        <div style={{ marginRight: '-5px' }} className='col-12'>
                          <Select
                            // value={selecteddepartments}
                            //  onChange={}
                            options={MARIALSTATUS}
                            placeholder="Seçiniz..."
                            styles={selectstyle}
                          />
                        </div>
                      </Form.Group>
                      <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">İş Durumu</label>
                        <Form.Control
                          id="jobstatus"
                          value={data.jobstatus}
                          type="text"
                          placeholder="İş Durumu"
                          onChange={handleonchange}
                        />
                      </Form.Group>
                      <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Eğitim Durumu</label>
                        <Form.Control
                          id="educationstatus"
                          value={data.educationstatus}
                          type="text"
                          placeholder="Eğitim Durumu"
                          onChange={handleonchange}
                        />
                      </Form.Group>
                      <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Gelir Durumu</label>
                        <Form.Control
                          id="montlyincome"
                          value={data.montlyincome}
                          type="number"
                          placeholder="Gelir Durumu"
                          onChange={handleonchange}
                        />
                      </Form.Group>
                      <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Şehir</label>
                        <Form.Control
                          id="city"
                          value={data.city}
                          type="text"
                          placeholder="Şehir"
                          onChange={handleonchange}
                        />
                      </Form.Group>
                      <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">İlçe</label>
                        <Form.Control
                          id="town"
                          value={data.town}
                          type="date"
                          placeholder="İlçe"
                          onChange={handleonchange}
                        />
                      </Form.Group>
                      <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Adres 1</label>
                        <Form.Control
                          id="address1"
                          value={data.address1}
                          type="date"
                          placeholder="Adres 1"
                          onChange={handleonchange}
                        />
                      </Form.Group>
                      <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Adres 2</label>
                        <Form.Control
                          id="address2"
                          value={data.address2}
                          type="date"
                          placeholder="Adres 2"
                          onChange={handleonchange}
                        />
                      </Form.Group>
                    </div>
                    <div className='col-4'>
                      <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Ülke</label>
                        <Form.Control
                          id="country"
                          value={data.country}
                          type="text"
                          placeholder="Ülke"
                          onChange={handleonchange}
                        />
                      </Form.Group>
                      <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">İletişim No 1</label>
                        <Form.Control
                          id="contactnumber1"
                          value={data.contactnumber1}
                          type="text"
                          placeholder="İletişim No 1"
                          onChange={handleonchange}
                        />
                      </Form.Group>
                      <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">İletişim No 2</label>
                        <Form.Control
                          id="contactnumber2"
                          value={data.contactnumber2}
                          type="number"
                          placeholder="İletişim No 2"
                          onChange={handleonchange}
                        />
                      </Form.Group>
                      <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">İletişim Adı 1</label>
                        <Form.Control
                          id="contactname1"
                          value={data.contactname1}
                          type="text"
                          placeholder="İletişim Adı 1"
                          onChange={handleonchange}
                        />
                      </Form.Group>
                      <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">İletişim Adı 1</label>
                        <Form.Control
                          id="contactname1"
                          value={data.contactname1}
                          type="text"
                          placeholder="İletişim Adı 1"
                          onChange={handleonchange}
                        />
                      </Form.Group>
                      <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">İletişim Adı 2</label>
                        <Form.Control
                          id="contactname2"
                          value={data.contactname2}
                          type="text"
                          placeholder="İletişim Adı 2"
                          onChange={handleonchange}
                        />
                      </Form.Group>
                      <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Müracaat Tarihi</label>
                        <Form.Control
                          id="appialdate"
                          value={data.appialdate}
                          type="date"
                          placeholder="Müracaat Tarihi"
                          onChange={handleonchange}
                        />
                      </Form.Group>
                      <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Müracaat Nedeni</label>
                        <Form.Control
                          id="appialreason"
                          value={data.appialreason}
                          type="text"
                          placeholder="Müracaat Nedeni"
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
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Kapat</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Createapplicant





/*
  public string Activepatientid { get; set; }
  public string Firstname { get; set; }
  public string Lastname { get; set; }
  public string Proximitystatus { get; set; }
  public string Countryid { get; set; }
  public string Fathername { get; set; }
  public string Mothername { get; set; }
  public DateTime? Dateofbirth { get; set; }
  public string Placeofbirth { get; set; }
  public string Gender { get; set; }
  public string Marialstatus { get; set; }
  public string Jobstatus { get; set; }
  public string Educationstatus { get; set; }
  public string Montlyincome { get; set; }
  public string Town { get; set; }
  public string City { get; set; }
  public string Address1 { get; set; }
  public string Address2 { get; set; }
  public string Country { get; set; }
  public string Contactnumber1 { get; set; }
  public string Contactnumber2 { get; set; }
  public string Contactname1 { get; set; }
  public string Contactname2 { get; set; }
  public DateTime? Appialdate { get; set; }
  public string Appialreason { get; set; } 
  */




