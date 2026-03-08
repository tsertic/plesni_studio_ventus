import Head from "next/head";
import React from "react";
import { OurTeachers } from "../../components/AboutPage/OurTeachers";
import { StudentTestimonials } from "../../components/AboutPage/StudentTestimonials";
import { Welcome } from "../../components/AboutPage/Welcome";
import { HeroTitle } from "../../components/HomePage/HeroTitle";
import { HeroSection } from "../../components/Layout/HeroSection/HeroSection";
import { CtaBanner } from "../../components/Shared/CtaBanner";
import { getAllInstructors } from "../../lib/sanityFetch";
import { IInstructors } from "../../types/sanity-types";

const SITE_URL = "https://www.plesni-studio-ventus.hr/";

const AboutPage: React.FC<{ instructors: IInstructors[] }> = ({
  instructors,
}) => {
  return (
    <>
      <Head>
        {/* ✅ Title */}
        <title>O Nama – Instruktori Plesa Zagreb | Plesni Studio Ventus</title>

        {/* ✅ Description */}
        <meta
          name="description"
          content="Upoznajte instruktore plesnog studija Ventus u Zagrebu – Domagoj Sertić i Korina Kovačić, višestruki prvaci u standardnim i latinsko-američkim plesovima."
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* ✅ Canonical */}
        <link rel="canonical" href={`${SITE_URL}/about`} />

        {/* ✅ Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="hr_HR" />
        <meta property="og:url" content={`${SITE_URL}/about`} />
        <meta property="og:site_name" content="Plesni Studio Ventus" />
        <meta
          property="og:title"
          content="O Nama – Instruktori Plesa Zagreb | Plesni Studio Ventus"
        />
        <meta
          property="og:description"
          content="Upoznajte instruktore plesnog studija Ventus u Zagrebu – Domagoj Sertić i Korina Kovačić, višestruki prvaci u standardnim i latinsko-američkim plesovima."
        />
        <meta property="og:image" content={`${SITE_URL}/images/og-image.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Instruktori plesa – Plesni Studio Ventus Zagreb"
        />
      </Head>
      <main>
        <HeroSection bgUrl="/images/aboutus-bg.webp">
          <HeroTitle mainTitle="O Nama" subTitle="" />
          <CtaBanner
            buttonPath="/classes#our-classes"
            buttonText="Pogledaj ponudu"
            subtitle="Od južne amerike do istočno europskih plesova"
            title="Bogati izbor ponude plesova"
          />
        </HeroSection>
        <Welcome />
        <OurTeachers instructors={instructors} />
        <StudentTestimonials />
      </main>
    </>
  );
};
export default AboutPage;

export const getStaticProps = async () => {
  const instructors = await getAllInstructors();
  return {
    props: {
      instructors,
    },
  };
};
