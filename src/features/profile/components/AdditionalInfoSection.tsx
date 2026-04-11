"use client";
import { motion } from "motion/react";
import FormSection from "./FormSection";
import { FC } from "react";
import BioSection from "./BioSection";
import WebsiteUrlSection from "./WebsiteUrlSection";
import SocialLinksSection from "./SocialLinksSection";

const AdditionalInfoSection: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
    >
      <FormSection
        title="Additional Information"
        description="Share more about yourself"
      >
        <div className="space-y-4">
          {/* Bio */}
          <BioSection />

          {/* Website URL */}
          <WebsiteUrlSection />

          {/* Social Links */}
          <SocialLinksSection />
        </div>
      </FormSection>
    </motion.div>
  );
};

export default AdditionalInfoSection;
