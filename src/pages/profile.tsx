import { useSelector } from "react-redux";
import { userSelector } from "../store/user.slice";
import { useEffect, useRef, useState } from "react";
import { API_URL } from "../utils/constants";
import { Key } from "react";
import FavouriteItem from "../components/favouriteItem";
import { Carousel, Modal } from "react-bootstrap";

const Profile = () => {
    const profile = useSelector(userSelector);
    const [favourites, setFavourites] = useState<any[]>([]);
    const [user, setUser] = useState<any[]>([]);

    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const [show, setCart] = useState(false);
    const [edit, setEdit] = useState(false);


    const handleClose = () => setCart(false);
    const handleShow = () => setCart(true);

    const editClose = () => setEdit(false);
    const editShow = () => setEdit(true);

    const handleName = (e: { target: { value: any; }; }) => {
        setName(e.target.value);
    }

    const handleAddress = (e: { target: { value: any; }; }) => {
        setAddress(e.target.value);
    }

    useEffect(() => {
        fetch(`${API_URL}/users?id=${profile.id}`).then(res => res.json()).then((data) => {
            setUser([data[0]["email"], data[0]["firstName"], data[0]["lastName"], data[0]["address"]]);
            setName(data[0]["firstName"]+" "+data[0]["lastName"]);
            setAddress(data[0]["address"]);
            setFavourites(data[0]["favourites"]);
            console.log(favourites);
        });
    }, [profile.id]);
    if(JSON.stringify(favourites) === '[]'){
        
        return (
            <>
            <Modal show={edit} onHide={editClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Profile has been changed.</Modal.Title>
                </Modal.Header>

            </Modal>
                <div className="d-flex justify-content-between">
                <h3>User details</h3>
            </div>
        <table className="list-group">
            <tr className="list-group-item row align-items-start">
            <th className="col-3">Email:</th>
            <td>{user[0]}</td>
            <td><button type="button" className="btn btn-link disabled"><i className="fas fa-edit" style={{ textDecoration: 'none' }} aria-disabled="true"/></button></td>
            </tr>
            <tr className="list-group-item row align-items-start">
            <th className="col-3">Name:</th>
            <td> <input type="text" className="form-control-plaintext" value={name} onChange={handleName}/></td>
            <td><button type="button" className="btn btn-link"><i className="fas fa-edit" style={{ textDecoration: 'none' }} onClick={
                        async () => {
                            await fetch(`${API_URL}/users?id=${profile.id}`).then(res => res.json()).then(async (data) => {
                                console.log(name);
                                const n = name.trim().split(" ");
                                console.log(n);
                                data[0]["firstName"] = n[0];
                                data[0]["lastName"] = n[1];
            
                                const requestOptions = {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(data[0])
                                };
                                await fetch(`${API_URL}/users/${profile.id}`, requestOptions)
                                    .then(response => response.json())
                                    .then(data => { console.log(data) });
                                editShow();
                            })
                        }
                    }/></button></td>
            </tr>
            <tr className="list-group-item row align-items-start">
                    <th className="col-3">Billing address: </th>
                    <td> <input type="text" className="form-control-plaintext" value={address}  onChange={handleAddress}/> </td>
                    <td><button  type="button" className="btn btn-link"><i className="fas fa-edit" style={{ textDecoration: 'none' }} onClick={
                        async () => {
                            await fetch(`${API_URL}/users?id=${profile.id}`).then(res => res.json()).then(async (data) => {
                                data[0]["address"] = address.trim();
            
                                const requestOptions = {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(data[0])
                                };
                                await fetch(`${API_URL}/users/${profile.id}`, requestOptions)
                                    .then(response => response.json())
                                    .then(data => { console.log(data) });
                                editShow();
                            })
                        }
                    }/></button></td>
                </tr>
            <tr className="list-group-item row align-items-start">
            <th className="col-3">Favourite products:</th>
            
            </tr>
        </table>
            </>
        );
    } else {
        return (
        <>
            <Modal show={edit} onHide={editClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Profile has been changed.</Modal.Title>
                </Modal.Header>

            </Modal>
            <div className="d-flex justify-content-between">
                <h3>User details</h3>
            </div>

            <table className="list-group">
                <tr className="list-group-item row align-items-start">
                    <th className="col-3">Email:</th>
                    <td>{user[0]}</td>
                    <td><button type="button" className="btn btn-link disabled"><i className="fas fa-edit" style={{ textDecoration: 'none' }} aria-disabled="true"/></button></td>
                </tr>
                <tr className="list-group-item row align-items-start">
                    <th className="col-3">Name:</th>
                    <td> <input type="text" className="form-control-plaintext" value={name} onChange={handleName}/></td>
                    <td><button type="button" className="btn btn-link"><i className="fas fa-edit" style={{ textDecoration: 'none' }} onClick={
                        async () => {
                            await fetch(`${API_URL}/users?id=${profile.id}`).then(res => res.json()).then(async (data) => {
                                const n = name.trim().split(" ");
                                data[0]["firstName"] = n[0];
                                data[0]["lastName"] = n[1];
            
                                const requestOptions = {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(data[0])
                                };
                                await fetch(`${API_URL}/users/${profile.id}`, requestOptions)
                                    .then(response => response.json())
                                    .then(data => { console.log(data) });
                                editShow();
                            })
                        }
                    }/></button></td>
                </tr>
                <tr className="list-group-item row align-items-start">
                    <th className="col-3">Billing address: </th>
                    <td> <input type="text" className="form-control-plaintext" value={address}  onChange={handleAddress}/> </td>
                    <td><button  type="button" className="btn btn-link"><i className="fas fa-edit" style={{ textDecoration: 'none' }} onClick={
                        async () => {
                            await fetch(`${API_URL}/users?id=${profile.id}`).then(res => res.json()).then(async (data) => {
                                data[0]["address"] = address.trim();
            
                                const requestOptions = {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(data[0])
                                };
                                await fetch(`${API_URL}/users/${profile.id}`, requestOptions)
                                    .then(response => response.json())
                                    .then(data => { console.log(data) });
                                    editShow();
                            })
                        }
                    }/></button></td>
                </tr>
                <tr className="list-group-item row align-items-right">
                    
                        <th className="col-3" style={{ height: "10vh" }}>
                            Favourite items:
                        </th>
                        <td className="col-6" style={{ textAlign: "center"}}>
                            <Carousel variant="dark" style={{ textAlign: "center"}}>
                                    {favourites.map((product: { id: Key | null | undefined; }) => {
                                        
                                        return <Carousel.Item style={{backgroundColor: "rgba(0, 0, 0, .25)"}}>
                                                <FavouriteItem key={product.id} product={product}></FavouriteItem>
                                                </Carousel.Item>;  
                                })}
                            </Carousel>
                        </td>
                </tr>
            </table>

        </>
    );
    }
    
}

export default Profile;