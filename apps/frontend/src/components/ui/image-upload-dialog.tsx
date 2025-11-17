"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { RotateCw, ZoomIn, ZoomOut, Loader2 } from "lucide-react";
import type { CropSettings } from "@/hooks/useImageUpload";

interface PhotoUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedImage: string | null;
  cropSettings: CropSettings;
  setCropSettings: React.Dispatch<React.SetStateAction<CropSettings>>;
  onSave: () => void;
  onCancel: () => void;
  isProcessing: boolean;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export function ImageUploadDialog({
  open,
  onOpenChange,
  selectedImage,
  cropSettings,
  setCropSettings,
  onSave,
  onCancel,
  isProcessing,
  canvasRef,
}: PhotoUploadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Update Profile Picture</DialogTitle>
          <DialogDescription>
            Adjust your photo by zooming, rotating, or repositioning it.
          </DialogDescription>
        </DialogHeader>

        {selectedImage && (
          <div className="space-y-4">
            {/* Image Preview */}
            <div className="relative">
              <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src={selectedImage || "/placeholder.svg"}
                  alt="Preview"
                  className="max-w-full max-h-full object-contain"
                  style={{
                    transform: `scale(${cropSettings.zoom}) rotate(${cropSettings.rotation}deg) translate(${cropSettings.x}px, ${cropSettings.y}px)`,
                  }}
                />
              </div>

              {/* Crop Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-32 h-32 border-2 border-white rounded-full shadow-lg"></div>
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-4">
              {/* Zoom Control */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Zoom</label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCropSettings((prev) => ({
                          ...prev,
                          zoom: Math.max(0.5, prev.zoom - 0.1),
                        }))
                      }
                      disabled={isProcessing}
                    >
                      <ZoomOut className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCropSettings((prev) => ({
                          ...prev,
                          zoom: Math.min(3, prev.zoom + 0.1),
                        }))
                      }
                      disabled={isProcessing}
                    >
                      <ZoomIn className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <Slider
                  value={[cropSettings.zoom]}
                  onValueChange={([value]) =>
                    setCropSettings((prev) => ({ ...prev, zoom: value }))
                  }
                  min={0.5}
                  max={3}
                  step={0.1}
                  className="w-full"
                  disabled={isProcessing}
                />
              </div>

              {/* Rotation Control */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Rotation</label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCropSettings((prev) => ({
                        ...prev,
                        rotation: (prev.rotation + 90) % 360,
                      }))
                    }
                    disabled={isProcessing}
                  >
                    <RotateCw className="h-3 w-3" />
                  </Button>
                </div>
                <Slider
                  value={[cropSettings.rotation]}
                  onValueChange={([value]) =>
                    setCropSettings((prev) => ({ ...prev, rotation: value }))
                  }
                  min={0}
                  max={360}
                  step={1}
                  className="w-full"
                  disabled={isProcessing}
                />
              </div>

              {/* Position Controls */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Horizontal</label>
                  <Slider
                    value={[cropSettings.x]}
                    onValueChange={([value]) =>
                      setCropSettings((prev) => ({ ...prev, x: value }))
                    }
                    min={-100}
                    max={100}
                    step={1}
                    className="w-full"
                    disabled={isProcessing}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Vertical</label>
                  <Slider
                    value={[cropSettings.y]}
                    onValueChange={([value]) =>
                      setCropSettings((prev) => ({ ...prev, y: value }))
                    }
                    min={-100}
                    max={100}
                    step={1}
                    className="w-full"
                    disabled={isProcessing}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hidden canvas for image processing */}
        <canvas ref={canvasRef} className="hidden" />

        <DialogFooter>
          <Button variant="outline" onClick={onCancel} disabled={isProcessing}>
            Cancel
          </Button>
          <Button onClick={onSave} disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              "Save Photo"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
