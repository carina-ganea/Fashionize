import React, { useEffect, useState } from 'react';
import '../components/styleComponents.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from "../store/user.slice";
import { addToCart } from '../store/user.slice';
import { API_URL } from '../utils/constants';


const FavouriteItem: React.FC<{
    product: any;
}> = ({ product }) => {
    const dispatch = useDispatch();
    const profile = useSelector(userSelector);
    const [favourites, setFavourites] = useState<any[]>([]);
    const [favs, setFavs] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_URL}/users?id=${profile.id}`).then(res => res.json()).then((data) => {
            if (profile.id != null)
                setFavourites(data[0]["favourites"]);
        });
    }, [profile.id, dispatch]);
    return (
        <div className="favourite row align-items-start">
            
            <div className="col-12" style={{ textAlign: 'right' }}><a className="fas fa-heart fa-lg" style={{ textDecoration: 'none' }} onClick={async () => {
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
                        .then(data => { console.log(data) });
                }

                );
                if (profile.id)
                    window.localStorage.setItem("id", profile.id);
                window.location.reload();

            }}></a></div>
            <div className='col-12'>
                <img src={`assets/${product.image}`}/>
                <h5>{product.name}</h5>
                <h6>{Number(product.price)} RON</h6>
                <button className="btn btn-primary" onClick={() => dispatch(addToCart(product))}>Add to cart</button>
            </div>
            
        </div>
    )
}

export default FavouriteItem;