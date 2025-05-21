"use client";

import MainContext from "@/context/MasterContext";
import Banner from "@/components/BannerSection/Banner/Banner";

export default function Home() {
  return (
    <MainContext>
      <Banner />
    </MainContext>
  );
}
