import CartItem from "../components/cartItem";
import { useDispatch, useSelector } from "react-redux";
import { userCartSelector, userSelector, removeFromCart } from "../store/user.slice";
import { useNavigate } from "react-router-dom";
import { Key } from "react";
import { API_URL } from "../utils/constants";

const Cart = () => {
    const cart = useSelector(userCartSelector);
    const profile = useSelector(userSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log(cart);
    if( cart.length == 0 ) {
        return (
            <div className="alert alert-primary" role="alert"> 
                You have not added an item to cart yet.
            </div>
        )
    }
    return (
        <>
            <div className="container">
                { cart.map((product: { id: Key | null | undefined; }) => (
                        <CartItem key={product.id} product={product}></CartItem>
                    )) }
                
            </div>
            <button className="btn btn-lg btn-success" style={{position: 'fixed', bottom:'20vh', right:'5vw'}} onClick={async () => {
                await fetch(`${API_URL}/users?id=${profile.id}`).then(res => res.json()).then(async (data) => {

                    data[0]["orders"].push({"date" : new Date().toString(), cart});
                    const requestOptions = {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data[0])
                    };
                    await fetch(`${API_URL}/users/${profile.id}`, requestOptions)
                        .then(response => response.json())
                        .then(data => { 
                        console.log(data); 
                        });
                });
                for( var i = 0; i < cart.length; i++){
                    dispatch(removeFromCart(cart[i]));
                }
                navigate('/orders');
            }}>Proceed to payment <i className="fas fa-cart-arrow-down"></i></button>
            
        </>
    );
}

export default Cart;

