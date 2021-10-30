import Navigation from "components/global/navigation/Navigation";
import type { AppProps } from "next/app";
import HeadAndMeta from "components/global/headAndMeta/HeadAndMeta";

import "../styles/main.scss";
// import HeadAndMeta from "components/global/headAndMeta/HeadAndMeta";


function MyApp({ Component, pageProps }:AppProps) {
  return (
    <>

    <HeadAndMeta
        title="Liquid ICP ∞"
        description="Liquid ICP is world's first s-Bridge
                            where bridged and staked assets remain
                            liquid. Fractional reserve is governed
                            by Liquid ICP community and ensures
                            immediate withdrawal of ICP coins at
                            any given time."
        favIconImagePath="/svg/logo.svg"
        baseUrl="https://liquid-icp.vercel.app"
        ogTitle="Liquid ICP ∞"
        ogDescription="Liquid ICP is world's first s-Bridge
                            where bridged and staked assets remain
                            liquid. Fractional reserve is governed
                            by Liquid ICP community and ensures
                            immediate withdrawal of ICP coins at
                            any given time."
        ogImagePath="/meta_images/og_image.png"
      />

      
      <Navigation/>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
