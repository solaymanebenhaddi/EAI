'use client';

import { useMemo, useState } from 'react';
import type { Locale } from '@/data/site';
import { trackEvent } from '@/lib/analytics';

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: string;
  city: string;
  message: string;
}

type FieldName = keyof FormState;

const initialState: FormState = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  projectType: '',
  budget: '',
  city: '',
  message: '',
};

const copy = {
  fr: {
    fullName: 'Nom complet',
    email: 'Email',
    phone: 'Téléphone / WhatsApp',
    company: 'Entreprise',
    projectType: 'Type de projet',
    budget: 'Budget estimatif',
    city: 'Ville / Pays',
    message: 'Votre message',
    submit: 'Envoyer le message',
    sending: 'Envoi en cours...',
    success: 'Votre demande est prête. Notre équipe vous recontactera rapidement.',
    required: 'Ce champ est requis.',
    emailError: 'Adresse email invalide.',
    selectProject: 'Sélectionner',
    selectBudget: 'Sélectionner',
    projectTypes: ['Architecture', 'BIM Consulting', 'Ingénierie & PM', 'Design Intérieur', 'Urbanisme', 'Events'],
    budgets: ['À définir', '< 500k MAD', '500k - 2M MAD', '2M - 10M MAD', '+10M MAD'],
  },
  en: {
    fullName: 'Full name',
    email: 'Email',
    phone: 'Phone / WhatsApp',
    company: 'Company',
    projectType: 'Project type',
    budget: 'Estimated budget',
    city: 'City / Country',
    message: 'Your message',
    submit: 'Send message',
    sending: 'Sending...',
    success: 'Your request is ready. Our team will get back to you shortly.',
    required: 'This field is required.',
    emailError: 'Invalid email address.',
    selectProject: 'Select',
    selectBudget: 'Select',
    projectTypes: ['Architecture', 'BIM Consulting', 'Engineering & PM', 'Interior Design', 'Urban Planning', 'Events'],
    budgets: ['To define', '< 500k MAD', '500k - 2M MAD', '2M - 10M MAD', '+10M MAD'],
  },
  ar: {
    fullName: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف / واتساب',
    company: 'الشركة',
    projectType: 'نوع المشروع',
    budget: 'الميزانية التقريبية',
    city: 'المدينة / البلد',
    message: 'رسالتك',
    submit: 'إرسال الرسالة',
    sending: 'جار الإرسال...',
    success: 'طلبك جاهز. سيتواصل معك فريقنا قريبا.',
    required: 'هذا الحقل مطلوب.',
    emailError: 'البريد الإلكتروني غير صحيح.',
    selectProject: 'اختر',
    selectBudget: 'اختر',
    projectTypes: ['هندسة معمارية', 'استشارات BIM', 'الهندسة وإدارة المشاريع', 'تصميم داخلي', 'تعمير', 'فعاليات'],
    budgets: ['يحدد لاحقا', '< 500k MAD', '500k - 2M MAD', '2M - 10M MAD', '+10M MAD'],
  },
};

function validate(values: FormState, locale: Locale): Partial<Record<FieldName, string>> {
  const t = copy[locale];
  const errors: Partial<Record<FieldName, string>> = {};

  if (!values.fullName.trim()) errors.fullName = t.required;
  if (!values.email.trim()) {
    errors.email = t.required;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = t.emailError;
  }
  if (!values.projectType) errors.projectType = t.required;
  if (!values.message.trim()) errors.message = t.required;

  return errors;
}

export function ContactForm({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const fieldClass = useMemo(
    () =>
      'bg-transparent border-b border-ash text-parchment font-body py-3 focus:outline-none focus:border-brass transition-colors',
    []
  );

  const updateValue = (field: FieldName, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
    setSuccess(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values, locale);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    trackEvent('contact_form_submit', {
      project_type: values.projectType,
      budget: values.budget,
      locale,
    });
    window.setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setValues(initialState);
    }, 700);
  };

  const renderError = (field: FieldName) =>
    errors[field] ? (
      <p className="font-body text-[12px] text-brass" role="alert">
        {errors[field]}
      </p>
    ) : null;

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <label className="flex flex-col gap-2">
          <span className="font-body text-label text-mortar uppercase tracking-widest">{t.fullName}</span>
          <input className={fieldClass} value={values.fullName} onChange={(event) => updateValue('fullName', event.target.value)} />
          {renderError('fullName')}
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-body text-label text-mortar uppercase tracking-widest">{t.email}</span>
          <input type="email" className={fieldClass} value={values.email} onChange={(event) => updateValue('email', event.target.value)} />
          {renderError('email')}
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <label className="flex flex-col gap-2">
          <span className="font-body text-label text-mortar uppercase tracking-widest">{t.phone}</span>
          <input className={fieldClass} value={values.phone} onChange={(event) => updateValue('phone', event.target.value)} />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-body text-label text-mortar uppercase tracking-widest">{t.company}</span>
          <input className={fieldClass} value={values.company} onChange={(event) => updateValue('company', event.target.value)} />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <label className="flex flex-col gap-2">
          <span className="font-body text-label text-mortar uppercase tracking-widest">{t.projectType}</span>
          <select className={fieldClass} value={values.projectType} onChange={(event) => updateValue('projectType', event.target.value)}>
            <option value="">{t.selectProject}</option>
            {t.projectTypes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {renderError('projectType')}
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-body text-label text-mortar uppercase tracking-widest">{t.budget}</span>
          <select className={fieldClass} value={values.budget} onChange={(event) => updateValue('budget', event.target.value)}>
            <option value="">{t.selectBudget}</option>
            {t.budgets.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-body text-label text-mortar uppercase tracking-widest">{t.city}</span>
        <input className={fieldClass} value={values.city} onChange={(event) => updateValue('city', event.target.value)} />
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-body text-label text-mortar uppercase tracking-widest">{t.message}</span>
        <textarea rows={5} className={`${fieldClass} resize-none`} value={values.message} onChange={(event) => updateValue('message', event.target.value)} />
        {renderError('message')}
      </label>

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-brass text-lumen px-12 py-5 text-label font-medium uppercase tracking-[0.15em] hover:bg-brass-glow disabled:cursor-wait disabled:opacity-70 transition-colors duration-300"
        >
          {isSubmitting ? t.sending : t.submit}
        </button>
        {success ? (
          <p className="font-body text-[14px] leading-relaxed text-mortar" role="status">
            {t.success}
          </p>
        ) : null}
      </div>
    </form>
  );
}
