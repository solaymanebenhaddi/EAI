'use client';

import { useMemo, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { trackEvent } from '@/lib/analytics';

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  profile: string;
  requestType: string;
  projectStage: string;
  estimatedBudget: string;
  desiredTimeline: string;
  message: string;
  consent: boolean;
}

type FieldName = keyof FormState;

const initialState: FormState = {
  fullName: '',
  email: '',
  phone: '',
  city: '',
  profile: '',
  requestType: '',
  projectStage: '',
  estimatedBudget: '',
  desiredTimeline: '',
  message: '',
  consent: false,
};

function validate(values: FormState, t: Record<string, string>): Partial<Record<FieldName, string>> {
  const errors: Partial<Record<FieldName, string>> = {};

  if (!values.fullName.trim()) errors.fullName = t.required;
  if (!values.email.trim()) {
    errors.email = t.required;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = t.emailError;
  }
  if (!values.phone.trim()) errors.phone = t.required;
  if (!values.profile) errors.profile = t.required;
  if (!values.requestType) errors.requestType = t.required;
  if (!values.message.trim()) errors.message = t.required;
  if (!values.consent) errors.consent = t.consentRequired;

  return errors;
}

export function ContactForm() {
  const t = useTranslations('Contact');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  const labels = useMemo(
    () => ({
      fullName: t('formFullName'),
      email: t('formEmail'),
      phone: t('formPhone'),
      city: t('formCity'),
      profile: t('formProfile'),
      requestType: t('formRequestType'),
      projectStage: t('formProjectStage'),
      estimatedBudget: t('formBudget'),
      desiredTimeline: t('formTimeline'),
      message: t('formMessage'),
      consent: t('formConsent'),
      submit: t('formSubmit'),
      sending: t('formSending'),
      success: t('formSuccess'),
      error: t('formError'),
      required: t('formFieldRequired'),
      emailError: t('formEmailError'),
      consentRequired: t('formConsentRequired'),
      selectDefault: t('formSelectDefault'),
    }),
    [t]
  );

  const profiles = t.raw('formProfiles') as string[];
  const requestTypes = t.raw('formRequestTypes') as string[];
  const projectStages = t.raw('formProjectStages') as string[];
  const budgets = t.raw('formBudgets') as string[];
  const timelines = t.raw('formTimelines') as string[];

  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const inputClass =
    'w-full bg-eai-ink/5 border-b border-eai-line text-eai-charcoal font-body py-3 px-1 focus:outline-none focus:border-eai-brass focus:ring-1 focus:ring-eai-brass/20 transition-all placeholder:text-eai-warm-grey/40';

  const selectClass =
    'w-full bg-eai-ink/5 border-b border-eai-line text-eai-charcoal font-body py-3 px-1 focus:outline-none focus:border-eai-brass focus:ring-1 focus:ring-eai-brass/20 transition-all appearance-none cursor-pointer';

  const textareaClass =
    'w-full bg-eai-ink/5 border-b border-eai-line text-eai-charcoal font-body py-3 px-1 focus:outline-none focus:border-eai-brass focus:ring-1 focus:ring-eai-brass/20 transition-all placeholder:text-eai-warm-grey/40 resize-none';

  const labelClass = 'font-body text-[10px] text-eai-warm-grey uppercase tracking-[0.15em] mb-2 block';

  const updateValue = (field: FieldName, value: string | boolean) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
    setSuccess(false);
    setSubmitError(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values, labels);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    trackEvent('contact_form_submit', {
      profile: values.profile,
      request_type: values.requestType,
      budget: values.estimatedBudget,
      timeline: values.desiredTimeline,
    });

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSubmitting(false);
      setSuccess(true);
      setValues(initialState);
    } catch {
      setIsSubmitting(false);
      setSubmitError(true);
    }
  };

  const renderError = (field: FieldName) =>
    errors[field] ? (
      <p className="font-body text-[11px] text-eai-brass mt-1" role="alert">
        {errors[field]}
      </p>
    ) : null;

  const isHiddenSubject = [
    requestTypes[6],
    requestTypes[7],
    requestTypes[8],
    requestTypes[9],
  ].includes(values.requestType);

  return (
    <section ref={sectionRef} id="contact-form" className="relative py-24 lg:py-32 bg-eai-parchment/30 overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute left-[20%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[50%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[80%] top-0 w-px h-full bg-eai-brass" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-eai-brass" />
            <span className="font-body text-[10px] uppercase tracking-[0.25em] text-eai-brass">
              {t('formLabel')}
            </span>
          </div>
          <h2 className="font-display text-display-md text-eai-ink leading-[0.95] tracking-tight mb-6">
            {t('formTitle')}
          </h2>
          <p className="font-body text-[15px] text-eai-warm-grey leading-relaxed">
            {t('formIntro')}
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl bg-eai-paper p-8 md:p-12 border border-eai-line"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Row 1: Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className={labelClass}>
                {labels.fullName} <span className="text-eai-brass">*</span>
              </label>
              <input
                className={inputClass}
                value={values.fullName}
                onChange={(e) => updateValue('fullName', e.target.value)}
                placeholder={t('formFullNamePlaceholder')}
                aria-required="true"
              />
              {renderError('fullName')}
            </div>
            <div>
              <label className={labelClass}>
                {labels.email} <span className="text-eai-brass">*</span>
              </label>
              <input
                type="email"
                className={inputClass}
                value={values.email}
                onChange={(e) => updateValue('email', e.target.value)}
                placeholder={t('formEmailPlaceholder')}
                aria-required="true"
              />
              {renderError('email')}
            </div>
          </div>

          {/* Row 2: Phone + City */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className={labelClass}>
                {labels.phone} <span className="text-eai-brass">*</span>
              </label>
              <input
                type="tel"
                className={inputClass}
                value={values.phone}
                onChange={(e) => updateValue('phone', e.target.value)}
                placeholder={t('formPhonePlaceholder')}
                aria-required="true"
              />
              {renderError('phone')}
            </div>
            <div>
              <label className={labelClass}>{labels.city}</label>
              <input
                className={inputClass}
                value={values.city}
                onChange={(e) => updateValue('city', e.target.value)}
                placeholder={t('formCityPlaceholder')}
              />
            </div>
          </div>

          {/* Row 3: Profile + Request Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className={labelClass}>
                {labels.profile} <span className="text-eai-brass">*</span>
              </label>
              <select
                className={selectClass}
                value={values.profile}
                onChange={(e) => updateValue('profile', e.target.value)}
                aria-required="true"
              >
                <option value="">{labels.selectDefault}</option>
                {profiles.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              {renderError('profile')}
            </div>
            <div>
              <label className={labelClass}>
                {labels.requestType} <span className="text-eai-brass">*</span>
              </label>
              <select
                className={selectClass}
                value={values.requestType}
                onChange={(e) => updateValue('requestType', e.target.value)}
                aria-required="true"
              >
                <option value="">{labels.selectDefault}</option>
                {requestTypes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              {renderError('requestType')}
            </div>
          </div>

          {/* Row 4: Project Stage + Budget */}
          {!isHiddenSubject && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className={labelClass}>{labels.projectStage}</label>
                <select
                  className={selectClass}
                  value={values.projectStage}
                  onChange={(e) => updateValue('projectStage', e.target.value)}
                >
                  <option value="">{labels.selectDefault}</option>
                  {projectStages.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>{labels.estimatedBudget}</label>
                <select
                  className={selectClass}
                  value={values.estimatedBudget}
                  onChange={(e) => updateValue('estimatedBudget', e.target.value)}
                >
                  <option value="">{labels.selectDefault}</option>
                  {budgets.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Row 5: Timeline */}
          {!isHiddenSubject && (
            <div className="mb-8">
              <label className={labelClass}>{labels.desiredTimeline}</label>
              <select
                className={selectClass}
                value={values.desiredTimeline}
                onChange={(e) => updateValue('desiredTimeline', e.target.value)}
              >
                <option value="">{labels.selectDefault}</option>
                {timelines.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Message */}
          <div className="mb-8">
            <label className={labelClass}>
              {labels.message} <span className="text-eai-brass">*</span>
            </label>
            <textarea
              rows={6}
              className={textareaClass}
              value={values.message}
              onChange={(e) => updateValue('message', e.target.value)}
              placeholder={t('formMessagePlaceholder')}
              aria-required="true"
            />
            {renderError('message')}
          </div>

          {/* Consent */}
          <div className="mb-10">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={values.consent}
                onChange={(e) => updateValue('consent', e.target.checked)}
                className="mt-1 accent-eai-brass w-4 h-4"
                aria-required="true"
              />
              <span className="font-body text-[13px] text-eai-warm-grey leading-relaxed">
                {labels.consent} <span className="text-eai-brass">*</span>
              </span>
            </label>
            {renderError('consent')}
          </div>

          {/* Submit */}
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-eai-brass text-eai-ink px-12 py-5 font-body text-label uppercase tracking-[0.15em] hover:bg-eai-brass-soft disabled:cursor-wait disabled:opacity-70 transition-all duration-300 shadow-lg shadow-eai-brass/20"
            >
              {isSubmitting ? labels.sending : labels.submit}
            </button>
            {success && (
              <p className="font-body text-[14px] leading-relaxed text-eai-warm-grey" role="status">
                {labels.success}
              </p>
            )}
            {submitError && (
              <p className="font-body text-[14px] leading-relaxed text-eai-brass" role="alert">
                {labels.error}
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
