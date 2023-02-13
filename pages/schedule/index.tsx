import Head from "next/head";
import React from "react";
import { OurTeachers } from "../../components/AboutPage/OurTeachers";
import { HeroTitle } from "../../components/HomePage/HeroTitle";
import { HeroSection } from "../../components/Layout/HeroSection/HeroSection";
import { CtaBanner } from "../../components/Shared/CtaBanner";
import { FreeLessonSignup } from "../../components/Shared/FreeLessonSignup";
import { OurClasses } from "../../components/Shared/OurClasses/OurClasses";
import { Schedule } from "../../components/Shared/Schedule";

const SchedulePage = () => {
  return (
    <>
      <Head>
        <title>Ventus - Raspored</title>
        <meta
          name="description"
          content="Plesni studio Ventus.Prvi ples lekcije,moderni ples,samba, tango, latino plesovi.Domagoj Sertić i Korina vrhunski nagrađivani instruktori plesa."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HeroSection bgUrl="/images/classes-bg.webp">
          <HeroTitle mainTitle="Raspored" subTitle="" />
          <CtaBanner
            buttonPath="#free-lesson"
            buttonText="Prijavi se"
            subtitle="Prijavite se i 45-minuta lekcija upoznavanja - potpuno besplatno!!"
            title="Odaberi savršeno vrijeme za sat plesa"
          />
        </HeroSection>
        <Schedule />
        <OurTeachers />
        <FreeLessonSignup />
      </main>
    </>
  );
};
export default SchedulePage;
