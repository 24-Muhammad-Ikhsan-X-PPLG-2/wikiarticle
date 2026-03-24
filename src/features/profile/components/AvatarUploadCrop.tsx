"use client";

import { Upload, X, ZoomIn, ZoomOut } from "lucide-react";
import { FC, useRef, useState } from "react";
import Cropper from "react-easy-crop";

interface AvatarUploadCropProps {
  onCropComplete: (croppedImage: string) => void;
  preview?: string;
}

interface CroppedAreaPixels {
  x: number;
  y: number;
  width: number;
  height: number;
}

const AvatarUploadCrop: FC<AvatarUploadCropProps> = ({
  onCropComplete,
  preview,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<CroppedAreaPixels | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageDataUrl = URL.createObjectURL(file);
      setImageSrc(imageDataUrl);
      console.log(imageDataUrl);
    }
  };

  const onCropAreaChange = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const generateCroppedImage = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
      );

      const croppedImage = canvas.toDataURL("image/jpeg", 0.9);
      onCropComplete(croppedImage);
      setImageSrc(null);
    };
  };

  if (imageSrc) {
    return (
      <div className="space-y-4">
        <div className="relative bg-gray-900 rounded-2xl overflow-hidden border-2 border-gray-800 w-full h-[400px]">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onCropAreaChange={onCropAreaChange}
            onZoomChange={setZoom}
            // Tambahkan ini buat mastikan zoom pas awal masuk
            onMediaLoaded={(mediaSize) => {
              console.log("Gambar dimuat:", mediaSize);
            }}
            style={{
              containerStyle: {
                width: "100%",
                height: "100%",
              },
            }}
          />
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setZoom(Math.max(zoom - 0.1, 1))}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <input
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <button
            type="button"
            onClick={() => setZoom(Math.min(zoom + 0.1, 3))}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={generateCroppedImage}
            className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Save Avatar
          </button>
          <button
            type="button"
            onClick={() => setImageSrc(null)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-lg transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Preview Avatar */}
      {preview && (
        <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <img
              src={preview}
              alt="Current avatar"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Current Avatar
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Click upload to change
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Upload Area */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-8 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all duration-300 bg-white dark:bg-gray-900"
      >
        <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400 dark:text-gray-500" />
        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
          Click to upload or drag and drop
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          PNG, JPG, GIF up to 10MB (Square 1:1)
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
        aria-label="Upload avatar"
      />
    </div>
  );
};

export default AvatarUploadCrop;
