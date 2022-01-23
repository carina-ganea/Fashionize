import { useSelector } from "react-redux";
import { userSelector } from "../store/user.slice";
import { Key, useEffect, useState } from "react";
import { API_URL } from "../utils/constants";
import OrderItem from "../components/orderItem";

const Orders = () => {
    const profile = useSelector(userSelector);
    
    const [orders, setOrders] = useState<any[]>([]);

    const getOrders = async() => {
        const data = await fetch(`${API_URL}/users?id=${profile.id}`).then( res => res.json());
        setOrders(data[0]['orders']);
    };

    useEffect (() => {
        getOrders();
    }, []);
    
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