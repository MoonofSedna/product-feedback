import React, { useState, useEffect } from "react";
import { SSRProvider } from "react-bootstrap";
import Head from "next/head";
import "../styles/app.css";
import UserContext from "../context";
import JSONData from "../public/data.json";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const savedData = window.localStorage.getItem("newData");
    const staticData = await JSONData;
    if (savedData) {
      setFeedbacks(JSON.parse(savedData));
    } else {
      setFeedbacks(staticData.productRequests);
    }
    setUser(staticData.currentUser);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [setFeedbacks]);

  return (
    <SSRProvider>
      <UserContext.Provider value={{ user, feedbacks, setFeedbacks }}>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        {!loading && <Component {...pageProps} />}
      </UserContext.Provider>
    </SSRProvider>
  );
}

export default MyApp;
