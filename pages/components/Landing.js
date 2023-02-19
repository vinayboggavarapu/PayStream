import React from "react";
import styles from "../../styles/landing.module.css";
import Navbar from "./Navbar";
import { Dashboard } from "./Dashboard";
import Image from "next/image";

const Landing = () => {
  return (
    <div className={styles.container}>
      <Image
        className={styles.circle}
        src="/rad.png"
        width={400}
        height={400}
      ></Image>
      <div className={styles.hero}>
        <Navbar />
        <Dashboard />
      </div>
    </div>
  );
};

export default Landing;
