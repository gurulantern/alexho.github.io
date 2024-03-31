import React from 'react'
import styles from "../../styles/Links.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Links: React.FC = () => {
  return (
    <div className={styles.container}>
        <a href='https://www.linkedin.com/in/alex-ho-a9471833/'>
            <FontAwesomeIcon className={styles.icon} icon={faLinkedin} />
        </a>     
        <a href='https://github.com/gurulantern'>
            <FontAwesomeIcon className={styles.icon} icon={faGithub} />
        </a>
    </div>
  )
}

export default Links