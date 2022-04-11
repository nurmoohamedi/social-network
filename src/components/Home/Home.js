import classes from "./Home.module.css";

import logo from './logo.svg';


const Home = (props) => {
    return (
        <div>
            <section className={classes.App__header}>
                <img src={logo} className={classes.App__logo} alt=""/>
                <p className={classes.hover_tip}>Welcome to my first React Project!</p>
                <a target={"_blank"} href="https://www.instagram.com/muhamedi21">Click Me</a>
            </section>
            {/*<section className={classes.App__content}>*/}
            {/*    <p><strong>I hope you will enjoy this site.</strong></p>*/}
            {/*</section>*/}
            {/*<br/>*/}
            {/*<div className={classes.twilight}>*/}
            {/*    twilight*/}
            {/*</div>*/}
        </div>
    )
}

export default Home;