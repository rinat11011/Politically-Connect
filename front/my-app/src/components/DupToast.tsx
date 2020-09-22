
import React,{useState} from "react";
import { Toast} from "react-bootstrap";

function DupToast() {
    const [showA, setShowA] = useState(true);
    const [showB, setShowB] = useState(true);

    const toggleShowA = () => setShowA(!showA);
    const toggleShowB = () => setShowB(!showB);

    return (
                <Toast show={showA} onClose={toggleShowA}>
                    <Toast.Header>
                        <strong className="mr-auto">PoliticallyConnect</strong>
                        <small>11 mins ago</small>
                    </Toast.Header>
                    <Toast.Body></Toast.Body>
                </Toast>

    );
}
export default DupToast;