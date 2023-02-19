import React, { useEffect } from "react";
import styles from "../../styles/navbar.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <p className={styles.header}>PAYSTREAM</p>
      <ConnectButton showBalance={false} chainStatus={"none"} />
    </div>
  );
};

export default Navbar;
