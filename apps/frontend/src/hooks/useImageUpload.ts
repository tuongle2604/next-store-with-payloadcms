"use client";

import type React from "react";

import { useState, useRef, useCallback } from "react";

export interface CropSettings {
  zoom: number;
  rotation: number;
  x: number;
  y: number;
}

export interface UsePhotoUploadOptions {
  maxSizeInMB?: number;
  allowedTypes?: string[];
  initialImage?: string;
  onImageChange?: (imageUrl: string) => void;
  onError?: (error: string) => void;
}

export interface UsePhotoUploadReturn {
  // State
  profileImage: string;
  selectedImage: string | null;
  showPhotoDialog: boolean;
  cropSettings: CropSettings;
  isProcessing: boolean;

  // Actions
  handlePhotoUpload: () => void;
  handleRemovePhoto: () => void;
  handleSavePhoto: () => void;
  handleCancelPhoto: () => void;
  setCropSettings: React.Dispatch<React.SetStateAction<CropSettings>>;
  setShowPhotoDialog: React.Dispatch<React.SetStateAction<boolean>>;

  // Refs
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;

  // File handling
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function useImageUpload(
  options: UsePhotoUploadOptions = {}
): UsePhotoUploadReturn {
  const {
    maxSizeInMB = 5,
    allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ],
    initialImage = "public/images/placeholder.svg?height=80&width=80",
    onImageChange,
    onError,
  } = options;

  // State
  const [profileImage, setProfileImage] = useState<string>(initialImage);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showPhotoDialog, setShowPhotoDialog] = useState(false);
  const [cropSettings, setCropSettings] = useState<CropSettings>({
    zoom: 1,
    rotation: 0,
    x: 0,
    y: 0,
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // File validation
  const validateFile = useCallback(
    (file: File): string | null => {
      if (file.size > maxSizeInMB * 1024 * 1024) {
        return `File size must be less than ${maxSizeInMB}MB`;
      }

      if (
        !allowedTypes.some(
          (type) =>
            file.type === type || file.type.startsWith(type.split("/")[0] + "/")
        )
      ) {
        return "Please select a valid image file";
      }

      return null;
    },
    [maxSizeInMB, allowedTypes]
  );

  // File selection handler
  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const validationError = validateFile(file);
      if (validationError) {
        onError?.(validationError);
        return;
      }

      setIsProcessing(true);
      const reader = new FileReader();

      reader.onload = (e) => {
        const result = e.target?.result as string;
        setSelectedImage(result);
        setShowPhotoDialog(true);
        setCropSettings({ zoom: 1, rotation: 0, x: 0, y: 0 });
        setIsProcessing(false);
      };

      reader.onerror = () => {
        onError?.("Failed to read the selected file");
        setIsProcessing(false);
      };

      reader.readAsDataURL(file);
    },
    [validateFile, onError]
  );

  // Trigger file input
  const handlePhotoUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // Remove photo
  const handleRemovePhoto = useCallback(() => {
    setProfileImage(initialImage);
    onImageChange?.(initialImage);
  }, [initialImage, onImageChange]);

  // Process and save the cropped image
  const processImage = useCallback(
    async (imageUrl: string, settings: CropSettings): Promise<string> => {
      return new Promise((resolve) => {
        const canvas = canvasRef.current;
        if (!canvas) {
          resolve(imageUrl);
          return;
        }

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(imageUrl);
          return;
        }

        const img = new Image();
        img.onload = () => {
          // Set canvas size for profile picture (circular crop)
          const size = 200;
          canvas.width = size;
          canvas.height = size;

          // Clear canvas
          ctx.clearRect(0, 0, size, size);

          // Create circular clipping path
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
          ctx.clip();

          // Calculate image dimensions and position
          const { zoom, rotation, x, y } = settings;
          const centerX = size / 2;
          const centerY = size / 2;

          // Apply transformations
          ctx.save();
          ctx.translate(centerX + x, centerY + y);
          ctx.rotate((rotation * Math.PI) / 180);
          ctx.scale(zoom, zoom);

          // Calculate scaled dimensions to fit the circle
          const aspectRatio = img.width / img.height;
          let drawWidth, drawHeight;

          if (aspectRatio > 1) {
            drawHeight = size / zoom;
            drawWidth = drawHeight * aspectRatio;
          } else {
            drawWidth = size / zoom;
            drawHeight = drawWidth / aspectRatio;
          }

          // Draw image centered
          ctx.drawImage(
            img,
            -drawWidth / 2,
            -drawHeight / 2,
            drawWidth,
            drawHeight
          );

          ctx.restore();

          // Convert to data URL
          const processedImageUrl = canvas.toDataURL("image/png", 0.9);
          resolve(processedImageUrl);
        };

        img.onerror = () => {
          resolve(imageUrl); // Fallback to original
        };

        img.src = imageUrl;
      });
    },
    []
  );

  // Save photo with processing
  const handleSavePhoto = useCallback(async () => {
    if (!selectedImage) return;

    setIsProcessing(true);

    try {
      const processedImage = await processImage(selectedImage, cropSettings);
      setProfileImage(processedImage);
      onImageChange?.(processedImage);
      setShowPhotoDialog(false);
      setSelectedImage(null);
    } catch (error) {
      onError?.("Failed to process the image");
    } finally {
      setIsProcessing(false);
    }
  }, [selectedImage, cropSettings, processImage, onImageChange, onError]);

  // Cancel photo editing
  const handleCancelPhoto = useCallback(() => {
    setShowPhotoDialog(false);
    setSelectedImage(null);
    setCropSettings({ zoom: 1, rotation: 0, x: 0, y: 0 });

    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  return {
    // State
    profileImage,
    selectedImage,
    showPhotoDialog,
    cropSettings,
    isProcessing,

    // Actions
    handlePhotoUpload,
    handleRemovePhoto,
    handleSavePhoto,
    handleCancelPhoto,
    setCropSettings,
    setShowPhotoDialog,

    // Refs
    fileInputRef,
    canvasRef,

    // File handling
    handleFileSelect,
  };
}
