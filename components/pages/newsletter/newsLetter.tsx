import Button from 'components/lib/button/Button';
import { Check, Inbox } from "react-feather";
import { useState } from 'react';
import { sendEmail } from './newsLetter.utils';





const Newsletter = () => {
    const [email, setEmail] = useState<string>('')
    const [sentStatus, setSentStatus] = useState<boolean>(false)

    const handleSendEmail = () => {
        if (email.length > 0) {
            sendEmail(email)
            setEmail('')
            setSentStatus(true)
            setTimeout(() => {
                setSentStatus(false)
            }, 5000);
        } else {
            return
        }
    }


    return (
        <>
            <section className="newsletter_main">
                <div className="blob_red" />
                <div className="blob_orange" />
                <div className="container">
                    <h1 className='f-size-h3 f-weight-bl'>subscribe to our newsletter</h1>

                    <div className="inputs">
                        <div className="input_container">
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                placeholder='contact@icp-20.com'
                                className='input'
                                type="email"
                                name="email" />
                        </div>
                        <Button
                            onClick={() => handleSendEmail()}
                            size={2}
                            textColor='white'
                            className="red_hero_btn f-size-p3 btn btn_black"
                            style={{ marginTop: 'calc(1rem + 2vw)' }}>

                            {sentStatus ? (
                                <Check
                                    style={{ marginRight: '1rem' }}
                                    strokeWidth={1.5}
                                    color={'var(--white)'} />
                            ) : (
                                <Inbox
                                    style={{ marginRight: '1rem' }}
                                    strokeWidth={1.5}
                                    color={'var(--white)'} />
                            )}

                            <p className="email_button_text f-size-p1 f-weight-r">
                                {sentStatus ? 'subscribed' : 'subscribe'}
                            </p>
                        </Button>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Newsletter