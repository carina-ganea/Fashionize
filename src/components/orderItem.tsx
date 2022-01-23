import React from 'react';
import '../components/styleComponents.css';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../store/user.slice';


const OrderItem : React.FC <{ 
    product: any;
    // liked?: boolean;
    // onClick?: ()=> void ;
}> = ({product}) => {
        const dispatch = useDispatch();
    return (
        <div className="orderItem row align-items-start">
            <div className="col-3"><img  src={`assets/${product.image}`} style={{height: '10vh'}} /></div>
            <div className="col-9">
                <h5>{product.name}</h5>
                <p>{product.price}</p>
            </div>
        </div>
    )
}

export default OrderItem;