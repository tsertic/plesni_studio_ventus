import Head from "next/head";
import React from "react";
import { HeroTitle } from "../../components/HomePage/HeroTitle";
import { HeroSection } from "../../components/Layout/HeroSection/HeroSection";
import { CtaBanner } from "../../components/Shared/CtaBanner";
import { OurClasses } from "../../components/Shared/OurClasses/OurClasses";

const ClassesPage = () => {
  return (
    <>
      <Head>
        <title>Ventus - O Nama</title>
        <meta
          name="description"
          content="Plesni studio Ventus.Prvi ples lekcije,moderni ples,samba, tango, latino plesovi.Domagoj Sertić i Korina vrhunski nagrađivani instruktori plesa."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HeroSection bgUrl="/images/hero-image.jpeg">
          <HeroTitle mainTitle="O Nama" subTitle="" />
          <CtaBanner
            buttonPath="/register"
            buttonText="Pogledaj ponudu"
            subtitle="Od južne amerike do istočno europskih plesova"
            title="Bogati izbor ponude plesova"
          />
        </HeroSection>
      </main>
    </>
  );
};
export default ClassesPage;