import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Camera, MapPin, AlignLeft, Send, Check } from 'lucide-react';
import ScallopedCard from './ui/ScallopedCard';
import FileUpload from './ui/FileUpload';

// Zod Schema matching requirements
const formSchema = z.object({
  fullName: z.string().min(3, 'Name must be at least 3 characters.'),
  mobileNumber: z.string().regex(/^\d{10,}$/, 'Mobile number must contain only numbers and be at least 10 digits.'),
  email: z.string().email('Please enter a valid email address.'),
  dob: z.string().refine((dobString) => {
    const dob = new Date(dobString);
    if (isNaN(dob.getTime())) return false;
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age >= 13;
  }, 'You must be at least 13 years old to participate.'),
  address: z.string().min(5, 'Address must be at least 5 characters.'),
  story: z.string()
    .min(50, 'Story must be at least 50 characters.')
    .max(1000, 'Story cannot exceed 1000 characters.'),
  location: z.string().min(1, 'Location is required.'),
  rawImage: z.any().refine((file) => file instanceof File, 'Raw Image is required.'),
  editedImage: z.any().refine((file) => file instanceof File, 'Final Image is required.'),
});

type FormValues = z.infer<typeof formSchema>;

interface SubmissionFormProps {
  onSuccess: (submissionId: string, fullName: string) => void;
}

export default function SubmissionForm({ onSuccess }: SubmissionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      mobileNumber: '',
      email: '',
      dob: '',
      address: '',
      story: '',
      location: '',
      rawImage: undefined,
      editedImage: undefined,
    },
  });

  const rawImageVal = watch('rawImage');
  const editedImageVal = watch('editedImage');

  const simulateProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 400);
    return interval;
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    const progressInterval = simulateProgress();

    try {
      const formData = new FormData();
      formData.append('fullName', values.fullName);
      formData.append('mobileNumber', values.mobileNumber);
      formData.append('email', values.email);
      formData.append('dob', values.dob);
      formData.append('address', values.address);
      formData.append('story', values.story);
      formData.append('location', values.location);
      formData.append('rawImage', values.rawImage);
      formData.append('editedImage', values.editedImage);

      const response = await fetch('/api/submit', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      clearInterval(progressInterval);

      if (response.ok && result.success) {
        setUploadProgress(100);
        setTimeout(() => {
          onSuccess(result.submissionId, values.fullName);
        }, 500);
      } else {
        setSubmitError(result.error || 'Submission failed. Please try again.');
      }
    } catch (err: any) {
      clearInterval(progressInterval);
      setSubmitError(err.message || 'A network error occurred. Please check your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 select-none">
      <ScallopedCard>
        <div className="flex flex-col gap-6">
          
          {/* Header text inside card */}
          <div className="flex flex-col items-center gap-3 pb-6 border-b border-[#664436]/15 select-none">
            {/* ṚUUT Logo Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/favicon-192x192.png"
              alt="ṚUUT Logo"
              className="w-10 h-10 object-contain transition-transform hover:scale-105 duration-300"
            />
            <div className="text-center">
              <h3 className="text-3xl font-extrabold tracking-widest text-[#664436] font-serif uppercase">
                ṚUUT
              </h3>
              <p className="text-xs font-bold uppercase tracking-widest text-[#895158] mt-0.5">
                Photography Contest Entry
              </p>
              <p className="text-[10px] text-[#664436]/70 mt-2 lowercase tracking-wider font-medium border border-[#D1C7B7]/40 px-3 py-1 rounded-full bg-[#EADBC8]/20 w-fit mx-auto">
                fill in your submission details below
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            
            {/* Section 1: Personal info */}
            <div>
              <h4 className="text-xs font-extrabold text-[#895158] uppercase tracking-widest mb-4 pb-1 border-b border-[#895158]/20">
                1. Personal Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="fullName" className="text-xs font-bold uppercase tracking-wider text-[#664436]">
                    Full Name <span className="text-[#895158]">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Enter your name"
                    {...register('fullName')}
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-[#4A3324] font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#895158]/35 ${
                      errors.fullName ? 'border-red-500 focus:ring-red-200' : 'border-[#D1C7B7] focus:border-[#664436]'
                    }`}
                  />
                  {errors.fullName && (
                    <span className="text-[11px] text-red-500 font-semibold">{errors.fullName.message}</span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-[#664436]">
                    Email Address <span className="text-[#895158]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    {...register('email')}
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-[#4A3324] font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#895158]/35 ${
                      errors.email ? 'border-red-500 focus:ring-red-200' : 'border-[#D1C7B7] focus:border-[#664436]'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[11px] text-red-500 font-semibold">{errors.email.message}</span>
                  )}
                </div>

                {/* Mobile Number */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="mobileNumber" className="text-xs font-bold uppercase tracking-wider text-[#664436]">
                    Mobile Number <span className="text-[#895158]">*</span>
                  </label>
                  <input
                    id="mobileNumber"
                    type="tel"
                    placeholder="9876543210"
                    {...register('mobileNumber')}
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-[#4A3324] font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#895158]/35 ${
                      errors.mobileNumber ? 'border-red-500 focus:ring-red-200' : 'border-[#D1C7B7] focus:border-[#664436]'
                    }`}
                  />
                  {errors.mobileNumber && (
                    <span className="text-[11px] text-red-500 font-semibold">{errors.mobileNumber.message}</span>
                  )}
                </div>

                {/* Date of Birth */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="dob" className="text-xs font-bold uppercase tracking-wider text-[#664436]">
                    Date of Birth <span className="text-[#895158]">*</span>
                  </label>
                  <input
                    id="dob"
                    type="date"
                    {...register('dob')}
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-[#4A3324] font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#895158]/35 ${
                      errors.dob ? 'border-red-500 focus:ring-red-200' : 'border-[#D1C7B7] focus:border-[#664436]'
                    }`}
                  />
                  {errors.dob && (
                    <span className="text-[11px] text-red-500 font-semibold">{errors.dob.message}</span>
                  )}
                </div>

                {/* Address */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label htmlFor="address" className="text-xs font-bold uppercase tracking-wider text-[#664436]">
                    Address <span className="text-[#895158]">*</span>
                  </label>
                  <input
                    id="address"
                    type="text"
                    placeholder="Enter your complete postal address"
                    {...register('address')}
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-[#4A3324] font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#895158]/35 ${
                      errors.address ? 'border-red-500 focus:ring-red-200' : 'border-[#D1C7B7] focus:border-[#664436]'
                    }`}
                  />
                  {errors.address && (
                    <span className="text-[11px] text-red-500 font-semibold">{errors.address.message}</span>
                  )}
                </div>

              </div>
            </div>

            {/* Section 2: Submission info */}
            <div>
              <h4 className="text-xs font-extrabold text-[#895158] uppercase tracking-widest mb-4 pb-1 border-b border-[#895158]/20">
                2. Submission Details
              </h4>
              <div className="flex flex-col gap-4">
                
                {/* Location */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="location" className="text-xs font-bold uppercase tracking-wider text-[#664436] flex items-center gap-1">
                    <MapPin size={12} className="text-[#895158]" />
                    Location <span className="text-[#895158]">*</span>
                  </label>
                  <input
                    id="location"
                    type="text"
                    placeholder="Where was this photo taken? (e.g. New Delhi, India)"
                    {...register('location')}
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-[#4A3324] font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#895158]/35 ${
                      errors.location ? 'border-red-500 focus:ring-red-200' : 'border-[#D1C7B7] focus:border-[#664436]'
                    }`}
                  />
                  {errors.location && (
                    <span className="text-[11px] text-red-500 font-semibold">{errors.location.message}</span>
                  )}
                </div>

                {/* Story Behind the Photo */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="story" className="text-xs font-bold uppercase tracking-wider text-[#664436] flex items-center gap-1">
                    <AlignLeft size={12} className="text-[#895158]" />
                    Story Behind the Photo <span className="text-[#895158]">*</span>
                  </label>
                  <textarea
                    id="story"
                    rows={4}
                    placeholder="Tell us the concept, story, or creative vision behind this photo. (Min 50, Max 1000 characters)"
                    {...register('story')}
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-[#4A3324] font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#895158]/35 resize-y ${
                      errors.story ? 'border-red-500 focus:ring-red-200' : 'border-[#D1C7B7] focus:border-[#664436]'
                    }`}
                  ></textarea>
                  <div className="flex justify-between items-center text-[10px] text-[#664436]/60 font-semibold mt-0.5">
                    <span>{watch('story')?.length || 0} characters</span>
                    <span>Min 50, Max 1000</span>
                  </div>
                  {errors.story && (
                    <span className="text-[11px] text-red-500 font-semibold">{errors.story.message}</span>
                  )}
                </div>

              </div>
            </div>

            {/* Section 3: Uploads */}
            <div>
              <h4 className="text-xs font-extrabold text-[#895158] uppercase tracking-widest mb-4 pb-1 border-b border-[#895158]/20">
                3. Photo Submissions
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Raw Image Upload */}
                <Controller
                  name="rawImage"
                  control={control}
                  render={({ field }) => (
                    <FileUpload
                      label="Raw Image"
                      description="Original unedited RAW/JPEG file. Max 10MB."
                      value={field.value}
                      error={errors.rawImage?.message as string}
                      onChange={(file) => {
                        setValue('rawImage', file);
                        trigger('rawImage');
                      }}
                    />
                  )}
                />

                {/* Final Image Upload */}
                <Controller
                  name="editedImage"
                  control={control}
                  render={({ field }) => (
                    <FileUpload
                      label="Final Image"
                      description="Your final color-graded, edited version. Max 10MB."
                      value={field.value}
                      error={errors.editedImage?.message as string}
                      onChange={(file) => {
                        setValue('editedImage', file);
                        trigger('editedImage');
                      }}
                    />
                  )}
                />

              </div>
            </div>

            {/* Submit Error Message display */}
            {submitError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold flex items-start gap-2.5 animate-pulse">
                <span>⚠️</span>
                <span>{submitError}</span>
              </div>
            )}

            {/* Progress Bar / Submission overlay */}
            {isSubmitting && (
              <div className="flex flex-col gap-1.5 mt-2">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-[#664436]">
                  <span>Uploading photos & locking entry...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-[#EADBC8]/40 rounded-full h-3 overflow-hidden border border-[#D1C7B7]/40">
                  <div
                    className="bg-[#895158] h-full transition-all duration-300 ease-out rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-extrabold text-sm uppercase tracking-widest active:scale-95 transition-all shadow-md mt-4 flex items-center justify-center gap-2 ${
                isSubmitting
                  ? 'bg-[#EADBC8] text-[#664436]/60 cursor-not-allowed border border-[#D1C7B7]'
                  : 'bg-[#664436] text-[#F9F6F0] hover:bg-[#4A3324]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#664436] border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Send size={14} />
                  <span>Submit Your Entry</span>
                </>
              )}
            </button>

          </form>
        </div>
      </ScallopedCard>
    </div>
  );
}
