"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save, Trash2, RotateCw, ZoomIn, ZoomOut } from "lucide-react";
// import { Slider } from "@/components/ui/slider";
import { useImageUpload } from "@/hooks/useImageUpload";
import { ImageUploadDialog } from "@/components/ui/image-upload-dialog";

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const maxSizeInMB = 5; // Maximum file size in MB
  const photoUpload = useImageUpload({
    maxSizeInMB: 5,
    allowedTypes: ["image/jpeg", "image/png", "image/gif"],
    onImageChange: handlePhotoChange,
    onError: handlePhotoError,
  });

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  function handlePhotoChange(imageUrl: string) {
    console.log("New profile image:", imageUrl);
    // Here you would typically upload to your server
  }

  function handlePhotoError(error: string) {
    console.error("Photo upload error:", error);
    // Show error toast or notification
  }

  return (
    <div className="space-y-6">
      {/* Profile Picture */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>Update your profile picture</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className={"h-20 w-20"}>
              <AvatarImage
                src={photoUpload.profileImage || "/placeholder.svg"}
                alt="Profile"
              />
              <AvatarFallback>{"TL"}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Button
                size="sm"
                className="gap-2"
                onClick={photoUpload.handlePhotoUpload}
                disabled={photoUpload.isProcessing}
              >
                <Camera className="h-4 w-4" />
                Change Photo
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
                onClick={photoUpload.handleRemovePhoto}
                disabled={photoUpload.isProcessing}
              >
                <Trash2 className="h-4 w-4" />
                Remove
              </Button>
              <p className="text-xs text-muted-foreground">
                JPG, PNG or GIF. Max size {maxSizeInMB}MB.
              </p>
            </div>
          </div>
          <input
            ref={photoUpload.fileInputRef}
            type="file"
            accept="image/*"
            onChange={photoUpload.handleFileSelect}
            className="hidden"
          />
        </CardContent>
      </Card>

      <ImageUploadDialog
        open={photoUpload.showPhotoDialog}
        onOpenChange={photoUpload.setShowPhotoDialog}
        selectedImage={photoUpload.selectedImage}
        cropSettings={photoUpload.cropSettings}
        setCropSettings={photoUpload.setCropSettings}
        onSave={photoUpload.handleSavePhoto}
        onCancel={photoUpload.handleCancelPhoto}
        isProcessing={photoUpload.isProcessing}
        canvasRef={photoUpload.canvasRef}
      />

      {/* Photo Upload Dialog */}
      {/* <Dialog open={showPhotoDialog} onOpenChange={setShowPhotoDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Profile Picture</DialogTitle>
            <DialogDescription>
              Adjust your photo by zooming, rotating, or repositioning it.
            </DialogDescription>
          </DialogHeader>

          {selectedImage && (
            <div className="space-y-4">
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

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-32 h-32 border-2 border-white rounded-full shadow-lg"></div>
                </div>
              </div>

              <div className="space-y-4">
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
                  />
                </div>

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
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={handleCancelPhoto}>
              Cancel
            </Button>
            <Button onClick={handleSavePhoto}>Save Photo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your personal details and contact information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Doe" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              defaultValue="john.doe@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself..."
              defaultValue="Software developer passionate about creating amazing user experiences."
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading} className="gap-2">
          <Save className="h-4 w-4" />
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
