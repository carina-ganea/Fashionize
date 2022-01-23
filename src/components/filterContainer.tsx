import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../components/styleComponents.css';
import { productColourSelector, setColours, setType } from '../store/product.slice';



const FilterContainer: React.FC = ({ children }) => {
    const dispatch = useDispatch()
    //const [colours, setColours] = useSelector(productColourSelector);

    const selectedColour = (colour: string) => {
        dispatch(setColours(colour));
    }

    const selectedType = (type: string) => {
        dispatch(setType(type));
    }

    return (
        <div className="row">
            <div className="col-md-3 filter">
                <h4>Type of product:</h4>
                <div>
                    <select id="type" onChange={(selected) => selectedType(selected.target.value)}>
                        <option value="">...</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Blasers">Blasers</option>
                        <option value="Shirts">Shirts</option>
                        <option value="Skirts">Skirts</option>
                        <option value="Shoes">Shoes</option>
                        <option value="Trousers">Trousers</option>
                    </select>
                </div>
                <hr />
                <h4>Colour:</h4>
                <div className="form-check-inline row" style={{ paddingLeft : "10px"}}>
                    <input className="form-check-input col-lg-1" type="checkbox" style={{ backgroundColor: "DarkOrange", margin: "1px" }}
                        value="" id="1" aria-label="orange" onClick={() => selectedColour("orange")} />
                    <input className="form-check-input col-lg-1" type="checkbox" style={{ backgroundColor: "crimson", margin: "1px" }}
                        value="" id="1" aria-label="red" onClick={() => selectedColour("red")} />
                    <input className="form-check-input col-lg-1" type="checkbox" style={{ backgroundColor: "HotPink", margin: "1px" }}
                        value="" id="1" aria-label="pink" onClick={() => selectedColour("pink")} />    
                    <input className="form-check-input col-lg-1" type="checkbox" style={{ backgroundColor: "DarkMagenta", margin: "1px" }}
                        value="" id="2" aria-label="violet" onClick={() => selectedColour("violet")} />
                    
                    <input className="form-check-input col-lg-1" type="checkbox" style={{ backgroundColor: "SteelBlue", margin: "1px" }}
                        value="" id="2" aria-label="blue" onClick={() => selectedColour("blue")} />
                    
                    <input className="form-check-input col-lg-1" type="checkbox" style={{ backgroundColor: "MediumSeaGreen", margin: "1px" }}
                        value="" id="3" aria-label="green" onClick={() => selectedColour("green")} />
                    <input className="form-check-input col-lg-1" type="checkbox" style={{ backgroundColor: "yellow", margin: "1px" }}
                        value="" id="3" aria-label="yellow" onClick={() => selectedColour("yellow")} />
                     <input className="form-check-input col-lg-1" type="checkbox" style={{ backgroundColor: "#B49B65", margin: "1px" }}
                        value="" id="3" aria-label="beige" onClick={() => selectedColour("beige")} />
                     <input className="form-check-input col-lg-1" type="checkbox" style={{ backgroundColor: "black", margin: "1px" }}
                        value="" id="3" aria-label="black" onClick={() => selectedColour("black")} />
                    
                    <input className="form-check-input col-lg-1" type="checkbox" style={{ backgroundColor: "grey", margin: "1px" }}
                        value="" id="3" aria-label="grey" onClick={() => selectedColour("grey")} />
                    <input className="form-check-input col-lg-1" type="checkbox" style={{ backgroundColor: "whitesmoke", margin: "1px", color:"black" }}
                        value="" id="3" aria-label="white" onClick={() => selectedColour("white")} />
                </div>
                
            </div>
        </div>
    )
}

export default FilterContainer;