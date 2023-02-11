import React from 'react';
import "../SocialLogin/SocialLogin.css"
import google from '../../../images/social/google.png'
import github from '../../../images/social/github.png'
import facebook from '../../../images/social/facebook1.png'
import { useSignInWithFacebook, useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useNavigate } from 'react-router-dom';
import Loding from '../../Shared/Loding/Loding';
const SocialLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [signInWithGithub, user1, loading1, error1] = useSignInWithGithub(auth);
    const [signInWithFacebook, user2, loading2, error2] = useSignInWithFacebook(auth);
    const navigate = useNavigate();

    let errorElement;
    if (loading || loading1 || loading2) {
        return <Loding></Loding>
    }
    if (error || error1 || error2) {
        errorElement = <p className='text-light'>Error: {error?.message}{error1?.message}{error2?.message}</p>

    }

    if (user || user1 || user2) {
        navigate('/home')
    }

    return (
        <div>
            <div className='d-flex align-items-center '>
                <div style={{ height: "1px " }} className='bg-light w-50 text-center'></div>
                <p className='text-light mt-2 px-2'>or</p>
                <div style={{ height: "1px" }} className='bg-light w-50 text-center'></div>
            </div>
            {errorElement}
            <div className='d-block'>
                <div>
                    <button onClick={() => signInWithGoogle()} className='btn btn-light w-50 py-2 d-block mx-auto '>
                        <img src={google} alt="" />
                        <span className='px-2'>Google Sign In</span>
                    </button>
                </div>
                <div>
                    <button onClick={() => signInWithGithub()} className='btn btn-light  w-50 my-2 d-block mx-auto '>
                        <img src={github} alt="" />
                        <span className='px-2'>Github</span>
                    </button>
                </div>
                <div>
                    <button onClick={() => signInWithFacebook()} className='btn btn-light button-group w-50 d-block mx-auto'>
                        <img style={{ height: '30px' }} src={facebook} alt="" />
                        <span className='px-2'>Facebook</span>
                    </button>
                </div>


            </div>
        </div >
    );
};

export default SocialLogin;