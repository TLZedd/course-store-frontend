import { forwardRef, useImperativeHandle, useState } from "react";
import { Modal } from "react-bootstrap";

const CourseDelete = forwardRef((props, ref) => {

    const [show, setShow] = useState(false);

    useImperativeHandle(ref, () => ({
        showDeleteMode() {
            setShow(true);
        }
    }))

    const deleteCourse = () => {
        props.onConfirmed();
        setShow(false);
    }

    return (
        <Modal show="show">
            <div className="modal-head">
                <h4 className="modal-title"></h4>
                <button type="button" className="btn-close=" onClick={() => setShow(false)}></button>
            </div>

        <div className="modal-body">
            Are you you want to delete this course?
        </div>

        <div className="modal-footer">
            <button type="button" className="btn btn-secondaryt" onClick={() => setShow(false)}>Cancel</button>
            <button type="button" className="btn btn-damger" onClick={() => deleteCourse()}>I'm sure</button> 
        </div>

        </Modal>
    )
})

export {CourseDelete}