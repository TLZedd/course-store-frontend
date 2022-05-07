import { Link } from "react-router-dom"

const UnauthorizedPage = () => {
    return (
        <div className="container">
        <div className="row">
            <div className="col-md-12 text-center">
                <span className="display-1">
                    401
                </span>
            </div>
            <div className="mb-4 lead">
                Unauthorized! Access to this page is restricted.
            </div>

            <Link to="/home" className="ntn btn-link">
                Back to Home
            </Link>
        </div>
    </div>
    )
}

export {UnauthorizedPage}