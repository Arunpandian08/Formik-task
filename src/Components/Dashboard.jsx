import axios from 'axios';
import './Style/Dashboard.css'
import React, { useEffect, useState } from 'react';

const Dashboard = () => {

    const [booksData, setBooksData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

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

    // inline style for card
    const cardStyle = {
        maxWidth: '992px',
    }
    return (
        <div className='container' id='home' >
            {booksData.map((item, index) => (
                <div className="card h-100 m-3" style={cardStyle} key={index}>
                    <div key={index} className="col">
                        <div className="row  g-1">
                            <h6 className="card-header text-center"><strong>Author:</strong>{item.Author}</h6>
                            <div className="">
                                <div className="table">
                                    <table className="table ">
                                        <tbody>
                                            <tr className='table-success'>
                                                <th scope="row"></th>
                                                <td ><strong>Title:</strong> </td>
                                                <td>{item.title}</td>
                                            </tr>
                                            <tr className='table-danger'>
                                                <th scope="row"></th>
                                                <td><strong>ISBN:</strong></td>
                                                <td>{item.isbn}</td>
                                            </tr>
                                            <tr className='table-info'>
                                                <th scope="row"></th>
                                                <td><strong>PUBLISHER:</strong></td>
                                                <td>{item.publisher}</td>
                                            </tr>
                                            <tr className='table-warning'>
                                                <th scope="row"></th>
                                                <td><strong>DATE OF PUBLISHED:</strong></td>
                                                <td>{item.published}</td>
                                            </tr>
                                            <tr className='table-primary'>
                                                <th scope="row"></th>
                                                <td><strong>WEB SITE:</strong></td>
                                                <td>{item.website}</td>
                                            </tr>
                                            <tr className='table-secondary'>
                                                <th scope="row"></th>
                                                <td><strong>DESCRIPTION:</strong></td>
                                                <td>{item.description}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;
