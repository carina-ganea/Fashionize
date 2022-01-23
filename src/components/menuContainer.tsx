import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../components/styleComponents.css';
import { isAuthenticatedSelector } from '../store/user.slice';
import { useSelector } from 'react-redux';

const MenuContainer: React.FC = () => {
    const user = useSelector(isAuthenticatedSelector);

    if (user)
        return (
            <div className="col-sm-1 menu">
                <div className="list-group" style={{ height: "100%" }}>
                    <div className="list-group-item list-group-item" style={{ backgroundColor: "#111111", textAlign: "center", color: "#FFFFFF" }}>
                        <img src="fashion.png" style={{ width: '5vw' }}></img>
                        <h6>Fashionize</h6>
                    </div>
                    <Link to="/" className="list-group-item list-group-item-action">
                        <i className="fas fa-search fa-2x"></i></Link>
                    <Link to="/cart" className="list-group-item list-group-item-action">
                        <i className="fas fa-shopping-basket fa-2x"></i></Link>
                    <Link to="/orders" className="list-group-item list-group-item-action">
                        <i className="fas fa-receipt fa-2x"></i></Link>
                    <Link to="/profile" className="list-group-item list-group-item-action">
                        <i className="fas fa-user fa-2x"></i></Link>

                    <div className="list-group-item list-group-item" style={{ height: '100%' }}></div>
                    <button className="list-group-item list-group-item-action" onClick={() => {
                        localStorage.clear();
                        window.location.href = '/';
                        window.location.reload();
                    }}>
                        <i className="fas fa-sign-out-alt fa-2x"></i>
                    </button>

                </div>
            </div>
        )
        return (
            <div className="col-sm-1 menu">
                <div className="list-group" style={{ height: "100%" }}>
                    <div className="list-group-item list-group-item" style={{ backgroundColor: "#111111", textAlign: "center", color: "#FFFFFF" }}>
                        <img src="fashion.png" style={{ height: "10vh" }}></img>
                        <h6>Fashionize</h6>
                    </div>
                    <Link to="/" className="list-group-item list-group-item-action">
                        <i className="fas fa-search fa-2x"></i></Link>
                    <Link to="/cart" className="list-group-item list-group-item-action">
                        <i className="fas fa-shopping-basket fa-2x"></i></Link>
                    <Link to="/orders" className="list-group-item list-group-item-action">
                        <i className="fas fa-receipt fa-2x"></i></Link>
                    <Link to="/profile" className="list-group-item list-group-item-action">
                        <i className="fas fa-user fa-2x"></i></Link>

                    <div className="list-group-item list-group-item" style={{ height: '100%' }}></div>
                    <Link to="/login" className="list-group-item list-group-item-action">
                        <i className="fas fa-sign-in-alt fa-2x"></i></Link>

                </div>
            </div>
        )
}

export default MenuContainer;

function logout() {
    throw new Error('Function not implemented.');
}
