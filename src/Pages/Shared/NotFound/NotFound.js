import React from 'react';
import sleeping from '../../../images/sleeping.jpg';
const NotFound = () => {
    return (
        <div>
            <h1 className='text-primary text-center'>Machanic is sleeping</h1>
            <img className='w-50 ms-5' src={sleeping} alt="sleep" />
        </div>
    );
};

export default NotFound;