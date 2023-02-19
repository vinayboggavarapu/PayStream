import React, { useState } from "react";
import styles from "../styles/videostream.module.css";
import { useEffect } from "react";
import { useContext } from "react";
import { Hook } from "./context/Hooks";
import { useRouter } from "next/router";

const VayoStream = () => {
  const router = useRouter();
  const data = router.query;
  const { stream2 } = useContext(Hook);
  console.log(data);
  return (
    <div>
      {stream2 && (
        <div className={styles.container}>
          <p className={styles.header}>VayoStream</p>
          <video
            className={styles.video}
            src="/Vayostream.mp4"
            controls={true}
          ></video>
        </div>
      )}
      {!stream2 && <p>Start the Stream to continue</p>}
    </div>
  );
};

export default VayoStream;
