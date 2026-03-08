import Image from "next/image";
import React from "react";
import styles from "./InstructorCard.module.scss";
import { PlusIcon } from "../Icons/PlusIcon";
import { useRouter } from "next/router";
import { IInstructors } from "../../types/sanity-types";
import { urlFor } from "../../lib/sanity.client";

export const InstructorCard: React.FC<{
  instructor: IInstructors;
}> = ({ instructor }) => {
  const router = useRouter();
  const { image, name, surname, description, socials, slug } = instructor;

  const imageLinkPush = () => {
    router.push(`/instructors/${slug.current}`);
  };

  const renderSocialIcons = (social: { socialName: string; url: string }) => {
    if (social.socialName.toLowerCase() === "facebook") {
      return (
        <a href={social.url} target="_blank" rel="noreferrer">
          <Image
            src="/icons/fb.png"
            alt={`${name} ${surname} Facebook profil`}
            width={24}
            height={24}
          />
        </a>
      );
    }
    if (social.socialName.toLowerCase() === "instagram") {
      return (
        <a href={social.url} target="_blank" rel="noreferrer">
          <Image
            src="/icons/ig.png"
            alt={`${name} ${surname} Instagram profil`}
            width={24}
            height={24}
          />
        </a>
      );
    }
    if (social.socialName.toLowerCase() === "youtube") {
      return (
        <a href={social.url} target="_blank" rel="noreferrer">
          <Image
            src="/icons/yt.png"
            alt={`${name} ${surname} YouTube kanal`}
            width={24}
            height={24}
          />
        </a>
      );
    }
    return <></>;
  };

  return (
    <div className={styles["instructor-card"]}>
      <div className={styles["image-container"]} onClick={imageLinkPush}>
        <span className={styles["plus-icon"]}>
          <PlusIcon width={24} height={24} />
        </span>
        <Image
          src={urlFor(image).url()}
          alt={`${name} ${surname} – instruktor plesa u Plesnom Studiju Ventus Zagreb`}
          width={200}
          height={200}
        />
      </div>
      <p className={styles["name"]}>{name}</p>
      <p className={styles["title"]}>Dance Instructor</p>
      <div className={styles["socials"]}>
        {socials.map((social) => {
          return <span key={social._key}>{renderSocialIcons(social)}</span>;
        })}
      </div>
      <div className={styles["description"]}>
        <p>{description}</p>
      </div>
    </div>
  );
};
