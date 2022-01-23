import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Product from '../components/product';
import { API_URL } from '../utils/constants';
import {  productSelector} from '../store/product.slice';
import { userIdSelector } from '../store/user.slice';


const Browse = () => {
    const userId = useSelector(userIdSelector);
    const product = useSelector(productSelector);
    const [products, setProducts] = useState<any[]>([]);
    const [stock, setStock] = useState<any[]>([]);

    const fetchProducts = async () => {
        const data = await fetch(`${API_URL}/products`).then( res => res.json());
        setProducts(data);
        setStock(data);
    }

    useEffect (() => {
        fetchProducts();
    }, []);

    useEffect (() => {
        console.log(stock);
        setProducts(stock.filter(p => {
            var res = product.type === p.type || product.type === "";
            for( var i = 0; i < product.colours.length; i++){
                res = res && p.colours.includes(product.colours[i]);
            }
            return res; 
            })
        );
    }, [product.colours, product.type]);

    return (
            <div className='row align-items-start' id="main">
                { 
                    
                    products.map(product => (
                        <Product key={product.id} product={product}></Product>
                    ))
                }
            </div>
    );
}

export default Browse;