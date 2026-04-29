'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User, Mail, Lock, ArrowRight } from 'lucide-react'
import { getApiErrorMessage, saveAuthSession } from '@/lib/auth-session'
import styles from '../login/login.module.css'

export default function RegisterPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    if (isLoading) return

    setIsLoading(true)
    setErrorMessage('')

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim(),
          password,
        }),
      })

      const payload = await response.json().catch(() => null)

      if (!response.ok) {
        setErrorMessage(getApiErrorMessage(payload, 'Unable to create account. Please try again.'))
        return
      }

      saveAuthSession(payload)
      router.push('/checkout')
    } catch {
      setErrorMessage('Authentication server is unreachable. Please try again in a moment.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.authCard}>

        <div className={styles.header}>
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>Register with username, email, and password.</p>
        </div>

        <form className={styles.form} onSubmit={handleRegister}>
          {errorMessage && (
            <p className={styles.errorBanner} role="alert">
              {errorMessage}
            </p>
          )}

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="username">Username</label>
            <div className={styles.inputWrapper}>
              <input
                id="username"
                type="text"
                className={styles.input}
                placeholder="spice_lover"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
                style={{ width: '100%', paddingRight: '2.5rem' }}
              />
              <User className={styles.inputIcon} size={18} />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">Email Address</label>
            <div className={styles.inputWrapper}>
              <input
                id="email"
                type="email"
                className={styles.input}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                style={{ width: '100%', paddingRight: '2.5rem' }}
              />
              <Mail className={styles.inputIcon} size={18} />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">Password</label>
            <div className={styles.inputWrapper}>
              <input
                id="password"
                type="password"
                className={styles.input}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
                style={{ width: '100%', paddingRight: '2.5rem' }}
              />
              <Lock className={styles.inputIcon} size={18} />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Create Account'}
            {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>

        <div className={styles.footer}>
          Already have an account?
          <Link href="/auth/login" className={styles.footerLink}>Sign in</Link>
        </div>
      </div>
    </div>
  )
}