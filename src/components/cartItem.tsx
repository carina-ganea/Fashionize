import React from 'react';
import '../components/styleComponents.css';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../store/user.slice';


const CartItem : React.FC <{ 
    product: any;
}> = ({product}) => {
        const dispatch = useDispatch();
    return (
        <div className="cartItem row align-items-start">
            <div className="col-6"><img  src={`assets/${product.image}`} style={{height: '25vh'}} /></div>
            <div className="col-6">
                <h2>{product.name}</h2>
                <h3>{product.price}</h3>
                <button className="btn btn-danger" onClick={() => dispatch(removeFromCart(product))}>Remove from cart</button>
            </div>
        </div>
    )
}

export default CartItem;