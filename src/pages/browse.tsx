import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { Link } from 'react-router-dom';
import Product from '../components/product';
import { API_URL, GRID_SIZE } from '../utils/constants';
import { productColourSelector, productSelector, productSlice, updateProduct} from '../store/product.slice';
import { userIdSelector } from '../store/user.slice';
import { Type } from 'typescript';

const data = [
    [1, 2, 9, 4],
    [4, 1, 5, 2],
    [5, 10, 12, 12],
    [10, 8, 9, 8]
]

const ELEMENTS_TO_DISCOVER = 8;



const Browse = () => {
    //const [isFinished, setIsFinished] = useState<boolean>(false);
    //const [gridState, setGridState] = useState<boolean[]>(new Array(GRID_SIZE * GRID_SIZE).fill(false));
    //const [moves, setMoves] = useState<number>(0);
    //const selectedRef = useRef<{ val: number; pos: number }[]>([]);
    //const discoveredElements = useRef<number>(0);
    const userId = useSelector(userIdSelector);
    const product = useSelector(productSelector);
    const [products, setProducts] = useState<any[]>([]);
    const [stock, setStock] = useState<any[]>([]);

    //const [colours, setColours] = useSelector(productColourSelector);
    var totalProducts: React.SetStateAction<any[]>;
    //const dispatch = useDispatch();

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
    // useEffect (() => {
    //     if( userId ){
    //         updateUserStatistics(userId, games, averageMoves); 
    //      }
    // }, [userId, games, averageMoves]);

    // const handleCLick = (index: number) => {
    //     const newState = [...gridState];
    //     newState[index] = !newState[index];
    //     setGridState(newState);
    // }

    // const PlayAgain = () => {
    //     setMoves(0);
    //     setGridState(new Array(GRID_SIZE * GRID_SIZE).fill(false));
    //     setIsFinished(false);

    //     selectedRef.current = [];
    //     discoveredElements.current = 0;
        
    // }


    // useEffect(() => {
    //     if(isFinished){
    //         dispatch(updateMoves(moves));
    //     }
    // }, [isFinished, moves, dispatch]);

    // if (isFinished) {
    //     return (
    //         <>

    //         </>
    //     )
    // }
    
    return (
            <div className='row align-items-start' id="main">
                { 
                    
                    products.map(product => (
                        <Product key={product.id} product={product}></Product>
                        //dispatch(updateProduct(product));
                    ))
                }
            </div>
                // data.map((row, rowIndex) => (
                //     <div className="row" key={`row-${rowIndex}`} style={{ marginBottom: 20 }}>
                //         {row.map((col, colIndex) => (
                //             <div className="col-lg" key={rowIndex * GRID_SIZE + colIndex}>
                //                 <Product
                //                     logoIndex={col}
                //                     visible={gridState[rowIndex * GRID_SIZE + colIndex]}
                //                     onClick={() => {

                //                         const position = rowIndex * GRID_SIZE + colIndex;
                //                         handleCLick(position);
                //                         selectedRef.current.push({ val: col, pos: position });
                //                         if (selectedRef.current.length === 2) {
                //                             setMoves(moves + 1);
                //                             const [first, second] = selectedRef.current;
                //                             if (first.val !== second.val) {
                //                                 const newState = [...gridState];
                //                                 newState[first.pos] = false;
                //                                 newState[second.pos] = false;
                //                                 setTimeout(() => {
                //                                     setGridState(newState);
                //                                 }, 500);

                //                             } else {
                //                                 discoveredElements.current++;
                //                                 if (discoveredElements.current === ELEMENTS_TO_DISCOVER) {
                //                                     dispatch(incrementGames());
                                                    
                //                                     setIsFinished(true);
                //                                 }
                //                             }
                //                             selectedRef.current = [];
                //                         }
                //                     }
                //                     }
                //                 />
                //             </div>
                //         ))}
                //     </div>
                // ))
    );
}

export default Browse;