'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import styles from './login.module.css'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate backend connection/auth via timeout
    setTimeout(() => {
      setIsLoading(false)
      
      // Officially set the Authorization token into client memory
      localStorage.setItem('spicezone-auth', 'true')
      
      // Dispatch event to globally update Navbar UI instantly
      window.dispatchEvent(new Event('auth-change'))
      
      // Redirect seamlessly to checkout to continue their purchase flow
      router.push('/checkout')
    }, 1500)
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.authCard}>
        
        {/* Brand */}
        <div className={styles.brand}>
          <Link href="/" className={styles.brandText}>
            The Spices <span>Zone</span>
          </Link>
        </div>

        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Enter your details to access your account.</p>
        </div>

        {/* Content Form */}
        <form className={styles.form} onSubmit={handleLogin}>
          
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
                required
                style={{ width: '100%', paddingRight: '2.5rem' }}
              />
              <Mail className={styles.inputIcon} size={18} />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className={styles.label} htmlFor="password">Password</label>
              <Link href="#" className={styles.forgotPassword}>Forgot recipe?</Link>
            </div>
            <div className={styles.inputWrapper}>
              <input 
                id="password"
                type="password" 
                className={styles.input} 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', paddingRight: '2.5rem' }}
              />
              <Lock className={styles.inputIcon} size={18} />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? 'Authenticating...' : 'Sign In'} 
            {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>

        {/* Styled Social Auth */}
        <div className={styles.divider}>Or continue with</div>
        
        <button type="button" className={styles.socialBtn}>
          <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </button>

        {/* Utility Links */}
        <div className={styles.footer}>
          Don&apos;t have an account? 
          <Link href="/auth/register" className={styles.footerLink}>Create one</Link>
        </div>

      </div>
    </div>
  )
}
