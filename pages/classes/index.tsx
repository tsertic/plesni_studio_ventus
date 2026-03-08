import Head from "next/head";
import React from "react";
import { HeroTitle } from "../../components/HomePage/HeroTitle";
import { HeroSection } from "../../components/Layout/HeroSection/HeroSection";
import { CtaBanner } from "../../components/Shared/CtaBanner";
import { FreeLessonSignup } from "../../components/Shared/FreeLessonSignup";
import { OurClasses } from "../../components/Shared/OurClasses/OurClasses";
import { PriceList } from "../../components/Shared/PriceList";
import { WhatYouGet } from "../../components/Shared/WhatYouGet";
import { getFeaturedDancesTeached } from "../../lib/sanityFetch";
import { IDances } from "../../types/sanity-types";

const SITE_URL = "https://www.plesni-studio-ventus.hr/";

const ClassesPage: React.FC<{ dances: IDances[] }> = ({ dances }) => {
  return (
    <>
      <Head>
        <title>
          Plesni Tečajevi Zagreb – Samba, Tango, Latino, Moderni Ples | Ventus
        </title>

        <meta
          name="description"
          content="Plesni tečajevi u Zagrebu – samba, tango, latino ples, moderni ples, disco dance i prvi ples za vjenčanje. Grupni i individualni satovi. Prve dvije lekcije besplatno!"
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="canonical" href={`${SITE_URL}/classes`} />

        <meta property="og:type" content="website" />
        <meta property="og:locale" content="hr_HR" />
        <meta property="og:url" content={`${SITE_URL}/classes`} />
        <meta property="og:site_name" content="Plesni Studio Ventus" />
        <meta
          property="og:title"
          content="Plesni Tečajevi Zagreb – Samba, Tango, Latino | Ventus"
        />
        <meta
          property="og:description"
          content="Plesni tečajevi u Zagrebu – samba, tango, latino ples, moderni ples, disco dance i prvi ples za vjenčanje. Prve dvije lekcije besplatno!"
        />
        <meta property="og:image" content={`${SITE_URL}/images/og-image.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Plesni tečajevi Zagreb – Plesni Studio Ventus"
        />
      </Head>
      <main>
        <HeroSection bgUrl="/images/plesovi-bg.webp">
          <HeroTitle mainTitle="PLESOVI" subTitle="" />
          <CtaBanner
            buttonPath="#free-lesson"
            buttonText="Prijavite se i prve dvije grupne lekcije - potpuno besplatno!"
            title="Dobro Došli Novi Studenti"
          />
        </HeroSection>
        <WhatYouGet />
        <OurClasses dances={dances} />
        <FreeLessonSignup />
        <PriceList />
      </main>
    </>
  );
};
export default ClassesPage;

export const getStaticProps = async () => {
  const dancesData = await getFeaturedDancesTeached();
  return {
    props: {
      dances: dancesData,
    },
    revalidate: 320,
  };
};
