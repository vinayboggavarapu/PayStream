import React from "react";
import styles from "../styles/videostream.module.css";
import { useEffect } from "react";
import { useContext } from "react";
import { Hook } from "./context/Hooks";

const VooStream = () => {
  const { stream1 } = useContext(Hook);
  useEffect(() => {
    console.log(stream1);
  });

  return (
    <div>
      {stream1 && (
        <div className={styles.container}>
          <p className={styles.header}>VooStream</p>

          <video
            className={styles.video}
            src="/Voostream.mp4"
            controls={true}
          ></video>
        </div>
      )}

      {!stream1 && <p>Start the Stream to continue</p>}
    </div>
  );
};

export default VooStream;
