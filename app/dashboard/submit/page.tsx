"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { m } from "framer-motion";
import {
  Send,
  CheckCircle2,
  ArrowLeft,
  User,
  Mail,
  Phone,
  Instagram,
  Link2,
  Linkedin,
  MessageSquare,
} from "lucide-react";
import { useAuth } from "@/lib/useAuth";
import { GOLD, GOLD_BTN, CARD } from "@/lib/tokens";
import { trackVisit } from "@/lib/tracking";
import axios from "axios";

const MAIN_APP_BASE_URL = process.env.NEXT_PUBLIC_MAIN_APP_BASE_URL!;

export default function SubmitReelPage() {
  const router = useRouter();
  const { user, loading: authLoading, hasCourses } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    registeredEmail: "",
    instagramProfileLink: "",
    contactNumber: "",
    reelLink: "",
    experience: "",
    linkedinProfile: "",
  });

  const [confirmations, setConfirmations] = useState({
    taggedTutedude: false,
    usedHashtag: false,
    originalContent: false,
    latestSubmissionOnly: false,
  });

  const [marketingConsent, setMarketingConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [existingSubmission, setExistingSubmission] = useState<Record<string, unknown> | null>(null);

  // Pre-fill user data
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || "",
        registeredEmail: user.email || "",
      }));
    }
  }, [user]);

  // Check for existing submission
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${MAIN_APP_BASE_URL}/lms/iphone-challenge/submission`, {
          params: { email: user.email },
        })
        .then((res) => {
          if (res.data?.data) {
            setExistingSubmission(res.data.data);
          }
        })
        .catch(() => {});
    }
  }, [user?.email]);

  // Auth guards
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!authLoading && user && !hasCourses) {
      router.push("/not-enrolled");
    }
  }, [authLoading, user, hasCourses, router]);

  // Track submit page visit
  useEffect(() => {
    if (!authLoading && user && hasCourses) {
      trackVisit(user, { hasCourses: true, page: "submit" });
    }
  }, [authLoading, user, hasCourses]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmationChange = (key: keyof typeof confirmations) => {
    setConfirmations((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const allConfirmed = Object.values(confirmations).every(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!allConfirmed) {
      setError("Please accept all confirmations before submitting.");
      return;
    }

    if (!marketingConsent) {
      setError("Marketing consent is required to submit.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        email: user?.email || formData.registeredEmail,
        fullName: formData.fullName,
        registeredEmail: formData.registeredEmail,
        instagramProfileLink: formData.instagramProfileLink,
        contactNumber: formData.contactNumber,
        reelLink: formData.reelLink,
        confirmations,
        experience: formData.experience,
        linkedinProfile: formData.linkedinProfile,
        marketingConsent,
      };

      await axios.post(`${MAIN_APP_BASE_URL}/lms/iphone-challenge/submit`, payload);
      setSuccess(true);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || "Something went wrong. Please try again."
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#2B0A30]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#edc168] border-t-transparent" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="relative min-h-screen overflow-x-hidden bg-[#2B0A30] font-sans text-white">
        <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#2B0A30]/75 backdrop-blur-2xl">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
            <a href="/" className="flex items-center gap-2 opacity-90 transition-opacity hover:opacity-70">
              <Image src="/tutedudelogo.webp" alt="Tutedude" width={30} height={30} />
              <span className="text-lg font-bold tracking-tight">Tutedude</span>
            </a>
          </nav>
        </header>

        <main className="flex min-h-[80vh] items-center justify-center px-4">
          <m.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex max-w-md flex-col items-center text-center"
          >
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
              <CheckCircle2 className="h-10 w-10 text-green-400" />
            </div>
            <h1 className={`font-display text-3xl font-extrabold sm:text-4xl ${GOLD}`}>
              Reel Submitted!
            </h1>
            <p className="mt-4 text-sm font-semibold leading-relaxed text-white/70">
              Your reel has been successfully submitted for the TuteDude iPhone Challenge.
              If you submit another reel later, only your latest submission will be considered.
            </p>
            <div className="mt-8 flex gap-4">
              <button
                onClick={() => router.push("/dashboard")}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold ${GOLD_BTN}`}
              >
                <ArrowLeft className="h-4 w-4" /> Back to Dashboard
              </button>
            </div>
          </m.div>
        </main>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#2B0A30] font-sans text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#2B0A30]/75 backdrop-blur-2xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
          <a href="/" className="flex items-center gap-2 opacity-90 transition-opacity hover:opacity-70">
            <Image src="/tutedudelogo.webp" alt="Tutedude" width={30} height={30} />
            <span className="text-lg font-bold tracking-tight">Tutedude</span>
          </a>
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Dashboard
          </button>
        </nav>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-8 sm:py-12">
        {/* Header */}
        <m.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#edc168]">
            Submit Your Entry
          </p>
          <h1 className={`font-display text-[clamp(1.6rem,5vw,2.8rem)] font-extrabold ${GOLD}`}>
            Reel Submission Form
          </h1>
          <p className="mt-2 text-sm font-semibold text-white/60">
            You&rsquo;re one step away from the TuteDude iPhone Challenge!
          </p>
        </m.div>

        {/* Existing submission notice */}
        {existingSubmission && (
          <m.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-6 rounded-xl border border-[#edc168]/30 bg-[#edc168]/10 p-4"
          >
            <p className="text-sm font-semibold text-[#edc168]">
              ⚠️ You have already submitted a reel. Submitting again will replace your previous entry.
            </p>
          </m.div>
        )}

        {/* Form */}
        <m.form
          onSubmit={handleSubmit}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className={`${CARD} p-6 sm:p-8`}
        >
          {/* Error */}
          {error && (
            <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300">
              {error}
            </div>
          )}

          <div className="space-y-5">
            {/* Full Name */}
            <FormField
              label="Your Full Name"
              required
              icon={<User className="h-4 w-4" />}
            >
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="form-input"
              />
            </FormField>

            {/* Registered Email */}
            <FormField
              label="Registered Email Address"
              required
              icon={<Mail className="h-4 w-4" />}
            >
              <input
                type="email"
                name="registeredEmail"
                required
                value={formData.registeredEmail}
                onChange={handleInputChange}
                placeholder="Email registered with Tutedude"
                className="form-input"
              />
            </FormField>

            {/* Instagram Profile */}
            <FormField
              label="Your Instagram Profile Link"
              required
              icon={<Instagram className="h-4 w-4" />}
            >
              <input
                type="url"
                name="instagramProfileLink"
                required
                value={formData.instagramProfileLink}
                onChange={handleInputChange}
                placeholder="https://instagram.com/yourprofile"
                className="form-input"
              />
            </FormField>

            {/* Contact Number */}
            <FormField
              label="Contact Number"
              required
              icon={<Phone className="h-4 w-4" />}
            >
              <input
                type="tel"
                name="contactNumber"
                required
                value={formData.contactNumber}
                onChange={handleInputChange}
                placeholder="+91 XXXXXXXXXX"
                className="form-input"
              />
            </FormField>

            {/* Reel Link */}
            <FormField
              label="Instagram Reel Link"
              required
              icon={<Link2 className="h-4 w-4" />}
              hint="Make sure your reel is public before submitting. Tag @tutedudeofficial and use #TutedudeiPhoneChallenge"
            >
              <input
                type="url"
                name="reelLink"
                required
                value={formData.reelLink}
                onChange={handleInputChange}
                placeholder="https://www.instagram.com/reel/..."
                className="form-input"
              />
            </FormField>

            {/* Confirmations */}
            <div className="rounded-xl border border-white/[0.10] bg-white/[0.03] p-4">
              <p className="mb-3 text-sm font-bold text-white/80">
                Before you submit... <span className="text-red-400">*</span>
              </p>
              <div className="space-y-3">
                {[
                  { key: "taggedTutedude" as const, label: "I have tagged @tutedudeofficial in my reel." },
                  { key: "usedHashtag" as const, label: "I have used the hashtag #TuteDudeiPhoneChallenge" },
                  { key: "originalContent" as const, label: "My reel is original and created by me." },
                  { key: "latestSubmissionOnly" as const, label: "I understand that if I submit another reel later, only my latest submission will be considered for judging." },
                ].map(({ key, label }) => (
                  <label
                    key={key}
                    className="flex cursor-pointer items-start gap-3"
                  >
                    <input
                      type="checkbox"
                      checked={confirmations[key]}
                      onChange={() => handleConfirmationChange(key)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[#edc168]"
                    />
                    <span className="text-sm text-white/75">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Experience */}
            <FormField
              label="Please share your experience regarding iPhone Challenge"
              icon={<MessageSquare className="h-4 w-4" />}
              hint="Feel free to share any other challenge ideas as well. If our team likes them, we'll definitely plan something around them."
            >
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="Share your experience, thoughts, or challenge ideas..."
                rows={4}
                className="form-input resize-none"
              />
            </FormField>

            {/* LinkedIn */}
            <FormField
              label="Add your LinkedIn Profile"
              icon={<Linkedin className="h-4 w-4" />}
            >
              <input
                type="url"
                name="linkedinProfile"
                value={formData.linkedinProfile}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/in/yourprofile"
                className="form-input"
              />
            </FormField>

            {/* Marketing Consent */}
            <div className="rounded-xl border border-white/[0.10] bg-white/[0.03] p-4">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={marketingConsent}
                  onChange={() => setMarketingConsent(!marketingConsent)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#edc168]"
                />
                <span className="text-sm text-white/75">
                  I am allowing Tutedude to use this video for marketing, promotion, and future challenge activities.{" "}
                  <span className="text-red-400">*</span>
                </span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={loading || !allConfirmed || !marketingConsent}
              className={`flex w-full items-center justify-center gap-2 rounded-full py-4 text-base font-bold disabled:cursor-not-allowed disabled:opacity-50 ${GOLD_BTN}`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-2 w-2 rounded-full bg-[#3a0f33]"
                        style={{ animation: `bounce 1s ${i * 0.15}s ease-in-out infinite` }}
                      />
                    ))}
                  </span>
                  <span className="text-[#3a0f33]">Submitting...</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="h-4 w-4" /> Submit Your Reel
                </span>
              )}
            </button>
          </div>

          {/* WhatsApp help */}
          <p className="mt-4 text-center text-xs text-white/40">
            WhatsApp for Quick Questions:{" "}
            <a
              href="https://wa.me/917999749959"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#edc168] hover:underline"
            >
              +91 7999749959 (Jatin)
            </a>
          </p>
        </m.form>
      </main>
    </div>
  );
}

// Reusable form field wrapper
function FormField({
  label,
  required,
  icon,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  icon?: React.ReactNode;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group">
      <label className="mb-1.5 flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-widest text-white/50">
        {icon && <span className="text-[#edc168]">{icon}</span>}
        {label}
        {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {hint && (
        <p className="mt-1.5 text-[0.65rem] font-medium text-white/35">{hint}</p>
      )}
    </div>
  );
}
