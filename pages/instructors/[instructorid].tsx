import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import { InstructorPageContent } from "../../components/InstructorsPage/InstructorPageContent";
import { Wrapper } from "../../components/Layout/Wrapper/Wrapper";
import { LightPageTitle } from "../../components/UI/LightPageTitle";
import { client } from "../../lib/sanity.client";
import { getAllInstructorsPaths, getInstructor } from "../../lib/sanityFetch";
import { IInstructors } from "../../types/sanity-types";

const SITE_URL = "https://www.plesni-studio-ventus.hr/";

export const InstructorPage: React.FC<{ instructor: IInstructors }> = ({
  instructor,
}) => {
  const fullName = instructor
    ? `${instructor.name} ${instructor.surname}`
    : "Instruktor";

  const pageTitle = `${fullName} – Instruktor Plesa Zagreb | Plesni Studio Ventus`;

  const pageDescription = instructor?.description
    ? instructor.description.slice(0, 155).trimEnd() + "..."
    : `${fullName} – instruktor plesa u plesnom studiju Ventus Zagreb. Grupni i individualni satovi plesa.`;

  const canonicalUrl = instructor?.slug?.current
    ? `${SITE_URL}/instructors/${instructor.slug.current}`
    : `${SITE_URL}/instructors`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>

        <meta name="description" content={pageDescription} />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="profile" />
        <meta property="og:locale" content="hr_HR" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Plesni Studio Ventus" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />

        <meta
          property="og:image"
          content={instructor?.image ?? `${SITE_URL}/images/og-image.jpg`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content={`${fullName} – instruktor plesa Zagreb`}
        />
      </Head>
      <Wrapper>
        {instructor ? (
          <>
            <LightPageTitle title={fullName} />
            <InstructorPageContent instructor={instructor} />
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </Wrapper>
    </>
  );
};
export default InstructorPage;

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context.params || !context.params.instructorid) {
    return {
      props: {
        instructor: null,
      },
    };
  }
  const slug = context.params.instructorid;
  const instructor = await getInstructor(slug);
  return {
    props: {
      instructor,
    },
    revalidate: 3600,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pathsList = await getAllInstructorsPaths();
  return {
    paths: pathsList,
    fallback: false,
  };
};
