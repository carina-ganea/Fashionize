import { useSelector, useDispatch } from "react-redux";
import { productSelector } from "../store/product.slice";
import { userSelector } from "../store/user.slice";
import { Link } from "react-router-dom";
import { Key, useEffect, useState } from "react";
import { API_URL } from "../utils/constants";
import OrderItem from "../components/orderItem";

const Orders = () => {
    //const cart = useSelector(userCartSelector);
    const profile = useSelector(userSelector);
    
    const [orders, setOrders] = useState<any[]>([]);

    const getOrders = async() => {
        const data = await fetch(`${API_URL}/users?id=${profile.id}`).then( res => res.json());
        setOrders(data[0]['orders']);
        //console.log(aux);
    };

    useEffect (() => {
        getOrders();
    }, []);
    //console.log(cart);
    
        // return (
        //     <div className="alert alert-primary" role="alert"> 
        //         You have not placed any orders yet.
        //     </div>
        // )
    
    return (
        
        <>
            <div className="container">
                {orders.map((order) => (
                    
                    <div className="container p-3 my-3 bg-white">
                        <h6>Your order from {order.date}</h6>
                        {order.cart.map((product: { id: Key | null | undefined; }) =>
                            <div>
                                <hr/>
                                <OrderItem key={product.id} product={product}></OrderItem>
                            </div>
                        )}
                        
                     </div>   
                ))}
                
            </div>
        </>
    );
}

export default Orders;