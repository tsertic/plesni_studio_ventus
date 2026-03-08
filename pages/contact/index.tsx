import Head from "next/head";
import React from "react";
import { HeroTitle } from "../../components/UI/HeroTitle";
import { CtaBanner } from "../../components/Shared/CtaBanner";
import { ContactInfo } from "../../components/ContactPage/ContactInfo";
import { ContactForm } from "../../components/Shared/ContactForm";

const SITE_URL = "https://www.plesni-studio-ventus.hr";

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Kontakt – Plesni Studio Ventus Zagreb</title>
        <meta
          name="description"
          content="Kontaktirajte Plesni Studio Ventus u Zagrebu. Email: plesni.studio.ventus@gmail.com, telefon: +385 91 445 5914. Prijavite se na besplatnu lekciju plesa!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${SITE_URL}/contact`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="hr_HR" />
        <meta property="og:url" content={`${SITE_URL}/contact`} />
        <meta property="og:site_name" content="Plesni Studio Ventus" />
        <meta
          property="og:title"
          content="Kontakt – Plesni Studio Ventus Zagreb"
        />
        <meta
          property="og:description"
          content="Kontaktirajte Plesni Studio Ventus u Zagrebu. Email: plesni.studio.ventus@gmail.com, telefon: +385 91 445 5914."
        />
        <meta property="og:image" content={`${SITE_URL}/images/og-image.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Kontakt – Plesni Studio Ventus Zagreb"
        />
      </Head>
      <main>
        <HeroTitle title="Kontakt" />
        <ContactInfo />
        <ContactForm />
      </main>
    </>
  );
};
export default ContactPage;
