import React from "react";
import styles from "../../styles/stats.module.css";
import { useContext } from "react";
import { Hook } from "../context/Hooks";
const Stats = () => {
  const { balance } = useContext(Hook);
  const { flowrate } = useContext(Hook);
  const { stream1, stream2, stream3 } = useContext(Hook);
  return (
    <div className={styles.container}>
      <div className={styles.watch}>
        <p>Current Watch Time : -</p>
        <p>Your Balance : {balance} MATICx </p>
        <p>Active Streams :</p>
        <div className={styles.stream_container}>
          {stream1 && <p>VooStream : </p>}
          {stream2 && <p>VayoStream : </p>}
          {stream3 && <p>DreamStream : </p>}
        </div>

        {flowrate ? (
          <p>Flow rate : {flowrate}</p>
        ) : (
          <p>Choose Your Preferences and get Started</p>
        )}
        <p>Subscribed Watch Time : -</p>
        {/* <p>Flow rate {flowrate}</p> */}
      </div>
      <div className={styles.quote_container}>
        <p className={styles.quote1}>
          Control all your Video Subscriptions at <span>one place</span>
        </p>
        <p className={styles.quote2}>
          “ We know you Binge Watch , so why pay for your Un-Watch, Pay As You
          Watch “
        </p>
      </div>
    </div>
  );
};

export default Stats;
