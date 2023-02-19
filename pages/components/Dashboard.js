/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Stats from "./stats";
import styles from "../../styles/dashboard.module.css";
import { Hook } from "../context/Hooks";
import { HooksProvider } from "../context/Hooks";
import { useContext } from "react";
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
import Link from "next/link";

export const Dashboard = () => {
  const { connect } = useContext(Hook);
  const { address } = useContext(Hook);
  const { VooStream_address } = useContext(Hook);
  const { vayoStream_address } = useContext(Hook);
  const { dreamStream_address } = useContext(Hook);
  const { balance, setbalance } = useContext(Hook);
  const [header, setheader] = useState("Set An Amount for this Month");
  const { setflowrate } = useContext(Hook);
  const { totalamount, settotalamount } = useContext(Hook);
  const [loading, setloading] = useState(false);
  const [preferences, setpreferences] = useState("Choose your preferences");
  const [confirm, setconfirm] = useState(false);
  const [select, setselect] = useState(false);
  const [select1, setselect1] = useState(false);
  const [max, setmax] = useState(false);
  const [select2, setselect2] = useState(false);
  const [select3, setselect3] = useState(false);
  const { stream1, setstream1 } = useContext(Hook);
  const { stream2, setstream2 } = useContext(Hook);
  const { stream3, setstream3 } = useContext(Hook);

  useEffect(() => {
    if (address) {
      setInterval(() => {
        (async () => {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const sf = await Framework.create({
            chainId: Number(80001),
            provider: provider,
          });
          const maticx = await sf.loadSuperToken("MATICx");
          const userBalance = await maticx.balanceOf({
            account: address,
            providerOrSigner: provider,
          });
          setbalance(userBalance / 1e18);
        })();
      }, 100);
    }
  });

  const flow = () => {
    if (totalamount) {
      const amt = Math.round((totalamount * 1e18) / (3600 * 24 * 30));
      console.log(amt);
      setflowrate(amt);
      return amt;
    }
  };

  //SuperFluid

  async function createNewFlowAsOperator(sender, recipient, flowRate, type) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();

    const sf = await Framework.create({
      chainId: Number(80001),
      provider: provider,
    });
    const superSigner = sf.createSigner({ signer: signer });

    console.log(signer);
    console.log("woo");
    console.log(await superSigner.getAddress());
    const maticx = await sf.loadSuperToken("MATICx");

    try {
      const createFlowOperation = maticx.createFlowByOperator({
        sender: sender,
        receiver: recipient,
        flowRate: flowRate,
      });

      console.log("Creating your stream...");
      setloading(true);

      const result = await createFlowOperation.exec(signer);
      if (result.hash) {
        switch (type) {
          case 1:
            setstream1(true);
            console.log("stream1 start");
            break;
          case 2:
            setstream2(true);
            console.log("stream2 start");
            break;
          case 3:
            setstream3(true);
            console.log("stream3 start");
            break;
        }
      }
      setloading(false);
      console.log(
        `Congrats - you've just created a money stream!
      View Your Stream At: https://app.superfluid.finance
      Network: Mumbai
      Super Token: MATICX
      Receiver: ${recipient},
      FlowRate: ${flowRate}
      `
      );
    } catch (error) {
      setloading(false);

      console.error(error);
    }
  }

  async function deleteExistingFlow(recipient, type) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();

    const sf = await Framework.create({
      chainId: Number(80001),
      provider: provider,
    });

    const superSigner = sf.createSigner({ signer: signer });

    console.log(signer);
    console.log(await superSigner.getAddress());
    const maticx = await sf.loadSuperToken("MATICx");

    console.log(maticx);

    try {
      const deleteFlowOperation = maticx.deleteFlow({
        sender: await signer.getAddress(),
        receiver: recipient,
      });

      console.log(deleteFlowOperation);
      console.log("Deleting your stream...");
      setloading(true);
      const result = await deleteFlowOperation.exec(superSigner);
      if (result.hash) {
        switch (type) {
          case 1:
            setstream1(false);
            break;
          case 2:
            setstream2(false);
            break;
          case 3:
            setstream3(false);
            break;
        }
      }
      setloading(false);

      console.log(
        `Congrats - you've just updated a money stream!
      `
      );
    } catch (error) {
      setloading(false);
      alert("Start your Stream first");
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error);
    }
  }

  const vooStream = () => window.open("/VooStream", "_blank");
  const vayoStream = () => window.open("../VayoStream", "_blank");
  const dreamStream = () => window.open("../DreamStream", "_blank");

  return (
    <div className={styles.checker}>
      {loading && (
        <Image
          width={100}
          className={styles.loader}
          height={100}
          src="/gloader.gif"
        ></Image>
      )}
      {connect ? (
        <div className={styles.container}>
          <div className={styles.controls}>
            <div className={styles.inner_wrap1}>
              <p className={styles.inner_header}>{header}</p>
              <div className={styles.ref_container}>
                {!max && (
                  <input
                    className={styles.input1}
                    onChange={(e) => {
                      const max_amount = e.target.value;
                      settotalamount(max_amount);
                      console.log(max_amount);
                    }}
                    type="number"
                  ></input>
                )}
                {max && totalamount && (
                  <p className={styles.monthlyamount}>{totalamount}</p>
                )}
                <p className={styles.matic}>MATICx</p>
              </div>
            </div>
            <div className={styles.inner_wrap2}>
              <p className={styles.inner_header}>{preferences}</p>

              <div className={styles.input}>
                {!confirm && (
                  <p
                    className={`${
                      select1 ? styles.platform_active : styles.platform_name
                    }`}
                    onClick={() => {
                      setselect1(!select1);
                    }}
                  >
                    VooStream
                  </p>
                )}
                {confirm && select1 && (
                  <p
                    onClick={() => {
                      if (stream1) {
                        vooStream();
                      } else {
                        alert("start The stream1");
                      }
                    }}
                    className={`${
                      select1 ? styles.platform_active : styles.platform_name
                    }`}
                  >
                    VooStream
                  </p>
                )}
                {confirm && select1 && (
                  <div>
                    <button
                      className={styles.start}
                      onClick={() =>
                        createNewFlowAsOperator(
                          address,
                          //prettier-ignore

                          VooStream_address,
                          //prettier-ignore
                          flow(),
                          1
                        )
                      }
                    >
                      Start
                    </button>
                    <button
                      className={styles.stop}
                      onClick={() => deleteExistingFlow(VooStream_address, 1)}
                    >
                      Stop
                    </button>
                  </div>
                )}
              </div>

              <div className={styles.input}>
                {!confirm && (
                  <p
                    className={`${
                      select2 ? styles.platform_active : styles.platform_name
                    }`}
                    onClick={() => {
                      setselect2(!select2);
                    }}
                  >
                    VayoStream
                  </p>
                )}
                {confirm && select2 && (
                  <p
                    onClick={() => {
                      if (stream2) {
                        vayoStream();
                      } else {
                        alert("start The stream2");
                      }
                    }}
                    className={`${
                      select2 ? styles.platform_active : styles.platform_name
                    }`}
                  >
                    VayoStream
                  </p>
                )}
                {confirm && select2 && (
                  <div>
                    <button
                      className={styles.start}
                      onClick={() =>
                        createNewFlowAsOperator(
                          address,
                          //prettier-ignore

                          vayoStream_address,
                          //prettier-ignore
                          flow(),
                          2
                        )
                      }
                    >
                      Start
                    </button>
                    <button
                      className={styles.stop}
                      onClick={() => deleteExistingFlow(vayoStream_address, 2)}
                    >
                      Stop
                    </button>
                  </div>
                )}
              </div>

              <div className={styles.input}>
                {!confirm && (
                  <p
                    className={`${
                      select3 ? styles.platform_active : styles.platform_name
                    }`}
                    onClick={() => {
                      setselect3(!select3);
                    }}
                  >
                    DreamStream
                  </p>
                )}
                {confirm && select3 && (
                  <p
                    onClick={() => {
                      if (stream3) {
                        dreamStream();
                      } else {
                        alert("start The stream3");
                      }
                    }}
                    className={`${
                      select3 ? styles.platform_active : styles.platform_name
                    }`}
                  >
                    DreamStream
                  </p>
                )}
                {confirm && select3 && (
                  <div>
                    <button
                      className={styles.start}
                      onClick={() =>
                        createNewFlowAsOperator(
                          address,
                          //prettier-ignore

                          dreamStream_address,
                          //prettier-ignore
                          flow(),
                          3
                        )
                      }
                    >
                      Start
                    </button>
                    <button
                      className={styles.stop}
                      onClick={() => deleteExistingFlow(dreamStream_address, 3)}
                    >
                      Stop
                    </button>
                  </div>
                )}
              </div>

              {(select1 || select2 || select3) && (
                <div className={styles.confirm}>
                  {select ? (
                    <p
                      onClick={() => {
                        setconfirm(false);
                        setselect(false);
                      }}
                    >
                      Edit
                    </p>
                  ) : (
                    <p
                      onClick={() => {
                        setselect(true);
                        setconfirm(true);
                        setmax(true);
                        setpreferences("Your Preferences");
                        setheader("Amount set this month");
                      }}
                    >
                      Confirm
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          <Stats />
        </div>
      ) : (
        <p className={styles.pretext}>
          A New Way to Watch the Content you Like
        </p>
      )}
    </div>
  );
};
