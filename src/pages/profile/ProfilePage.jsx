import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PurchaseService from "../../services/purchase.service";
import UserService from "../../services/user.service";
import { clearCurrentUser } from "../../store/actions/user";
import { Role } from '../../models/role';

const ProfilePage = () => {

    const [purchaseList, setPurchaseList] = useState([]);
    const [erorrMessage, setErrorMessage] = useState([]);

    const currentUser = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        PurchaseService.getAllPurchaseItems().then((response) => {
            setPurchaseList(response.data);
        })
    }, [])

    const changeRole = () => {
        const newRole = currentUser.role === Role.ADMIN ? Role.USER : Role.ADMIN;

        UserService.changeRole(newRole).then(() => {
            
            dispatch(clearCurrentUser());
            navigate('/login')
        }).catch ((err) => {
            setErrorMessage('Unexpected error occurred.');
            console.log(err);
        })
    }


    return (
        <div className="container">
            <div className="pt-5">
                    {erorrMessage &&
                        <div className="alert alert-danger">
                            {erorrMessage}
                        </div>
                    }

                    <div className="card">
                        <div className="card-header">

                            <div className="row">
                                <div className="col-6">
                                    <h3>All Purchased Items</h3>
                                </div>
                                <div className="col-6 text-end">
                                    Current role is <strong>{currentUser?.role}</strong>
                                    <button className="btn btn-primary" onClick={() => changeRole()}>
                                        Change Role
                                    </button>
                                </div>
                            </div>

                        </div>
                        <div className="card-body">
                            <table className="table table-striped">

                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Date</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {purchaseList.map((item, ind) => {
                                        <tr key={item.id}>
                                            <th scope="row">{ind + 1}</th>
                                            <td>{item.title}</td>
                                            <td>{`$ ${item.price}`}</td>
                                            <td>{new Date(item.purchaseTime).toLocaleDateString()}</td>
                                        </tr>       
                                    })}


                              
                                </tbody>

                            </table>
                        </div>
                    </div>

            </div>
        </div>
    )
}

export {ProfilePage}