import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import CourseService from "../../services/course.service";
import Purchase from "../../models/purchase";
import PurchaseService from "../../services/purchase.service";
import './HomePage.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGraduate } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {

    const [courseList, setCourseList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [infoMessage, setInfoMessage] = useState('');

    const currentUser = useSelector(state => state.user);

    useEffect( () => {
        CourseService.getAllCourses().then((response) => {
            setCourseList(response.data);
        })
    }, {})

    const purchase = (course) => {
        if (!currentUser?.id) {
            setErrorMessage('Login to buy a new course.');
            return;
        }

        const purchase = new Purchase(currentUser.id, course.id, course.title, course.price);

        PurchaseService.savePurchase(purchase).then(() => {
            setInfoMessage('Mission is completed.');
        }).catch ((err) => {
            setErrorMessage('Unexpected error occured');
            console.log(err);
        })
    }

    return (
        <div className="container p-3">
                {errorMessage &&
                    <div className="alert alert-danger">
                    </div>
                }

                {infoMessage &&
                    <div className="alert alert-success">
                        {infoMessage}
                    </div>
                }

                <div className="d-flex flex-wrap">
                    {courseList.map((item, ind) => 
                        <div key={item.id} className="card m-3 home-card">
                            
                            <div className="card-body">
                                <div className="card-title text-uppercase">
                                    {item.title}
                                </div>
                                <div className="card-subtitle text-muted">
                                    {item.subtitle}
                                </div>
                            </div>

                            <FontAwesomeIcon icon={faUserGraduate} className="ms-auto me-auto course-icon"/>

                            <div className="row mt-2 p-3">
                                <div className="col-6 mt-2 ps4">
                                    {`$ {item.price}`}
                                </div>
                                <div className="col-6">
                                    <button 
                                        className="btn btn-outlin-success w-100" 
                                        onClick={() => purchase(item)}>
                                        Buy
                                    </button>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            
        </div>
    )
}

export {HomePage}