import Head from "next/head";
import React from "react";
import { OurTeachers } from "../../components/AboutPage/OurTeachers";
import { HeroTitle } from "../../components/HomePage/HeroTitle";
import { HeroSection } from "../../components/Layout/HeroSection/HeroSection";
import { CtaBanner } from "../../components/Shared/CtaBanner";
import { FreeLessonSignup } from "../../components/Shared/FreeLessonSignup";
import { PriceList } from "../../components/Shared/PriceList";
import { Schedule } from "../../components/Shared/Schedule";
import { getAllInstructors, getAllSchedules } from "../../lib/sanityFetch";
import { IInstructors, IScheduleData } from "../../types/sanity-types";

const SITE_URL = "https://www.plesni-studio-ventus.hr/";

const SchedulePage: React.FC<{
  instructors: IInstructors[];
  schedules: IScheduleData[];
}> = ({ instructors, schedules }) => {
  return (
    <>
      <Head>
        <title>Raspored Satova Plesa Zagreb | Plesni Studio Ventus</title>

        <meta
          name="description"
          content="Raspored plesnih satova u Zagrebu – odaberi idealno vrijeme za grupne ili individualne lekcije plesa. Samba, tango, latino, moderni ples. Prve dvije lekcije besplatno!"
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="canonical" href={`${SITE_URL}/schedule`} />

        <meta property="og:type" content="website" />
        <meta property="og:locale" content="hr_HR" />
        <meta property="og:url" content={`${SITE_URL}/schedule`} />
        <meta property="og:site_name" content="Plesni Studio Ventus" />
        <meta
          property="og:title"
          content="Raspored Satova Plesa Zagreb | Plesni Studio Ventus"
        />
        <meta
          property="og:description"
          content="Raspored plesnih satova u Zagrebu – grupne i individualne lekcije plesa. Samba, tango, latino, moderni ples. Prve dvije lekcije besplatno!"
        />
        <meta property="og:image" content={`${SITE_URL}/images/og-image.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Raspored satova plesa – Plesni Studio Ventus Zagreb"
        />
      </Head>
      <main>
        <HeroSection bgUrl="/images/classes-bg.webp">
          <HeroTitle mainTitle="Raspored" subTitle="" />
          <CtaBanner
            buttonPath="#free-lesson"
            buttonText="Prijavi se"
            subtitle="Prijavite se i prve dvije grupne lekcije - potpuno besplatno!!"
            title="Odaberi savršeno vrijeme za sat plesa"
          />
        </HeroSection>

        {schedules.map((schedule) => (
          <Schedule
            key={schedule._id}
            scheduleData={schedule}
            showTitle={!schedule.isMain}
          />
        ))}

        <OurTeachers instructors={instructors} />
        <FreeLessonSignup />
        <PriceList />
      </main>
    </>
  );
};
export default SchedulePage;

export const getStaticProps = async () => {
  const instructors = await getAllInstructors();
  const schedules = await getAllSchedules();
  return {
    props: {
      instructors,
      schedules,
    },
  };
};
