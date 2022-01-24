import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../store/user.slice';
import { useNavigate } from "react-router-dom";
import { API_URL } from '../utils/constants';

const Auth = () => {
    const email = useRef<any>();
    const password = useRef<any>();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        if( email.current.value && password.current.value ){
            try{
                const user = await fetch(`${API_URL}/users?email=${email.current.value}&password=${password.current.value}`)
                .then((response) => response.json())
                .then((users) => users[0]);
                dispatch(updateProfile(user));
                window.sessionStorage.setItem("id", user.id);
                navigate('/');

            } catch (e) {
                console.log(e);
            }
            
            


        }
    }

    return (
        <div className="container-fluid">
            <div className="row align-items-center">
                <div className="col">
                    <form className="row g-3">
                        <div className="col-md-12">
                            <label htmlFor="inputEmail" className="form-label">Email</label>
                            <input ref={email} type="email" className="form-control" id="inputEmail"></input>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="inputPassword" className="form-label">Password</label>
                            <input ref={password} type="password" className="form-control" id="inputPassword"></input>
                        </div>

                        <div className="col-12">
                            <button type="button" className="btn btn-primary" style={{backgroundColor: 'blue'}} onClick={handleLogin}>Log In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Auth;