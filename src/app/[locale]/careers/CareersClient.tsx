"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import { CheckCircle2, ChevronDown, Paperclip, Loader2 } from 'lucide-react'

export default function CareersClient({ careers }: { careers: any[] }) {
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    linkedin: '',
    portfolio: '',
    message: '',
    consent: false,
    honeypot: ''
  })
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.consent) {
      setErrorMsg('Veuillez accepter la politique de confidentialité.')
      return
    }
    
    setStatus('loading')
    setErrorMsg('')

    // Client-side validation for file size (e.g. 5MB max)
    if (file && file.size > 5 * 1024 * 1024) {
      setStatus('error')
      setErrorMsg('Le fichier est trop volumineux (Max 5MB).')
      return
    }

    try {
      const formData = new FormData()
      formData.append('jobId', selectedJob || 'spontaneous')
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value.toString())
      })
      if (file) {
        formData.append('cv', file)
      }

      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        body: formData
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de la soumission')
      }

      setStatus('success')
    } catch (err: any) {
      setStatus('error')
      setErrorMsg(err.message || 'Une erreur est survenue.')
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
      {/* Job Listing */}
      <div className="lg:col-span-5 space-y-6">
        <h2 className="text-xl font-bold uppercase tracking-widest text-[var(--color-eai-charcoal)] mb-8">
          Postes ouverts
        </h2>
        {careers.length === 0 ? (
          <div className="p-8 border border-[var(--color-eai-charcoal)]/10 rounded-lg text-center opacity-60">
            Aucun poste n'est ouvert pour le moment. N'hésitez pas à déposer une candidature spontanée.
          </div>
        ) : (
          careers.map(job => (
            <div 
              key={job.id} 
              className={cn(
                "p-6 rounded-lg border transition-all cursor-pointer",
                selectedJob === job.id 
                  ? "border-[var(--color-eai-olive)] bg-white shadow-md" 
                  : "border-[var(--color-eai-charcoal)]/10 bg-white/50 hover:border-[var(--color-eai-olive)]/50"
              )}
              onClick={() => setSelectedJob(job.id === selectedJob ? null : job.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-[var(--color-eai-charcoal)]">{job.title}</h3>
                <ChevronDown className={cn("w-5 h-5 transition-transform", selectedJob === job.id ? "rotate-180" : "")} />
              </div>
              <p className="text-sm opacity-60">{job.location} • {job.contractType}</p>
              
              <AnimatePresence>
                {selectedJob === job.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 mt-4 border-t border-[var(--color-eai-charcoal)]/10 text-sm space-y-4">
                      <p>{job.description}</p>
                      
                      <div>
                        <strong className="block mb-2">Responsabilités :</strong>
                        <ul className="list-disc pl-4 space-y-1 opacity-80">
                          {job.responsibilities.map((r: string, i: number) => <li key={i}>{r}</li>)}
                        </ul>
                      </div>
                      
                      <div>
                        <strong className="block mb-2">Prérequis :</strong>
                        <ul className="list-disc pl-4 space-y-1 opacity-80">
                          {job.requirements.map((r: string, i: number) => <li key={i}>{r}</li>)}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        )}
      </div>

      {/* Application Form */}
      <div className="lg:col-span-7">
        <div className="bg-white border border-[var(--color-eai-charcoal)]/10 rounded-xl p-8 md:p-12 shadow-sm relative overflow-hidden">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <CheckCircle2 className="w-20 h-20 text-[var(--color-eai-olive)] mb-6" />
              <h3 className="text-2xl font-bold uppercase tracking-tight mb-4 text-[var(--color-eai-charcoal)]">Candidature envoyée</h3>
              <p className="opacity-70 max-w-sm">Merci de votre intérêt. Notre équipe RH étudiera votre profil et reviendra vers vous très prochainement.</p>
              <button 
                onClick={() => {
                  setStatus('idle')
                  setForm({
                    name: '', email: '', phone: '', experience: '', linkedin: '', portfolio: '', message: '', consent: false, honeypot: ''
                  })
                  setFile(null)
                }}
                className="mt-8 px-6 py-2 border border-[var(--color-eai-charcoal)] text-sm uppercase tracking-widest font-bold hover:bg-[var(--color-eai-charcoal)] hover:text-white transition-colors"
              >
                Nouvelle candidature
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold uppercase tracking-tight text-[var(--color-eai-charcoal)] mb-2">
                {selectedJob ? `Postuler : ${careers.find(c => c.id === selectedJob)?.title}` : 'Candidature Spontanée'}
              </h2>
              <p className="opacity-60 text-sm mb-8">Remplissez le formulaire ci-dessous pour nous envoyer votre profil.</p>
              
              {status === 'error' && (
                <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm mb-6 border border-red-200">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleApply} className="space-y-6">
                <input type="text" name="honeypot" value={form.honeypot} onChange={e => setForm({...form, honeypot: e.target.value})} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold opacity-70">Nom complet *</label>
                    <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-transparent border-b border-[var(--color-eai-charcoal)]/20 py-2 outline-none focus:border-[var(--color-eai-olive)] text-[var(--color-eai-charcoal)]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold opacity-70">Email *</label>
                    <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full bg-transparent border-b border-[var(--color-eai-charcoal)]/20 py-2 outline-none focus:border-[var(--color-eai-olive)] text-[var(--color-eai-charcoal)]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold opacity-70">Téléphone *</label>
                    <input required type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full bg-transparent border-b border-[var(--color-eai-charcoal)]/20 py-2 outline-none focus:border-[var(--color-eai-olive)] text-[var(--color-eai-charcoal)]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold opacity-70">Expérience *</label>
                    <select required value={form.experience} onChange={e => setForm({...form, experience: e.target.value})} className="w-full bg-transparent border-b border-[var(--color-eai-charcoal)]/20 py-2 outline-none focus:border-[var(--color-eai-olive)] text-[var(--color-eai-charcoal)]">
                      <option value="" disabled hidden>Sélectionnez...</option>
                      <option value="0-2">0 - 2 ans</option>
                      <option value="3-5">3 - 5 ans</option>
                      <option value="5-10">5 - 10 ans</option>
                      <option value="10+">+10 ans</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold opacity-70">Profil LinkedIn</label>
                    <input type="url" value={form.linkedin} onChange={e => setForm({...form, linkedin: e.target.value})} placeholder="https://" className="w-full bg-transparent border-b border-[var(--color-eai-charcoal)]/20 py-2 outline-none focus:border-[var(--color-eai-olive)] text-[var(--color-eai-charcoal)]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold opacity-70">Portfolio / Site Web</label>
                    <input type="url" value={form.portfolio} onChange={e => setForm({...form, portfolio: e.target.value})} placeholder="https://" className="w-full bg-transparent border-b border-[var(--color-eai-charcoal)]/20 py-2 outline-none focus:border-[var(--color-eai-olive)] text-[var(--color-eai-charcoal)]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold opacity-70">Message de motivation</label>
                  <textarea rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full bg-transparent border-b border-[var(--color-eai-charcoal)]/20 py-2 outline-none focus:border-[var(--color-eai-olive)] text-[var(--color-eai-charcoal)] resize-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold opacity-70">CV (PDF, Max 5MB) *</label>
                  <label className="flex items-center gap-4 p-4 border border-[var(--color-eai-charcoal)]/20 border-dashed rounded-lg cursor-pointer hover:bg-black/5 transition-colors">
                    <Paperclip className="w-5 h-5 opacity-60" />
                    <span className="text-sm opacity-80 flex-1">{file ? file.name : "Cliquez pour sélectionner un fichier"}</span>
                    <input required type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={e => setFile(e.target.files?.[0] || null)} />
                  </label>
                </div>

                <label className="flex items-start gap-3 mt-6 cursor-pointer">
                  <input type="checkbox" required checked={form.consent} onChange={e => setForm({...form, consent: e.target.checked})} className="mt-1" />
                  <span className="text-xs opacity-70 leading-relaxed">
                    J'accepte que mes données personnelles soient traitées dans le cadre de ce processus de recrutement.
                  </span>
                </label>

                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-[var(--color-eai-charcoal)] text-white text-sm font-bold uppercase tracking-widest hover:bg-[var(--color-eai-olive)] hover:text-[var(--color-eai-black)] transition-colors flex justify-center items-center gap-3"
                >
                  {status === 'loading' ? <><Loader2 className="w-4 h-4 animate-spin" /> Envoi...</> : 'Envoyer la candidature'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
