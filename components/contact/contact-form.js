import { useEffect, useState } from 'react';
import classes from './contact-form.module.css';
import Notification from '../ui/notification';

export default function ContactForm() {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredName, setEnteredName] = useState('');
    const [enteredMessage, setEnteredMessage] = useState('');
    const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'

    useEffect(() => {
        if (requestStatus === 'success' || requestStatus === 'error') {
            const timer = setTimeout(() => {
                setRequestStatus(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [requestStatus]);

    function sendMessageHandler(event) {
        event.preventDefault();

        setRequestStatus('pending');

        fetch('/api/contact', {
            method: 'POST',
            body: JSON.stringify({
                email: enteredEmail,
                name: enteredName,
                message: enteredMessage
            })
        })
            .then(res => res.json())
            .then(res => {
                setRequestStatus('success');
                setEnteredMessage('');
                setEnteredEmail('');
                setEnteredName('');
            })
            .catch(err => setRequestStatus('error'));
    }

    let notification;

    if (requestStatus === 'pending') {
        notification = {
            status: 'pending',
            title: 'Sending message...',
            message: 'Your message is on its way!',
        };
    }

    if (requestStatus === 'success') {
        notification = {
            status: 'success',
            title: 'Success!',
            message: 'Message sent successfully!',
        };
    }

    if (requestStatus === 'error') {
        notification = {
            status: 'error',
            title: 'Error!',
            message: 'Error occured while sending your message',
        };
    }

    return (
        <section className={classes.contact}>
            <h1>How can i help you?</h1>
            <form className={classes.form} onSubmit={sendMessageHandler}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor='email'>Your Email</label>
                        <input
                            type='email'
                            id='email'
                            required
                            value={enteredEmail}
                            onChange={(event) => setEnteredEmail(event.target.value)}
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='name'>Your Name</label>
                        <input
                            type='text'
                            id='name'
                            required
                            value={enteredName}
                            onChange={(event) => setEnteredName(event.target.value)}
                        />
                    </div>
                </div>
                <div className={classes.control}>
                    <label htmlFor='message'>Your Message</label>
                    <textarea
                        id='message'
                        rows='5'
                        required
                        value={enteredMessage}
                        onChange={(event) => setEnteredMessage(event.target.value)}
                    ></textarea>
                </div>

                <div className={classes.actions}>
                    <button>Send Message</button>
                </div>
            </form>
            {notification && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
        </section>
    );
}
