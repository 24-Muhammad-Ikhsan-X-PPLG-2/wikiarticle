import React from "react";
import TeamMember from "./TeamMember";

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    avatar: "sarah.webp",
    bio: "Former PM at a major tech company. Passionate about democratizing knowledge.",
  },
  {
    name: "Muhammad Ikhsan",
    role: "CTO",
    avatar: "photo_ikhsan.webp",
    bio: "Full-stack developer with 10+ years of experience in scalable systems.",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Community",
    avatar: "emily.webp",
    bio: "Community builder focused on creating engaging experiences for contributors.",
  },
  {
    name: "David Kim",
    role: "Product Lead",
    avatar: "david.webp",
    bio: "UX designer turned product leader. Obsessed with user experience.",
  },
];

const TeamsSection = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            Our Team
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
            Meet the Team
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Passionate people working together to build the future of knowledge
            sharing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamsSection;
