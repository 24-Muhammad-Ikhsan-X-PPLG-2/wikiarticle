"use client";

import { motion } from "motion/react";
import FormSection from "./FormSection";
import AvatarUploadCrop from "./AvatarUploadCrop";
import { FC } from "react";

type Props = {
  setCroppedAvatar: (v: string | null) => void;
  setAvatarPreview: (v: string | undefined) => void;
  avatarPreview: string | undefined;
};

const AvatarSection: FC<Props> = ({
  avatarPreview,
  setAvatarPreview,
  setCroppedAvatar,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <FormSection
        title="Profile Picture"
        description="Upload and crop your profile picture"
      >
        <AvatarUploadCrop
          onCropComplete={(croppedImage) => {
            setCroppedAvatar(croppedImage);
            setAvatarPreview(croppedImage);
          }}
          preview={avatarPreview}
        />
      </FormSection>
    </motion.div>
  );
};

export default AvatarSection;
