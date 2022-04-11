import React from "react";

import preloader from "../../../assets/img/gifs/loader2.gif";
import styles from "./PreLoader.module.css"

const PreLoader = () => {
    return (
        <div className={styles.loader}>
            <img src={preloader} alt="preloader"/>
        </div>
    );
}

export  default PreLoader;
