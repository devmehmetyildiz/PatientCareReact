import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import Select from 'react-select';
import { MARIALSTATUS, BIOLOGICALAFFINITY } from '../../../Utils/Constants';

const Createpatient = (props) => {
    const { data, refreshdata, selectstyle } = props

    const handleonchange = (e) => {
        const { id, value } = e.target
        const datatemp = data
        datatemp[e.target.id] = e.target.value
        refreshdata((data) => ({ ...data, [id]: value }));
    }

    const handleoncheckboxchange = (e) => {
        const item = data
        item[e.target.name] = e.target.value
        refreshdata((data) => ({ ...data, item }));
    }

    return (
        <>
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
                        <label style={{ fontSize: "12px" }} className="col-form-label">Baba Yakınlık Durumu</label>
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
                    <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Anne Yakınlık Durumu</label>
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
                    <div className="form-check ">
                        <label className="form-check-label ml-10">
                            <input
                                onChange={(e) => {
                                    handleoncheckboxchange({
                                        target: {
                                            name: "ismotheralive",
                                            value: e.target.checked,
                                        },
                                    });
                                }}
                                type="checkbox" key="{item}" className="form-check-input" name="" value={data.ismotheralive} />
                            <i className="input-helper"></i>
                            Anne Yaşıyor mu?
                        </label>
                    </div>
                    <div className="form-check ">
                        <label className="form-check-label ml-10">
                            <input
                                onChange={(e) => {
                                    handleoncheckboxchange({
                                        target: {
                                            name: "isfatheralive",
                                            value: e.target.checked,
                                        },
                                    });
                                }}
                                type="checkbox" key="{item}" className="form-check-input" name="" value={data.isfatheralive} />
                            <i className="input-helper"></i>
                            Baba Yaşıyor mu?
                        </label>
                    </div>
                </div>
                <div className='col-4'>
                    <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">TC Kimlik No</label>
                        <Form.Control
                            id="name"
                            value={data.countryID}
                            type="number"
                            placeholder="TC Kimlik No"
                            onChange={handleonchange}
                        />
                    </Form.Group>
                    <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Doğum Tarihi</label>
                        <Form.Control
                            id="name"
                            value={data.dateofbirth}
                            type="date"
                            placeholder="Doğum Tarihi"
                            onChange={handleonchange}
                        />
                    </Form.Group>
                    <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Doğum Yeri</label>
                        <Form.Control
                            id="name"
                            value={data.placeofbirth}
                            type="text"
                            placeholder="Doğum Yeri"
                            onChange={handleonchange}
                        />
                    </Form.Group>
                    <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Ölüm Tarihi</label>
                        <Form.Control
                            id="name"
                            value={data.dateofdeath}
                            type="date"
                            placeholder="Ölüm Tarihi"
                            onChange={handleonchange}
                        />
                    </Form.Group>
                    <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Ölüm Yeri</label>
                        <Form.Control
                            id="name"
                            value={data.placeofdeath}
                            type="text"
                            placeholder="Ölüm Yeri"
                            onChange={handleonchange}
                        />
                    </Form.Group>
                    <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Ölüm Nedeni</label>
                        <Form.Control
                            id="name"
                            value={data.deathinfo}
                            type="text"
                            placeholder="Ölüm Nedeni"
                            onChange={handleonchange}
                        />
                    </Form.Group>
                    <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Cinsiyet</label>
                        <div style={{ marginRight: '-5px' }} className='col-12'>
                            <Select
                                // value={selecteddepartments}
                                //  onChange={}
                                options={[]}
                                placeholder="Seçiniz..."
                                styles={selectstyle}
                            />
                        </div>
                    </Form.Group>
                </div>
                <div className='col-4'>
                    <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Medeni Durum</label>
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
                        <label style={{ fontSize: "12px" }} className="col-form-label">Sabıka Kaydı</label>
                        <Form.Control
                            id="name"
                            value={data.criminalrecord}
                            type="text"
                            placeholder="Sabıka Kaydı"
                            onChange={handleonchange}
                        />
                    </Form.Group>
                    <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Cocuk Sayısı</label>
                        <Form.Control
                            id="name"
                            value={data.childnumber}
                            type="number"
                            placeholder="Cocuk Sayısı"
                            onChange={handleonchange}
                        />
                    </Form.Group>
                    <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Engelli Çocuk Sayısı</label>
                        <Form.Control
                            id="name"
                            value={data.disabledchildnumber}
                            type="number"
                            placeholder="Engelli Çocuk Sayısı"
                            onChange={handleonchange}
                        />
                    </Form.Group>
                    <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Kardeş Sayısı</label>
                        <Form.Control
                            id="name"
                            value={data.siblingstatus}
                            type="number"
                            placeholder="Kardeş Sayısı"
                            onChange={handleonchange}
                        />
                    </Form.Group>
                    <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">SGK Durumu</label>
                        <Form.Control
                            id="name"
                            value={data.sgkstatus}
                            type="text"
                            placeholder="SGK Durumu"
                            onChange={handleonchange}
                        />
                    </Form.Group>
                    <Form.Group className="row m-2" >
                        <label style={{ fontSize: "12px" }} className="col-form-label">Gelir Durumu</label>
                        <Form.Control
                            id="name"
                            value={data.budgetstatus}
                            type="text"
                            placeholder="Gelir Durumu"
                            onChange={handleonchange}
                        />
                    </Form.Group>
                </div>
            </div>
        </>
    )
}

export default Createpatient


