import React, { useEffect, useState } from 'react';
import '../components/styleComponents.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from "../store/user.slice";
import { addToCart } from '../store/user.slice';
import { API_URL } from '../utils/constants';
import {  Modal } from 'react-bootstrap';



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