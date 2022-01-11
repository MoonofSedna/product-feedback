import React, { useState, useEffect } from "react";
import { RecoilRoot } from "recoil";
import { SSRProvider } from "react-bootstrap";
import Head from "next/head";
import UserContext from "../context";
import JSONData from "../utils/data.json";
// utils
import { initRecoilState } from "../utils/initState";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  const getData = async () => {
    const staticData = JSONData;
    setUser(staticData.currentUser);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SSRProvider>
      <RecoilRoot initializeState={initRecoilState}>
        <UserContext.Provider value={{ user }}>
          <Head>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width"
            />
          </Head>
          {<Component {...pageProps} />}
        </UserContext.Provider>
      </RecoilRoot>
    </SSRProvider>
  );
}

export default MyApp;
