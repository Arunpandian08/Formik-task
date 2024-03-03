import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Components/Style/EditForm.css'
import { string, object } from 'yup'
import { Formik, Form, Field, useFormik } from 'formik';

const EditForm = ({ id }) => {

    const navigate = useNavigate()

    const [editData, SetEditData] = useState({
        Author: '',
        title: '',
        isbn: '',
        published: '',
        publisher: '',
        website: '',
        description: ''
    })

    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        try {
            const res = await axios.get(`https://65d582ef3f1ab8c634372315.mockapi.io/api/Library/${id}`)
            SetEditData(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    const validationSchema = object().shape({
        Author: string().required('Author Name Required'),
        title: string().required('Book Title Required'),
        isbn: string().required('ISBN-number Required'),
        publisher: string().required('Publisher name Required'),
        published: string().required('Date of published required'),
        website: string().required('official website required'),
        description: string().required('Detail description required')
    })

    useEffect(() => {
        formikField.setValues(editData)
    }, [editData])

    const formikField = useFormik({
        initialValues: {
            Author: '',
            title: '',
            isbn: '',
            published: '',
            publisher: '',
            website: '',
            description: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                await axios.put(`https://65d582ef3f1ab8c634372315.mockapi.io/api/Library/${id}`, values);
                navigate('/');
            } catch (error) {
                console.log(error);
            }
        }
    })

    return (
        <div className="container">
            <Formik className="form-container">
                <Form onSubmit={formikField.handleSubmit}>
                    <div className='col p-4 mt-5'>
                        <div className="card h-100" id='addCard'>
                            <div className="card-body p-4">
                                <div className="input-group mb-3">
                                    <span className="input-group-text p-3" id="basic-addon1">AUTHOR:<span className="text-danger mb-2" style={{ fontWeight: 'bold' }}>*</span></span>
                                    <Field className='form-control' type='text' name='Author' value={formikField.values.Author} onChange={formikField.handleChange} />
                                </div>
                                <div className='text-danger'>
                                    {formikField.errors.Author}
                                </div>
                                <div className='input-group mb-3'>
                                    <span className="input-group-text p-3" id="basic-addon1">ISBN:<span className="text-dark mb-2" style={{ fontWeight: 'bold' }}>*</span></span>
                                    <Field className='form-control' type='tel' name='isbn' value={formikField.values.isbn} onChange={formikField.handleChange} />
                                </div>
                                <div className='text-danger'>
                                    {formikField.errors.isbn}
                                </div>
                                <div className=' input-group mb-3'>
                                    <span className="input-group-text p-3" id="basic-addon1">TITLE:<span className="text-dark mb-2" style={{ fontWeight: 'bold' }}>*</span></span>
                                    <Field className='form-control' type='text' name='title' value={formikField.values.title} placeholder={formikField.values.title} onChange={formikField.handleChange} />
                                </div>
                                <div className='text-danger'>
                                    {formikField.errors.title}
                                </div>
                                <div className='input-group mb-3'>
                                    <span className="input-group-text p-3" id="basic-addon1">PUBLISHER:<span className="text-dark mb-2" style={{ fontWeight: 'bold' }}>*</span></span>
                                    <Field className='form-control' type='text' name='publisher' value={formikField.values.publisher} onChange={formikField.handleChange} />
                                </div>
                                <div className='text-danger'>
                                    {formikField.errors.publisher}
                                </div>
                                <div className='input-group mb-3'>
                                    <span className="input-group-text p-3" id="basic-addon1">DATE OF PUBLISHED:<span className="text-dark mb-2" style={{ fontWeight: 'bold' }}>*</span> </span>
                                    <Field className='form-control' type='date' name='published' value={formikField.values.published} onChange={formikField.handleChange} />
                                </div>
                                <div className='text-danger'>
                                    {formikField.errors.published}
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text p-3" id="basic-addon1">WEBSITE:<span className="text-dark mb-2" style={{ fontWeight: 'bold' }}>*</span></span>
                                    <Field type="text" className="form-control" name="website" value={formikField.values.website} onChange={formikField.handleChange} />
                                </div>
                                <div className='text-danger'>
                                    {formikField.errors.website}
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text p-3" id="basic-addon1">DESCRIPTION:<span className="text-dark mb-2" style={{ fontWeight: 'bold' }}>*</span></span>
                                    <Field type='text' className="form-control" name='description' value={formikField.values.description} onChange={formikField.handleChange} />
                                </div>
                                <div className='text-danger'>
                                    {formikField.errors.description}
                                </div>
                                <div className='submit mt-4'>
                                    <button className='update' type='submit'>
                                        <span className="transition"></span>
                                        <span className="gradient"></span>
                                        <span className="label">Update</span>
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default EditForm;
