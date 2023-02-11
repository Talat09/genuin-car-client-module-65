import React from 'react';
import { Spinner } from 'react-bootstrap';
import '../../Shared/Loding/Loading.css';

const Loding = () => {
    return (
        <div className="spinner">
            <Spinner animation="border" variant="primary" />
        </div>
    );
};

export default Loding;