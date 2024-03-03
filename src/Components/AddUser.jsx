import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Style/Adduser.css'
import { string, object } from 'yup'
import { Formik, Form, Field, useFormik } from 'formik';

const AddUser = () => {
    const navigate = useNavigate();
    const [addData, setAddData] = useState({
        Author: '',
        title: '',
        isbn: '',
        published: '',
        publisher: '',
        website: '',
        description: ''
    });
    //validation schema for uncompleted inputs in form
    const validationSchema = object().shape({
        Author: string().required('Author Name Required'),
        title: string().required('Book Title Required'),
        isbn: string().required('ISBN-number Required'),
        publisher: string().required('Publisher name Required'),
        published: string().required('Date of published required'),
        website: string().required('official website required'),
        description: string().required('Detail description required')
    })
    const formikField = useFormik({
        initialValues: addData,
        validationSchema,
        onSubmit: async (values) => {
            try {
                await axios.post(`https://65d582ef3f1ab8c634372315.mockapi.io/api/Library/`, values);
                navigate('/');
            } catch (error) {
                console.log(error);
            }
        }
    })

    const formatDate = (dateString) => {
        if (!dateString) return ''; // Return empty string if dateString is falsy
        const dateObject = new Date(dateString);
        if (isNaN(dateObject.getTime())) return ''; // Return empty string if dateObject is invalid
        return dateObject.toISOString().split('T')[0];
    }

    return (
        <div className='container'>
            <Formik className="form-container">
                <Form onSubmit={formikField.handleSubmit}>
                    <div className='col p-4 mt-5'>
                        <div className="card h-100" id='addCard'>
                            <div className="card-body p-4">
                                <div className="input-group mb-3">
                                    <span className="input-group-text p-3" id="basic-addon1">AUTHOR:<span className="text-danger mb-2" style={{ fontWeight: 'bold' }}>*</span></span>
                                    <Field className='form-control' type='text' name='Author' value={formikField.values.Author} placeholder='Enter Author Name of Book' onChange={formikField.handleChange} />
                                </div>
                                <div className='text-danger'>
                                    {formikField.errors.Author}
                                </div>
                                <div className='input-group mb-3'>
                                    <span className="input-group-text p-3" id="basic-addon1">ISBN:<span className="text-dark mb-2" style={{ fontWeight: 'bold' }}>*</span></span>
                                    <Field className='form-control' type='tel' name='isbn' value={formikField.values.isbn} placeholder='Enter valid ISBN of Book' onChange={formikField.handleChange} />
                                </div>
                                <div className='text-danger'>
                                    {formikField.errors.isbn}
                                </div>
                                <div className=' input-group mb-3'>
                                    <span className="input-group-text p-3" id="basic-addon1">TITLE:<span className="text-dark mb-2" style={{ fontWeight: 'bold' }}>*</span></span>
                                    <Field className='form-control' type='text' name='title' value={formikField.values.title} placeholder='Enter title of Book' onChange={formikField.handleChange} />
                                </div>
                                <div className='text-danger'>
                                    {formikField.errors.title}
                                </div>
                                <div className='input-group mb-3'>
                                    <span className="input-group-text p-3" id="basic-addon1">PUBLISHER:<span className="text-dark mb-2" style={{ fontWeight: 'bold' }}>*</span></span>
                                    <Field className='form-control' type='text' name='publisher' value={formikField.values.publisher} placeholder='Enter Publisher Name of Book' onChange={formikField.handleChange} />
                                </div>
                                <div className='text-danger'>
                                    {formikField.errors.publisher}
                                </div>
                                <div className='input-group mb-3'>
                                    <span className="input-group-text p-3" id="basic-addon1">DATE OF PUBLISHED:<span className="text-dark mb-2" style={{ fontWeight: 'bold' }}>*</span> </span>
                                    <Field className='form-control' type='date' name='published' value={formatDate(formikField.values.published)} placeholder='Enter Published Date of Book' onChange={formikField.handleChange} />
                                </div>
                                <div className='text-danger'>
                                    {formikField.errors.published}
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text p-3" id="basic-addon1">WEBSITE:<span className="text-dark mb-2" style={{ fontWeight: 'bold' }}>*</span></span>
                                    <Field type="text" className="form-control" name="website" value={formikField.values.website} placeholder='Enter official website' onChange={formikField.handleChange} />
                                </div>
                                <div className='text-danger'>
                                    {formikField.errors.website}
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text p-3" id="basic-addon1">DESCRIPTION:<span className="text-dark mb-2" style={{ fontWeight: 'bold' }}>*</span></span>
                                    <Field type='text' className="form-control" name='description' value={formikField.values.description} placeholder='Enter Description of book' onChange={formikField.handleChange} />
                                </div>
                                <div className='text-danger'>
                                    {formikField.errors.description}
                                </div>
                                <div className='submit mt-4'>
                                    <button className="sub" type='submit'>
                                        Add
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

export default AddUser;
