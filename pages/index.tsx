import Head from "next/head";
import { GetStaticProps } from "next/types";
import { OurTeachers } from "../components/AboutPage/OurTeachers";
import { HeroTitle } from "../components/HomePage/HeroTitle";
import { LatestNews } from "../components/HomePage/LatestNews";
import { MiddleCards } from "../components/HomePage/MiddleCards";
import { UpcomingEvents } from "../components/HomePage/UpcomingEvents/UpcomingEvents";
import { HeroSection } from "../components/Layout/HeroSection/HeroSection";
import { CtaBanner } from "../components/Shared/CtaBanner";
import { OurClasses } from "../components/Shared/OurClasses/OurClasses";
import { getTodayDate } from "../lib/helper-functions";
import { client } from "../lib/sanity.client";
import { getFeaturedDancesTeached, getLatestPosts } from "../lib/sanityFetch";
import { IDances, IEvent, IInstructors, IPost } from "../types/sanity-types";

const SITE_URL = "https://www.plesni-studio-ventus.hr/";

const HomePage: React.FC<{
  upcomingEvents: IEvent[];
  latestNews: IPost[];
  instructors: IInstructors[];
  dances: IDances[];
}> = ({ upcomingEvents, latestNews, instructors, dances }) => {
  return (
    <>
      <Head>
        <title>Plesna Škola Zagreb | Plesni Studio Ventus</title>

        <meta
          name="description"
          content="Plesna škola u Zagrebu – samba, tango, latino, moderni ples i prvi ples za vjenčanje. Vrhunski instruktori Domagoj Sertić i Korina Kovačić. Prve dvije grupne lekcije besplatno!"
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="canonical" href={SITE_URL} />

        <meta property="og:type" content="website" />
        <meta property="og:locale" content="hr_HR" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:site_name" content="Plesni Studio Ventus" />
        <meta
          property="og:title"
          content="Plesna Škola Zagreb | Plesni Studio Ventus"
        />
        <meta
          property="og:description"
          content="Plesna škola u Zagrebu – samba, tango, latino, moderni ples i prvi ples za vjenčanje. Prve dvije grupne lekcije besplatno!"
        />

        <meta property="og:image" content={`${SITE_URL}/images/og-image.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Plesni Studio Ventus Zagreb" />
      </Head>
      <main>
        <HeroSection bgUrl="/images/hero-image.webp">
          <HeroTitle subTitle="kod nas naučite" mainTitle="PLESATI" />
          <CtaBanner
            buttonPath="/schedule#free-lesson"
            buttonText="Prijavi se"
            subtitle="Prijavite se i prve dvije grupne lekcije - potpuno besplatno!"
            title="Dobro Došli Novi Studenti"
          />
        </HeroSection>
        <MiddleCards />
        <OurClasses dances={dances} />
        <UpcomingEvents events={upcomingEvents} />
        <OurTeachers instructors={instructors} />
        <LatestNews latestNews={latestNews} />
      </main>
    </>
  );
};
export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  const groqQueryEvents = `\*[_type=='event' && (
    !(_id in path("drafts.**"))) && eventStart>="${getTodayDate()}"] \| order(eventStart asc)`;

  const groqQueryInstructors = `\*[_type=='instructors' && (
    !(_id in path("drafts.**")))]{
      ...,
      knowledge[]->
    }`;

  const eventData = await client.fetch(groqQueryEvents);
  const instructorsData = await client.fetch(groqQueryInstructors);
  const latestPostData = await getLatestPosts(3);
  const dancesData = await getFeaturedDancesTeached();

  return {
    props: {
      upcomingEvents: eventData,
      latestNews: latestPostData,
      instructors: instructorsData,
      dances: dancesData,
    },
    revalidate: 120,
  };
};
