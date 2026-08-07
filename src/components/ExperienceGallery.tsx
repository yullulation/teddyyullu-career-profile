"use client";

import { useState } from "react";
import ExperienceCard from "./ExperienceCard";
import ExperienceModal from "./ExperienceModal";
import { EXPERIENCES, type Experience } from "@/data/experience";

export default function ExperienceGallery() {
  const [active, setActive] = useState<Experience | null>(null);

  return (
    <>
      <div className="mx-auto grid max-w-6xl auto-rows-fr grid-cols-1 gap-8 px-6 pb-28 sm:grid-cols-2 sm:px-10 lg:grid-cols-3">
        {EXPERIENCES.map((experience, i) => (
          <ExperienceCard
            key={experience.slug}
            experience={experience}
            index={i}
            onOpen={() => setActive(experience)}
          />
        ))}
      </div>

      <ExperienceModal experience={active} onClose={() => setActive(null)} />
    </>
  );
}
