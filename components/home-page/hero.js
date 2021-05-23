import Image from 'next/image';
import classes from './hero.module.css';

export default function Hero() {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image src="/images/site/john.jpg" alt="John Doe" width={300} height={300} />
            </div>
            <h1>Hi, I'm John</h1>
            <p>I blog about web development...</p>
        </section>
    );
}
