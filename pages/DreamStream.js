import React from "react";
import styles from "../styles/videostream.module.css";
import { useEffect } from "react";
import { useContext } from "react";
import { Hook } from "./context/Hooks";

const DreamStream = () => {
  const { stream3 } = useContext(Hook);
  return (
    <div>
      {stream3 && (
        <div className={styles.container}>
          <p className={styles.header}>DreamStream</p>

          <video
            className={styles.video}
            src="/Dreamstream.mp4"
            controls={true}
          ></video>
        </div>
      )}

      {!stream3 && <p>Start the Stream to continue</p>}
    </div>
  );
};

export default DreamStream;
