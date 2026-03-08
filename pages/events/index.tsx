import Head from "next/head";
import { GetStaticProps } from "next/types";
import React from "react";
import { UpcomingEvents } from "../../components/HomePage/UpcomingEvents/UpcomingEvents";
import { HeroTitle } from "../../components/UI/HeroTitle";
import { getTodayDate } from "../../lib/helper-functions";
import { client } from "../../lib/sanity.client";
import { IEvent } from "../../types/sanity-types";

const SITE_URL = "https://www.plesni-studio-ventus.hr";

export const EventsPage: React.FC<{ events: IEvent[] }> = ({ events }) => {
  return (
    <>
      <Head>
        <title>Plesni Događaji Zagreb | Plesni Studio Ventus</title>
        <meta
          name="description"
          content="Nadolazeći plesni događaji i manifestacije u Zagrebu – Plesni Studio Ventus. Samba, tango, latino ples i moderni ples. Prijavite se i sudjelujte!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${SITE_URL}/events`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="hr_HR" />
        <meta property="og:url" content={`${SITE_URL}/events`} />
        <meta property="og:site_name" content="Plesni Studio Ventus" />
        <meta
          property="og:title"
          content="Plesni Događaji Zagreb | Plesni Studio Ventus"
        />
        <meta
          property="og:description"
          content="Nadolazeći plesni događaji i manifestacije u Zagrebu – Plesni Studio Ventus. Samba, tango, latino ples i moderni ples."
        />
        <meta property="og:image" content={`${SITE_URL}/images/og-image.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Plesni događaji Zagreb – Plesni Studio Ventus"
        />
      </Head>
      <main>
        <HeroTitle title="DOGAĐAJI" />
        {events ? (
          <UpcomingEvents events={events} />
        ) : (
          <div>
            <h1>Loading...</h1>
          </div>
        )}
      </main>
    </>
  );
};

export default EventsPage;

export const getStaticProps: GetStaticProps = async () => {
  const groqQueryEvents = `\*[_type=='event' && (
    !(_id in path("drafts.**"))) && eventStart>="${getTodayDate()}"] \| order(eventStart asc)`;

  const eventData = await client.fetch(groqQueryEvents);

  return {
    props: {
      events: eventData,
    },
    revalidate: 120,
  };
};
