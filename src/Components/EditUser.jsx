import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style/EditUser.css'

const EditUser = ({ setId }) => {

    const [booksData, setBooksData] = useState([]);
    const [deleteData, setDeleteData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate()

    useEffect(() => {
        fetchData();
    }, [deleteData]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://65d582ef3f1ab8c634372315.mockapi.io/api/Library`);
            setBooksData(response.data);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    }

    if (loading) {
        return <div className="loader-container">
            <div className="loader">
                <span className='text-dark'>Loading...</span>
            </div>
        </div>

    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleEdit = (id) => {
        setId(id)
        navigate(`/editform/${id}`)

    }
    const handleDelete = async (id) => {
        await axios.delete(`https://65d582ef3f1ab8c634372315.mockapi.io/api/Library/${id}`)
            .then(res => setDeleteData(res.data))
            .catch(err => console.log("Cannot delete data", err))
    }
    const cardStyle = {
        maxWidth: '992px'
    }
    return (
        <div>
            <div className='container'>
                <div className="row row-cols g-4">
                    {booksData.map((item, index) => {
                        return (
                            <div className="col">
                                <div className='card h-100' key={index} id="card" style={cardStyle}>
                                    <div className="content">
                                        <h6 className="card-title"><strong>AUTHOR: </strong> {item.Author}</h6>
                                        <h6 className="card-text"><strong>TITLE: </strong> {item.title}</h6>
                                        <h6 className="card-text"><strong>ISBN:</strong> {item.isbn}</h6>
                                        <h6 className="card-text"><strong>PUBLISHED:</strong> {item.published}</h6>
                                        <h6 className="card-text"><strong>PUBLISHER:</strong> {item.publisher}</h6>
                                        <h6 className="card-text"><strong>WEBSITE:</strong> {item.website}</h6>
                                        <p className='para'><strong>Description:</strong> {item.description}</p>
                                        <div className="twoBtn">
                                            <button className="btns" onClick={() => { handleEdit(item.id) }}>
                                                <svg className="svg-icon" style={{ fill: "none", height: "24", viewBox: "0 0 24 24", width: "24", xmlns: "http://www.w3.org/2000/svg" }}><g style={{ stroke: "#a649da", strokeLinecap: "round", strokeWidth: "2" }} ><path d="m20 20h-16"></path><path clip-rule="evenodd" d="m14.5858 4.41422c.781-.78105 2.0474-.78105 2.8284 0 .7811.78105.7811 2.04738 0 2.82843l-8.28322 8.28325-3.03046.202.20203-3.0304z" fill-rule="evenodd"></path></g></svg>
                                                <span className="lable">Edit</span>
                                            </button>
                                            <div className="del" onClick={() => { handleDelete(item.id) }}>
                                                <div>
                                                    Delete
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );

};


// onSubmit={handleFormSubmit}

export default EditUser;

