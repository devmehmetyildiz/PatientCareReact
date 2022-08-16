import axios from 'axios'
import React, { useState, useEffect } from 'react'

const defaultImageSrc = '/img/user.png'

const initialfieldvalues = {
    id: 0,
    name: "",
    filefolder: ' ',
    filetype: ' ',
    downloadedcount: 0,
    lastdownloadeduser: ' ',
    lastdownloadedip: ' ',
    filepath: defaultImageSrc,
    imageFile: null,
    concurrencyStamp: '',
    createdUser: '',
    updatedUser: '',
    deleteUser: '',
    createTime: null,
    updateTime: null,
    deleteTime: null,
    isActive: false
}

export default function Employee(props) {
    const [values, setValues] = useState(initialfieldvalues)

    const [errors, setErrors] = useState({})
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }
    const showPreview = e => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0]
            const reader = new FileReader()
            reader.onload = x => {
                setValues({
                    ...values,
                    imageFile: imageFile,
                    filepath: x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        } else {
            setValues({
                ...values,
                imageFile: null,
                filepath: defaultImageSrc
            })
        }
    }
    const validate = () => {
        let temp = {}
        temp.name = values.name == "" ? false : true
        temp.filepath = values.filepath == defaultImageSrc ? false : true
        setErrors(temp)
        return Object.values(temp).every(x => x == true)
    }

    const employeeAPI = (url = "http://localhost:34891/api/File/Add") => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }
    const addOrEdit = (formData) => {
        employeeAPI().create(formData).then(response => {
            console.log('response: ', response);
            console.log("basarılı")
        }).catch(error => {
          console.log('erroraxios: ', error.response.data);
        })
    }

    const resetForm = () => {
        setValues(initialfieldvalues)
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
              const formData = new FormData();
             /*  formData.append('name', "");
              formData.append('filefolder', "");
              formData.append('filepath', "");
              formData.append('filetype', "");
              formData.append('downloadedcount', 0);
              formData.append('lastdownloadeduser', "");
              formData.append('lastdownloadedip', ""); */
              console.log('values.imageFile: ', values.imageFile);
              formData.append('model', values.imageFile);
              [...formData.entries()].forEach(e => console.log(e))
              addOrEdit(formData)

           /*  var myHeaders = new Headers();
            myHeaders.append("Content-Type", "multipart/form-data");

            var formdata = new FormData();
          
            formdata.append('file', values.imageFile);

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch("http://localhost:34891/api/File/Add", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error)); */

        }

    }
    const applyerrorclass = field => ((field in errors && errors[field] == false) ? ' invalid-field' : '')
    return (
        <>
            <div className='container text-center'>
                <p className='lead'>empoyee form</p>
            </div>
            <form onSubmit={handleSubmit} autoComplete='off' noValidate>
                <div className='card'>
                    <div className='card-body'>
                        <img style={{ margin: '10px', width: '200px', height: '200px' }} src={values.filepath} className="card-img-top" />
                        <div className='form-group'>
                            <input className={"form-control-file" + applyerrorclass('filepath')} accept='image/*' type="file"
                                onChange={showPreview}
                            />
                        </div>
                        <div className='form-group'>
                            <input className={"form-control" + applyerrorclass('name')} placeholder=' Name' name='name'
                                value={values.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='form-group text-center'>
                            <button type='submit' className='btn btn-light'>Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
