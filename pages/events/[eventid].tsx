import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import { EventBody } from "../../components/EventPage/EventBody";
import { EventDetails } from "../../components/EventPage/EventDetails";
import { EventHeader } from "../../components/EventPage/EventHeader";
import { Wrapper } from "../../components/Layout/Wrapper/Wrapper";
import { client, urlFor } from "../../lib/sanity.client";
import { IEvent } from "../../types/sanity-types";

const SITE_URL = "https://www.plesni-studio-ventus.hr";

const SingleEventPage: React.FC<{ event: IEvent }> = ({ event }) => {
  if (!event) {
    return (
      <Wrapper>
        <h1>Loading...</h1>
      </Wrapper>
    );
  }

  const { title, mainImage, description, author, slug } = event;
  const imageUrl = mainImage
    ? urlFor(mainImage).url()
    : `${SITE_URL}/images/og-image.jpg`;
  const canonicalUrl = `${SITE_URL}/events/${slug.current}`;
  const pageTitle = `${title} | Plesni Studio Ventus Zagreb`;
  const pageDescription = description?.slice(0, 155).trimEnd() + "...";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="hr_HR" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Plesni Studio Ventus" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />
      </Head>
      <Wrapper>
        <section>
          <EventHeader event={event} />
          <EventBody event={event} />
          <EventDetails event={event} />
        </section>
      </Wrapper>
    </>
  );
};

export default SingleEventPage;

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context.params) {
    return {
      props: {
        event: null,
      },
    };
  }
  const slug = context.params.eventid;
  const eventsListData = await client.fetch(
    `\*[_type=="event"]{
      ...,
      categories[]->,
      organizator->
    }`,
  );
  const event = eventsListData.find(
    (event: IEvent) => event.slug.current === slug,
  );

  return {
    props: {
      event,
    },
    revalidate: 120,
  };
};

export const getStaticPaths = async () => {
  const eventsListData = await client.fetch(`\*[_type=='event']`);
  const pathsList = eventsListData.map((event: IEvent) => {
    return { params: { eventid: event.slug.current } };
  });
  return {
    paths: pathsList,
    fallback: true,
  };
};
