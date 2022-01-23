import React, { useEffect, useState } from 'react';
import '../components/styleComponents.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from "../store/user.slice";
import { addToCart } from '../store/user.slice';
import { API_URL } from '../utils/constants';
import { Button, Modal } from 'react-bootstrap';
// import logo1 from "../assets/logo_1.png";
// import logo2 from "../assets/logo_2.png";
// import logo3 from "../assets/logo_3.png";
// import logo4 from "../assets/logo_4.png";
// import logo5 from "../assets/logo_5.png";
// import logo6 from "../assets/logo_6.png";

// const logos = [ logo1, logo2, logo3, logo4, logo5, logo6 ];



const Product: React.FC<{
    product: any;
    // liked?: boolean;
    // onClick?: ()=> void ;
}> = ({ product }) => {
    const dispatch = useDispatch();
    const profile = useSelector(userSelector);
    const [favourites, setFavourites] = useState<any[]>([]);
    const [favs, setFavs] = useState<any[]>([]);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        fetch(`${API_URL}/users?id=${profile.id}`).then(res => res.json()).then((data) => {
            if (profile.id != null)
                setFavourites(data[0]["favourites"]);
        });
    }, [profile.id, dispatch]);

    if (favourites.map((element) => JSON.stringify(element)).includes(JSON.stringify(product))) {
        return ( 
            <><Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Item has been added to the shopping cart.</Modal.Title>
                </Modal.Header>

            </Modal>
            <div className="col-2 product ">
                    <p style={{ textAlign: 'right' }}><a className="fas fa-heart fa-lg" style={{ textDecoration: 'none' }} onClick={async () => {
                        await fetch(`${API_URL}/users?id=${profile.id}`).then(res => res.json()).then(async (data) => {
                            setFavs([]);

                            (data[0]["favourites"]).map((element: any) => {
                                if (JSON.stringify(element).localeCompare(JSON.stringify(product)) != 0) {
                                    favs.push(element);
                                }
                            });
                            console.log(favs);
                            data[0]["favourites"] = favs;
                            console.log(data[0]["favourites"]);

                            const requestOptions = {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(data[0])
                            };
                            await fetch(`${API_URL}/users/${profile.id}`, requestOptions)
                                .then(response => response.json())
                                .then(data => { console.log(data); });
                        }

                        );
                        if (profile.id)
                            window.localStorage.setItem("id", profile.id);
                        window.location.reload();

                    } }></a></p>

                    <img src={`assets/${product.image}`} style={{ height: '50%' }} />
                    <h2>{product.name}</h2>
                    <h4>{Number(product.price)} RON</h4>
                    <button className="btn btn-primary" onClick={() => { dispatch(addToCart(product)); handleShow(); } }>Add to cart</button>
                </div></>
        )
    }
    return (

        <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Item has been added to the shopping cart.</Modal.Title>
            </Modal.Header>

        </Modal>
        
        <div className="col-2 product">
                <p style={{ textAlign: 'right' }}><a className="far fa-heart fa-lg" style={{ textDecoration: 'none' }} onClick={async () => {
                    await fetch(`${API_URL}/users?id=${profile.id}`).then(res => res.json()).then(async (data) => {

                        setFavourites(data[0]["favourites"]);
                        favourites.push(product);
                        data[0]["favourites"] = favourites;

                        const requestOptions = {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(data[0])
                        };
                        await fetch(`${API_URL}/users/${profile.id}`, requestOptions)
                            .then(response => response.json())
                            .then(data => { console.log(data); });
                    }

                    );
                    if (profile.id)
                        window.localStorage.setItem("id", profile.id);
                    window.location.reload();
                } }></a></p>

                <img src={`assets/${product.image}`} style={{ height: '50%' }} />
                <h2>{product.name}</h2>
                <h4>{Number(product.price)} RON</h4>
                <button className="btn btn-primary" onClick={() => { dispatch(addToCart(product)); handleShow(); } }>Add to cart</button>
            </div></>
    )
}

export default Product;