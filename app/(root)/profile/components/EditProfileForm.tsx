"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { UpdateProfile } from "@/lib/action/UpdateProfile.action";
import ROUTES from "@/route";
import { Upload, Link2, X, Camera, Loader2 } from "lucide-react";
import Image from "next/image";

interface ProfileFormProps {
  userId: string;
  initialData: {
    name: string;
    username: string;
    bio?: string;
    location?: string;
    portfolio?: string;
    image?: string;
  };
}

function getColorFromId(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 65%, 55%)`;
}

type ImageMode = "current" | "upload" | "url";

export default function EditProfileForm({ userId, initialData }: ProfileFormProps) {
  const router = useRouter();

  const [name, setName] = useState(initialData.name);
  const [username, setUsername] = useState(initialData.username);
  const [bio, setBio] = useState(initialData.bio ?? "");
  const [location, setLocation] = useState(initialData.location ?? "");
  const [portfolio, setPortfolio] = useState(initialData.portfolio ?? "");

  const [imageMode, setImageMode] = useState<ImageMode>("current");
  const [urlInput, setUrlInput] = useState("");
  const [urlPreview, setUrlPreview] = useState("");
  const [uploadedPath, setUploadedPath] = useState("");
  const [filePreview, setFilePreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const effectiveImage = (): string | undefined => {
    if (imageMode === "upload" && uploadedPath) return uploadedPath;
    if (imageMode === "url" && urlPreview) return urlPreview;
    return initialData.image;
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setFilePreview(objectUrl);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();

      if (!result.success) {
        toast.error(result.message ?? "Upload failed");
        setFilePreview("");
        return;
      }
      setUploadedPath(result.path);
      toast.success("Image uploaded!");
    } catch {
      toast.error("Upload failed. Please try again.");
      setFilePreview("");
    } finally {
      setUploading(false);
    }
  };

  const handleUrlChange = (val: string) => {
    setUrlInput(val);
    if (val.startsWith("http://") || val.startsWith("https://")) {
      setUrlPreview(val);
    } else {
      setUrlPreview("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !username.trim()) {
      toast.error("Name and username are required.");
      return;
    }

    setSaving(true);
    try {
      const image = effectiveImage();
      const result = await UpdateProfile({
        userId,
        name: name.trim(),
        username: username.trim(),
        bio: bio.trim() || undefined,
        location: location.trim() || undefined,
        portfolio: portfolio.trim() || undefined,
        image,
      });

      if (!result.success) {
        toast.error(result.message ?? "Failed to save profile.");
        return;
      }

      toast.success("Profile updated!");
      router.push(ROUTES.PROFILE(userId));
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const previewSrc = imageMode === "upload" ? filePreview : imageMode === "url" ? urlPreview : initialData.image;

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-10">
      {/* Avatar section */}
      <div className="bg-card border border-white/5 rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
          <Camera className="w-5 h-5 text-main" />
          Profile Photo
        </h2>

        {/* Preview */}
        <div className="flex items-center gap-6 mb-6">
          <div className="relative shrink-0">
            {previewSrc ? (
              previewSrc.startsWith("/") ? (
                <Image
                  src={previewSrc}
                  alt="Preview"
                  width={90}
                  height={90}
                  className="rounded-full object-cover ring-4 ring-main/30"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewSrc}
                  alt="Preview"
                  width={90}
                  height={90}
                  className="rounded-full object-cover ring-4 ring-main/30"
                  referrerPolicy="no-referrer"
                  onError={() => {
                    if (imageMode === "url") setUrlPreview("");
                  }}
                />
              )
            ) : (
              <div
                className="w-[90px] h-[90px] rounded-full flex items-center justify-center text-white text-3xl font-bold ring-4 ring-main/30"
                style={{ backgroundColor: getColorFromId(userId) }}
              >
                {name[0]?.toUpperCase() ?? "?"}
              </div>
            )}
            {uploading && (
              <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-white animate-spin" />
              </div>
            )}
          </div>
          <div className="text-sm text-gray-400">
            <p>Choose how to set your profile photo.</p>
            <p className="mt-1">Upload a local file or paste a web URL.</p>
          </div>
        </div>

        {/* Mode tabs */}
        <div className="flex gap-2 mb-4">
          {(["current", "upload", "url"] as ImageMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setImageMode(mode)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                imageMode === mode
                  ? "bg-main text-white"
                  : "bg-primary text-gray-400 hover:text-white"
              }`}
            >
              {mode === "current" ? "Keep current" : mode === "upload" ? "Upload file" : "Web URL"}
            </button>
          ))}
        </div>

        {imageMode === "upload" && (
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={handleFileSelect}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary border border-white/10 text-sm hover:border-main/60 transition-all disabled:opacity-50"
            >
              <Upload className="w-4 h-4 text-main" />
              {uploading ? "Uploading…" : uploadedPath ? "Change file" : "Select image"}
            </button>
            {uploadedPath && !uploading && (
              <p className="mt-2 text-xs text-emerald-400 flex items-center gap-1">
                ✓ Saved at <code>{uploadedPath}</code>
              </p>
            )}
            <p className="mt-2 text-xs text-gray-500">JPG, PNG, WEBP, GIF · Max 5 MB</p>
          </div>
        )}

        {imageMode === "url" && (
          <div className="space-y-2">
            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="url"
                value={urlInput}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-primary border border-white/10 text-sm placeholder:text-gray-600 focus:outline-none focus:border-main/60 transition-all"
              />
              {urlInput && (
                <button
                  type="button"
                  onClick={() => { setUrlInput(""); setUrlPreview(""); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-gray-500 hover:text-white" />
                </button>
              )}
            </div>
            {urlInput && !urlPreview && (
              <p className="text-xs text-yellow-500">Enter a full URL starting with https://</p>
            )}
            {urlPreview && (
              <p className="text-xs text-emerald-400">Preview updated above.</p>
            )}
          </div>
        )}
      </div>

      {/* Personal info */}
      <div className="bg-card border border-white/5 rounded-2xl p-6 space-y-5">
        <h2 className="text-lg font-semibold">Personal Info</h2>

        <Field
          label="Full Name"
          required
          value={name}
          onChange={setName}
          placeholder="Your full name"
        />
        <Field
          label="Username"
          required
          value={username}
          onChange={setUsername}
          placeholder="your_username"
        />
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            placeholder="Tell the community a bit about yourself…"
            className="w-full px-4 py-2.5 rounded-xl bg-primary border border-white/10 text-sm placeholder:text-gray-600 focus:outline-none focus:border-main/60 resize-none transition-all"
          />
        </div>
      </div>

      {/* Links & location */}
      <div className="bg-card border border-white/5 rounded-2xl p-6 space-y-5">
        <h2 className="text-lg font-semibold">Links & Location</h2>
        <Field
          label="Location"
          value={location}
          onChange={setLocation}
          placeholder="City, Country"
        />
        <Field
          label="Portfolio / Website"
          value={portfolio}
          onChange={setPortfolio}
          placeholder="https://yoursite.com"
          type="url"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving || uploading}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-main text-white font-semibold hover:bg-blue-500 disabled:opacity-50 transition-all"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving…
            </>
          ) : (
            "Save Changes"
          )}
        </button>
        <button
          type="button"
          onClick={() => router.push(ROUTES.PROFILE(userId))}
          className="px-6 py-3 rounded-xl bg-card border border-white/10 text-sm font-medium hover:border-white/30 transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1.5">
        {label}
        {required && <span className="text-main ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl bg-primary border border-white/10 text-sm placeholder:text-gray-600 focus:outline-none focus:border-main/60 transition-all"
      />
    </div>
  );
}
