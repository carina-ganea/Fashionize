import { useSelector } from "react-redux";
import { userSelector } from "../store/user.slice";
import { useEffect, useState } from "react";
import { API_URL } from "../utils/constants";
import { Key } from "react";
import FavouriteItem from "../components/favouriteItem";
import { Carousel } from "react-bootstrap";

const Profile = () => {
    const profile = useSelector(userSelector);
    const [favourites, setFavourites] = useState<any[]>([]);
    const [user, setUser] = useState<any[]>([]);

    useEffect(() => {
        fetch(`${API_URL}/users?id=${profile.id}`).then(res => res.json()).then((data) => {
            setUser([data[0]["email"], data[0]["firstName"], data[0]["lastName"]]);
            setFavourites(data[0]["favourites"]);
            console.log(favourites);
        });
    }, [profile.id]);
    if(JSON.stringify(favourites) === '[]'){
        
        return (
            <>
                <div className="d-flex justify-content-between">
                <h3>User details</h3>
            </div>

            <ul className="list-group">
                <li className="list-group-item">
                    <span>Email: {user[0]}</span>
                </li>
                <li className="list-group-item">
                    <span>Name: {user[1]} {user[2]}</span>
                </li>
                <li className="list-group-item">
                    <span>Billing address: </span>
                </li>
                <li className="list-group-item">
                    <div className="row align-items-start">
                        <div className="col-3" style={{ height: "10vh" }}>
                            Favourite items:
                        </div>
                        <div className="col-9">
                            
                        </div>
                    </div>
                </li>
            </ul>
            </>
        );
    } else {
        return (
        <>

            <div className="d-flex justify-content-between">
                <h3>User details</h3>
            </div>

            <ul className="list-group">
                <li className="list-group-item">
                    <span>Email: {user[0]}</span>
                </li>
                <li className="list-group-item">
                    <span>Name: {user[1]} {user[2]}</span>
                </li>
                <li className="list-group-item">
                    <span>Billing address: </span>
                </li>
                <li className="list-group-item">
                    <div className="row align-items-start">
                        <div className="col-3" style={{ height: "10vh" }}>
                            Favourite items:
                        </div>
                        <div className="col-9">
                            <Carousel variant="dark" style={{ textAlign: "center"}}>
                                    {favourites.map((product: { id: Key | null | undefined; }) => {
                                        
                                        return <Carousel.Item style={{backgroundColor: "rgba(0, 0, 0, .25)"}}>
                                                <FavouriteItem key={product.id} product={product}></FavouriteItem>
                                                </Carousel.Item>;  
                                })}
                            </Carousel>
                        </div>
                    </div>
                </li>
            </ul>

        </>
    );
    }
    
}

export default Profile;