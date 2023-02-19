import { createContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const Hook = createContext();
export const HooksProvider = ({ children }) => {
  const status = useAccount();
  const [connect, setconnect] = useState(false);
  const [balance, setbalance] = useState();
  const [flowrate, setflowrate] = useState("");
  const [closed, setclosed] = useState(false);
  const [totalamount, settotalamount] = useState();
  const [stream1, setstream1] = useState(false);
  const [stream2, setstream2] = useState(false);
  const [stream3, setstream3] = useState(false);
  //USing the Wallet address or Contract Address Here
  const VooStream_address = "";
  const vayoStream_address = "";
  const dreamStream_address = "";

  useEffect(() => {
    setconnect(status.isConnected);
    setaddress(status.address);
  }, [status]);

  const [address, setaddress] = useState();
  return (
    <Hook.Provider
      value={{
        connect,
        address,
        balance,
        setbalance,
        closed,
        setclosed,
        settotalamount,
        totalamount,
        flowrate,
        setflowrate,
        VooStream_address,
        vayoStream_address,
        dreamStream_address,
        stream1,
        setstream1,
        stream2,
        setstream2,
        stream3,
        setstream3,
      }}
    >
      {children}
    </Hook.Provider>
  );
};
