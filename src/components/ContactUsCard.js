import React from 'react';
import { useHistory } from 'react-router-dom';

function ContactUsCard() {
    const history = useHistory();
    function handleOnContact() {
        console.log("Form Submitted...");
        history.push("/");
    }

    return (
        <div className='newPinCard ContactUsCard'>
            <h1 className='heading'>Contact Us</h1>
            <form>
                <input
                    placeholder="Your Name"
                />
                <input
                    placeholder="Email Id"
                />
                <input
                    placeholder="Phone Number"
                />
                <textarea
                    placeholder="Your Message"
                    rows="9"
                />
                <button type="submit" className="primaryButton" style={{ marginTop: "20px", }} onClick={handleOnContact}   >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default ContactUsCard;