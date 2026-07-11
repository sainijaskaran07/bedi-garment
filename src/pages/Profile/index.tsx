import React, { useState, useEffect } from 'react'
import { 
  User, MapPin, Package, Settings, CheckCircle, AlertCircle, 
  Heart, Percent, Bell, LogOut, Camera, Eye, EyeOff, ClipboardList
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useShop } from '../../context/ShopContext'

// ================= TYPES & INTERFACES =================

interface Address {
  id: string
  label: string
  addressLine: string
  city: string
  state: string
  zip: string
  phone: string
  isDefault: boolean
}
interface Coupon {
  code: string
  discount: string
  expiry: string
  description: string
}

interface Customer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  passwordHash: string
  profileImage: string
  addresses: Address[]
  rewardPoints: number
  coupons: Coupon[]
  notifications: string[]
  createdAt: string
  updatedAt: string
}

// ================= CUSTOM ICONS =================

const GoogleIcon = () => (
  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
)

const AppleIcon = () => (
  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.84-.98 2.94 1.07.08 2.15-.52 2.81-1.33z"/>
  </svg>
)

// ================= PROFILE PAGE COMPONENT =================

export const ProfilePage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart } = useShop()

  // --- Auth View Navigation States ---
  // authView handles login flow screens: 'login' | 'signup' | 'forgot' | 'verify' | 'reset'
  const [authView, setAuthView] = useState<'login' | 'signup' | 'forgot' | 'verify' | 'reset'>('login')
  const [resetEmail, setResetEmail] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // --- Authenticated Customer States ---
  const [currentUser, setCurrentUser] = useState<Customer | null>(() => {
    const saved = localStorage.getItem('bg_current_user')
    return saved ? JSON.parse(saved) : null
  })

  // --- Dashboard Tab State ---
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'wishlist' | 'coupons' | 'notifications' | 'settings'>('profile')

  // --- Address Form States ---
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null)
  const [addressLabel, setAddressLabel] = useState('Home')
  const [addressLine, setAddressLine] = useState('')
  const [addressCity, setAddressCity] = useState('')
  const [addressState, setAddressState] = useState('Punjab')
  const [addressZip, setAddressZip] = useState('')
  const [addressPhone, setAddressPhone] = useState('')
  const [addressIsDefault, setAddressIsDefault] = useState(false)

  // --- Login Form States ---
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [loginPhone, setLoginPhone] = useState('')
  const [otpLogin, setOtpLogin] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otpCode, setOtpCode] = useState('')

  // --- Signup Form States ---
  const [signupFirstName, setSignupFirstName] = useState('')
  const [signupLastName, setSignupLastName] = useState('')
  const [signupPhone, setSignupPhone] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('')
  const [signupAgreed, setSignupAgreed] = useState(false)
  const [signupSubscribe, setSignupSubscribe] = useState(false)

  // --- Forgot & Reset States ---
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotPhone, setForgotPhone] = useState('')
  const [forgotMethod, setForgotMethod] = useState<'email' | 'phone'>('email')
  const [verifyCodeInput, setVerifyCodeInput] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  // --- Error / Success Display States ---
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState('')

  // --- Initialize Database & Mock Data ---
  useEffect(() => {
    const savedUsers = localStorage.getItem('bg_users')
    if (!savedUsers) {
      // Establish an empty customer array
      localStorage.setItem('bg_users', JSON.stringify([]))
    }
  }, [])

  // Helper: Persist local changes to database and current session
  const saveUserSession = (user: Customer) => {
    localStorage.setItem('bg_current_user', JSON.stringify(user))
    setCurrentUser(user)
    
    // Update in database list
    const users = JSON.parse(localStorage.getItem('bg_users') || '[]')
    const idx = users.findIndex((u: Customer) => u.id === user.id)
    if (idx > -1) {
      users[idx] = user
      localStorage.setItem('bg_users', JSON.stringify(users))
    }
  }

  // ================= AUTHENTICATION ACTIONS =================

  // Action: Handle Standard Email Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    setFormSuccess('')

    if (!loginEmail || !loginPassword) {
      setFormError('Please enter both your email address and password.')
      return
    }

    const users = JSON.parse(localStorage.getItem('bg_users') || '[]')
    const user = users.find((u: Customer) => u.email.toLowerCase() === loginEmail.toLowerCase())

    if (!user) {
      setFormError('No account found with this email address.')
      return
    }

    // Hash comparison simulation
    if (user.passwordHash !== btoa(loginPassword)) {
      setFormError('Incorrect password. Please try again.')
      return
    }

    // Success login
    localStorage.setItem('bg_current_user', JSON.stringify(user))
    setCurrentUser(user)
    setFormSuccess('Successfully logged in. Welcoming you back...')
    setLoginEmail('')
    setLoginPassword('')
  }

  // Action: Handle OTP Phone Login Simulation
  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    if (!loginPhone || loginPhone.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number.')
      return
    }

    const users = JSON.parse(localStorage.getItem('bg_users') || '[]')
    const user = users.find((u: Customer) => u.phone === loginPhone)

    if (!user) {
      setFormError('No account found registered under this mobile number.')
      return
    }

    // Simulate OTP Dispatch
    setOtpSent(true)
    setFormSuccess('A verification code "123456" has been simulated and sent to your phone.')
  }

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    if (otpCode !== '123456') {
      setFormError('Invalid OTP code. Please enter "123456" to proceed.')
      return
    }

    const users = JSON.parse(localStorage.getItem('bg_users') || '[]')
    const user = users.find((u: Customer) => u.phone === loginPhone)
    
    if (user) {
      localStorage.setItem('bg_current_user', JSON.stringify(user))
      setCurrentUser(user)
      setOtpSent(false)
      setOtpLogin(false)
      setLoginPhone('')
      setOtpCode('')
    }
  }

  // Action: Handle Create Account (Sign Up)
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    setFormSuccess('')

    if (!signupFirstName || !signupLastName || !signupPhone || !signupEmail || !signupPassword || !signupConfirmPassword) {
      setFormError('All registration fields are required.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(signupEmail)) {
      setFormError('Please enter a valid email address.')
      return
    }

    if (signupPhone.length < 10) {
      setFormError('Please enter a valid 10-digit phone number.')
      return
    }

    if (signupPassword.length < 6) {
      setFormError('Password must be at least 6 characters long.')
      return
    }

    if (signupPassword !== signupConfirmPassword) {
      setFormError('Passwords do not match.')
      return
    }

    if (!signupAgreed) {
      setFormError('You must agree to the Terms & Conditions to register.')
      return
    }

    const users = JSON.parse(localStorage.getItem('bg_users') || '[]')
    const emailExists = users.some((u: Customer) => u.email.toLowerCase() === signupEmail.toLowerCase())
    if (emailExists) {
      setFormError('An account with this email address already exists.')
      return
    }

    // Success registration -> Send to verify state
    setResetEmail(signupEmail)
    setAuthView('verify')
    setFormSuccess('We have simulated a verification code "123456" to your email.')
  }

  // Action: Confirm Email Verification Code
  const handleVerifyEmail = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    if (verifyCodeInput !== '123456') {
      setFormError('Invalid code. Please enter the simulated verification code "123456".')
      return
    }

    // Create the customer record in DB
    const users = JSON.parse(localStorage.getItem('bg_users') || '[]')
    
    // Check if user is signing up (resetEmail has the value) or verifying
    const newCustomer: Customer = {
      id: `CUST-${Date.now()}`,
      firstName: signupFirstName,
      lastName: signupLastName,
      email: signupEmail,
      phone: signupPhone,
      passwordHash: btoa(signupPassword), // Base64 encoding simulator
      profileImage: '',
      addresses: [],
      rewardPoints: 150, // Welcome points
      coupons: [
        { code: "WELCOME15", discount: "15% OFF", expiry: "August 31, 2026", description: "15% off your first order" },
        { code: "FREESHIP", discount: "FREE SHIPPING", expiry: "December 31, 2026", description: "Free express shipping worldwide" }
      ],
      notifications: [
        "Welcome to Bedi Garments! 150 reward points have been credited to your workspace.",
        "Your first exclusive coupon 'WELCOME15' is now active."
      ],
      createdAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      updatedAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    }

    users.push(newCustomer)
    localStorage.setItem('bg_users', JSON.stringify(users))
    
    // Automatically log in the user
    localStorage.setItem('bg_current_user', JSON.stringify(newCustomer))
    setCurrentUser(newCustomer)

    // Clear form states
    setSignupFirstName('')
    setSignupLastName('')
    setSignupPhone('')
    setSignupEmail('')
    setSignupPassword('')
    setSignupConfirmPassword('')
    setSignupAgreed(false)
    setVerifyCodeInput('')
    setAuthView('login')
  }

  // Action: Forgot Password Link Dispatch
  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    setFormSuccess('')

    const users = JSON.parse(localStorage.getItem('bg_users') || '[]')
    
    if (forgotMethod === 'email') {
      if (!forgotEmail) {
        setFormError('Please enter your email address.')
        return
      }
      const user = users.find((u: Customer) => u.email.toLowerCase() === forgotEmail.toLowerCase())
      if (!user) {
        setFormError('No account found registered under this email.')
        return
      }
      setResetEmail(forgotEmail)
      setAuthView('reset')
      setFormSuccess('We have verified your email. Please update your password below.')
    } else {
      if (!forgotPhone || forgotPhone.length < 10) {
        setFormError('Please enter a valid 10-digit mobile number.')
        return
      }
      const user = users.find((u: Customer) => u.phone === forgotPhone)
      if (!user) {
        setFormError('No account found registered under this mobile number.')
        return
      }
      setResetEmail(user.email)
      setAuthView('reset')
      setFormSuccess('OTP verified. Please update your password below.')
    }
  }

  // Action: Reset Password Execution
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    
    if (newPassword.length < 6) {
      setFormError('New password must be at least 6 characters long.')
      return
    }

    if (newPassword !== confirmNewPassword) {
      setFormError('Passwords do not match.')
      return
    }

    const users = JSON.parse(localStorage.getItem('bg_users') || '[]')
    const idx = users.findIndex((u: Customer) => u.email.toLowerCase() === resetEmail.toLowerCase())
    if (idx > -1) {
      users[idx].passwordHash = btoa(newPassword)
      localStorage.setItem('bg_users', JSON.stringify(users))
      setAuthView('login')
      setFormSuccess('Password successfully reset. Please log in with your new credentials.')
      setNewPassword('')
      setConfirmNewPassword('')
      setResetEmail('')
    }
  }

  // Action: Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('bg_current_user')
    setCurrentUser(null)
    setActiveTab('profile')
    setFormError('')
    setFormSuccess('')
  }

  // ================= ADDRESS MANAGEMENT ACTIONS =================

  const handleAddOrEditAddress = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUser) return

    if (!addressLine || !addressCity || !addressZip || !addressPhone) {
      alert('Please fill out all address fields.')
      return
    }

    let updatedAddresses = [...currentUser.addresses]

    if (addressIsDefault) {
      // Unset previous defaults
      updatedAddresses = updatedAddresses.map(addr => ({ ...addr, isDefault: false }))
    }

    if (editingAddressId) {
      // Edit existing
      updatedAddresses = updatedAddresses.map(addr => 
        addr.id === editingAddressId 
          ? { 
              id: addr.id, 
              label: addressLabel, 
              addressLine, 
              city: addressCity, 
              state: addressState, 
              zip: addressZip, 
              phone: addressPhone, 
              isDefault: addressIsDefault 
            } 
          : addr
      )
    } else {
      // Add new address
      const newAddress: Address = {
        id: `ADDR-${Date.now()}`,
        label: addressLabel,
        addressLine,
        city: addressCity,
        state: addressState,
        zip: addressZip,
        phone: addressPhone,
        isDefault: updatedAddresses.length === 0 ? true : addressIsDefault
      }
      updatedAddresses.push(newAddress)
    }

    const updatedUser = {
      ...currentUser,
      addresses: updatedAddresses
    }
    saveUserSession(updatedUser)
    clearAddressForm()
  }

  const handleDeleteAddress = (id: string) => {
    if (!currentUser) return
    const updatedAddresses = currentUser.addresses.filter(addr => addr.id !== id)
    
    // If we deleted default, set the first one as default
    if (updatedAddresses.length > 0 && !updatedAddresses.some(a => a.isDefault)) {
      updatedAddresses[0].isDefault = true
    }

    const updatedUser = {
      ...currentUser,
      addresses: updatedAddresses
    }
    saveUserSession(updatedUser)
  }

  const handleSetDefaultAddress = (id: string) => {
    if (!currentUser) return
    const updatedAddresses = currentUser.addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }))
    const updatedUser = {
      ...currentUser,
      addresses: updatedAddresses
    }
    saveUserSession(updatedUser)
  }

  const clearAddressForm = () => {
    setShowAddressForm(false)
    setEditingAddressId(null)
    setAddressLabel('Home')
    setAddressLine('')
    setAddressCity('')
    setAddressState('Punjab')
    setAddressZip('')
    setAddressPhone('')
    setAddressIsDefault(false)
  }

  const handleEditAddressClick = (addr: Address) => {
    setEditingAddressId(addr.id)
    setAddressLabel(addr.label)
    setAddressLine(addr.addressLine)
    setAddressCity(addr.city)
    setAddressState(addr.state)
    setAddressZip(addr.zip)
    setAddressPhone(addr.phone)
    setAddressIsDefault(addr.isDefault)
    setShowAddressForm(true)
  }

  // ================= GENERAL SETTINGS ACTIONS =================

  // Action: Handle profile update
  const [editFirstName, setEditFirstName] = useState(currentUser?.firstName || '')
  const [editLastName, setEditLastName] = useState(currentUser?.lastName || '')
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '')

  useEffect(() => {
    if (currentUser) {
      setEditFirstName(currentUser.firstName)
      setEditLastName(currentUser.lastName)
      setEditPhone(currentUser.phone)
    }
  }, [currentUser])

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUser) return
    if (!editFirstName || !editLastName || !editPhone) {
      alert('Profile fields cannot be left empty.')
      return
    }
    const updatedUser = {
      ...currentUser,
      firstName: editFirstName,
      lastName: editLastName,
      phone: editPhone,
      updatedAt: new Date().toLocaleDateString('en-US')
    }
    saveUserSession(updatedUser)
    alert('Profile successfully updated.')
  }

  // Action: Handle Avatar Base64 Upload
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentUser) return
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        const updatedUser = {
          ...currentUser,
          profileImage: base64String
        }
        saveUserSession(updatedUser)
      }
      reader.readAsDataURL(file)
    }
  }

  // Action: Handle Delete Account
  const handleDeleteAccount = () => {
    if (!currentUser) return
    const confirm = window.confirm('WARNING: Are you absolutely sure you want to delete your account? This action is permanent and cannot be undone.')
    if (confirm) {
      const users = JSON.parse(localStorage.getItem('bg_users') || '[]')
      const updatedUsers = users.filter((u: Customer) => u.id !== currentUser.id)
      localStorage.setItem('bg_users', JSON.stringify(updatedUsers))
      localStorage.removeItem('bg_current_user')
      setCurrentUser(null)
      setActiveTab('profile')
      alert('Your account has been deleted.')
    }
  }

  return (
    <div className="bg-white min-h-screen pb-20 select-none text-brand-text font-body selection:bg-brand-accent selection:text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
        
        {/* ================= HEADER BLOCK ================= */}
        <div className="border-b border-border-primary/50 pb-6 mb-10">
          <span className="text-[10px] font-heading font-extrabold tracking-[0.25em] text-brand-accent uppercase">
            {currentUser ? 'Customer Dashboard' : 'Customer Authentication'}
          </span>
          <h1 className="text-3xl font-heading font-extrabold tracking-tight uppercase mt-2">
            {currentUser ? 'My Account' : 'Welcome to Bedi Garments'}
          </h1>
        </div>

        {/* ================= AUTHENTICATION FLOW ================= */}
        {!currentUser ? (
          <div className="max-w-md mx-auto bg-white border border-border-primary/50 p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] space-y-6">
            
            {/* Show login error/success banners */}
            {formError && (
              <div className="p-4 bg-red-50 text-red-700 text-xs rounded-xl flex items-start gap-2.5 font-medium leading-relaxed">
                <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}
            {formSuccess && (
              <div className="p-4 bg-green-50 text-green-700 text-xs rounded-xl flex items-start gap-2.5 font-medium leading-relaxed">
                <CheckCircle size={14} className="flex-shrink-0 mt-0.5" />
                <span>{formSuccess}</span>
              </div>
            )}

            {/* SCREEN 1: LOGIN FORM */}
            {authView === 'login' && (
              <div className="space-y-5">


                {!otpLogin ? (
                  /* Standard Email Login */
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-[9px] font-heading font-extrabold tracking-wider text-brand-text-muted uppercase mb-1.5">Email Address</label>
                      <input 
                        type="email" 
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="e.g. name@domain.com"
                        className="w-full h-11 px-4 text-xs font-heading font-medium bg-bg-secondary/40 border border-border-primary/50 rounded-xl focus:outline-none focus:border-brand-accent transition-colors"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-[9px] font-heading font-extrabold tracking-wider text-brand-text-muted uppercase">Password</label>
                        <button 
                          type="button" 
                          onClick={() => setAuthView('forgot')}
                          className="text-[9px] font-heading font-bold text-brand-accent uppercase hover:underline"
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"} 
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full h-11 pl-4 pr-10 text-xs font-heading font-medium bg-bg-secondary/40 border border-border-primary/50 rounded-xl focus:outline-none focus:border-brand-accent transition-colors"
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-text transition-colors"
                        >
                          {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-brand-accent focus:ring-brand-accent"
                      />
                      <label htmlFor="rememberMe" className="ml-2 text-[10px] font-heading font-bold uppercase tracking-wider text-brand-text-muted cursor-pointer">Remember Me</label>
                    </div>

                    <button 
                      type="submit"
                      className="w-full h-12 bg-[#111111] text-white text-[11px] font-heading font-extrabold tracking-[0.2em] rounded-xl hover:bg-brand-accent transition-all duration-300 shadow-md uppercase focus:outline-none"
                    >
                      Login
                    </button>
                  </form>
                ) : (
                  /* Phone OTP Login */
                  <form onSubmit={!otpSent ? handleSendOTP : handleVerifyOTP} className="space-y-4">
                    <div>
                      <label className="block text-[9px] font-heading font-extrabold tracking-wider text-brand-text-muted uppercase mb-1.5">Mobile Number</label>
                      <input 
                        type="tel" 
                        value={loginPhone}
                        onChange={(e) => setLoginPhone(e.target.value.replace(/[^0-9]/g, ''))}
                        maxLength={10}
                        disabled={otpSent}
                        placeholder="Enter 10-digit mobile number"
                        className="w-full h-11 px-4 text-xs font-heading font-medium bg-bg-secondary/40 border border-border-primary/50 rounded-xl focus:outline-none focus:border-brand-accent transition-colors disabled:opacity-50"
                      />
                    </div>

                    {otpSent && (
                      <div>
                        <label className="block text-[9px] font-heading font-extrabold tracking-wider text-brand-text-muted uppercase mb-1.5">OTP Code</label>
                        <input 
                          type="text" 
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
                          maxLength={6}
                          placeholder="Enter 6-digit OTP code"
                          className="w-full h-11 px-4 text-xs font-heading font-medium bg-bg-secondary/40 border border-border-primary/50 rounded-xl focus:outline-none focus:border-brand-accent transition-colors"
                        />
                      </div>
                    )}

                    <button 
                      type="submit"
                      className="w-full h-12 bg-[#111111] text-white text-[11px] font-heading font-extrabold tracking-[0.2em] rounded-xl hover:bg-brand-accent transition-all duration-300 shadow-md uppercase focus:outline-none"
                    >
                      {!otpSent ? 'Send OTP' : 'Verify & Login'}
                    </button>
                  </form>
                )}

                {/* Social Logins */}
                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-border-primary/60"></div>
                  <span className="flex-shrink mx-4 text-[9px] font-heading font-extrabold tracking-widest text-slate-400 uppercase">Or Continue With</span>
                  <div className="flex-grow border-t border-border-primary/60"></div>
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <button 
                    onClick={() => alert('Google authentication simulated.')}
                    className="flex items-center justify-center h-11 border border-border-primary/60 rounded-xl text-[10px] font-heading font-extrabold tracking-wider uppercase hover:bg-bg-secondary/35 transition-colors focus:outline-none"
                  >
                    <GoogleIcon /> Google
                  </button>
                  <button 
                    onClick={() => alert('Apple authentication simulated.')}
                    className="flex items-center justify-center h-11 border border-border-primary/60 rounded-xl text-[10px] font-heading font-extrabold tracking-wider uppercase hover:bg-bg-secondary/35 transition-colors focus:outline-none"
                  >
                    <AppleIcon /> Apple
                  </button>
                </div>

                <button 
                  onClick={() => {
                    setFormError('')
                    setFormSuccess('')
                    setOtpLogin(!otpLogin)
                    setOtpSent(false)
                  }}
                  className="w-full h-11 border border-border-primary/60 rounded-xl text-[10px] font-heading font-extrabold tracking-widest uppercase hover:bg-bg-secondary/35 transition-colors focus:outline-none"
                >
                  {otpLogin ? 'Use Email / Password' : 'Login with OTP / Phone'}
                </button>

                <div className="border-t border-border-primary/50 pt-5 text-center">
                  <span className="text-xs text-brand-text-muted font-medium">New customer? </span>
                  <button 
                    onClick={() => {
                      setFormError('')
                      setFormSuccess('')
                      setAuthView('signup')
                    }}
                    className="text-xs font-heading font-bold text-brand-accent uppercase hover:underline"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN 2: SIGNUP FORM */}
            {authView === 'signup' && (
              <div className="space-y-5">


                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[9px] font-heading font-extrabold tracking-wider text-brand-text-muted uppercase mb-1.5">First Name</label>
                      <input 
                        type="text" 
                        value={signupFirstName}
                        onChange={(e) => setSignupFirstName(e.target.value)}
                        placeholder="John"
                        className="w-full h-11 px-4 text-xs font-heading font-medium bg-bg-secondary/40 border border-border-primary/50 rounded-xl focus:outline-none focus:border-brand-accent transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-heading font-extrabold tracking-wider text-brand-text-muted uppercase mb-1.5">Last Name</label>
                      <input 
                        type="text" 
                        value={signupLastName}
                        onChange={(e) => setSignupLastName(e.target.value)}
                        placeholder="Doe"
                        className="w-full h-11 px-4 text-xs font-heading font-medium bg-bg-secondary/40 border border-border-primary/50 rounded-xl focus:outline-none focus:border-brand-accent transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[9px] font-heading font-extrabold tracking-wider text-brand-text-muted uppercase mb-1.5">Mobile Number</label>
                    <input 
                      type="tel" 
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value.replace(/[^0-9]/g, ''))}
                      maxLength={10}
                      placeholder="Enter 10-digit phone"
                      className="w-full h-11 px-4 text-xs font-heading font-medium bg-bg-secondary/40 border border-border-primary/50 rounded-xl focus:outline-none focus:border-brand-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-heading font-extrabold tracking-wider text-brand-text-muted uppercase mb-1.5">Email Address</label>
                    <input 
                      type="email" 
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="e.g. name@domain.com"
                      className="w-full h-11 px-4 text-xs font-heading font-medium bg-bg-secondary/40 border border-border-primary/50 rounded-xl focus:outline-none focus:border-brand-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-heading font-extrabold tracking-wider text-brand-text-muted uppercase mb-1.5">Password</label>
                    <input 
                      type="password" 
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full h-11 px-4 text-xs font-heading font-medium bg-bg-secondary/40 border border-border-primary/50 rounded-xl focus:outline-none focus:border-brand-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-heading font-extrabold tracking-wider text-brand-text-muted uppercase mb-1.5">Confirm Password</label>
                    <input 
                      type="password" 
                      value={signupConfirmPassword}
                      onChange={(e) => setSignupConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      className="w-full h-11 px-4 text-xs font-heading font-medium bg-bg-secondary/40 border border-border-primary/50 rounded-xl focus:outline-none focus:border-brand-accent transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start">
                      <input 
                        type="checkbox" 
                        id="signupAgreed"
                        checked={signupAgreed}
                        onChange={(e) => setSignupAgreed(e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded border-gray-300 text-brand-accent focus:ring-brand-accent"
                      />
                      <label htmlFor="signupAgreed" className="ml-2 text-[10px] font-heading font-bold uppercase tracking-wider text-brand-text-muted cursor-pointer leading-normal">
                        I agree to the Terms & Conditions
                      </label>
                    </div>
                    <div className="flex items-start">
                      <input 
                        type="checkbox" 
                        id="signupSubscribe"
                        checked={signupSubscribe}
                        onChange={(e) => setSignupSubscribe(e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded border-gray-300 text-brand-accent focus:ring-brand-accent"
                      />
                      <label htmlFor="signupSubscribe" className="ml-2 text-[10px] font-heading font-bold uppercase tracking-wider text-brand-text-muted cursor-pointer leading-normal">
                        Subscribe to Offers & Campaigns (Optional)
                      </label>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full h-12 bg-[#111111] text-white text-[11px] font-heading font-extrabold tracking-[0.2em] rounded-xl hover:bg-brand-accent transition-all duration-300 shadow-md uppercase focus:outline-none"
                  >
                    Create Account
                  </button>
                </form>

                <div className="border-t border-border-primary/50 pt-5 text-center">
                  <span className="text-xs text-brand-text-muted font-medium">Already have an account? </span>
                  <button 
                    onClick={() => {
                      setFormError('')
                      setFormSuccess('')
                      setAuthView('login')
                    }}
                    className="text-xs font-heading font-bold text-brand-accent uppercase hover:underline"
                  >
                    Login
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN 3: FORGOT PASSWORD */}
            {authView === 'forgot' && (
              <div className="space-y-5">


                <div className="flex border border-border-primary/60 p-1 rounded-xl bg-bg-secondary/40">
                  <button 
                    onClick={() => setForgotMethod('email')}
                    className={`flex-1 py-2 text-[9px] font-heading font-extrabold tracking-wider uppercase rounded-lg transition-colors ${
                      forgotMethod === 'email' ? 'bg-[#111111] text-white' : 'text-slate-400 hover:text-brand-text'
                    }`}
                  >
                    Email
                  </button>
                  <button 
                    onClick={() => setForgotMethod('phone')}
                    className={`flex-1 py-2 text-[9px] font-heading font-extrabold tracking-wider uppercase rounded-lg transition-colors ${
                      forgotMethod === 'phone' ? 'bg-[#111111] text-white' : 'text-slate-400 hover:text-brand-text'
                    }`}
                  >
                    Phone
                  </button>
                </div>

                <form onSubmit={handleForgotPassword} className="space-y-4">
                  {forgotMethod === 'email' ? (
                    <div>
                      <label className="block text-[9px] font-heading font-extrabold tracking-wider text-brand-text-muted uppercase mb-1.5">Email Address</label>
                      <input 
                        type="email" 
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="Enter email to get reset link"
                        className="w-full h-11 px-4 text-xs font-heading font-medium bg-bg-secondary/40 border border-border-primary/50 rounded-xl focus:outline-none focus:border-brand-accent transition-colors"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[9px] font-heading font-extrabold tracking-wider text-brand-text-muted uppercase mb-1.5">Mobile Number</label>
                      <input 
                        type="tel" 
                        value={forgotPhone}
                        onChange={(e) => setForgotPhone(e.target.value.replace(/[^0-9]/g, ''))}
                        maxLength={10}
                        placeholder="Enter 10-digit mobile to receive OTP"
                        className="w-full h-11 px-4 text-xs font-heading font-medium bg-bg-secondary/40 border border-border-primary/50 rounded-xl focus:outline-none focus:border-brand-accent transition-colors"
                      />
                    </div>
                  )}

                  <button 
                    type="submit"
                    className="w-full h-12 bg-[#111111] text-white text-[11px] font-heading font-extrabold tracking-[0.2em] rounded-xl hover:bg-brand-accent transition-all duration-300 shadow-md uppercase"
                  >
                    {forgotMethod === 'email' ? 'Send Reset Link' : 'Send OTP'}
                  </button>
                </form>

                <div className="text-center pt-2">
                  <button 
                    onClick={() => {
                      setFormError('')
                      setFormSuccess('')
                      setAuthView('login')
                    }}
                    className="text-xs font-heading font-bold text-slate-400 hover:text-brand-text uppercase transition-colors"
                  >
                    &larr; Back to Login
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN 4: EMAIL VERIFICATION */}
            {authView === 'verify' && (
              <div className="space-y-5">


                <form onSubmit={handleVerifyEmail} className="space-y-4">
                  <div>
                    <label className="block text-[9px] font-heading font-extrabold tracking-wider text-brand-text-muted uppercase mb-1.5">Verification Code</label>
                    <input 
                      type="text" 
                      value={verifyCodeInput}
                      onChange={(e) => setVerifyCodeInput(e.target.value.replace(/[^0-9]/g, ''))}
                      maxLength={6}
                      placeholder="Enter code '123456'"
                      className="w-full h-11 px-4 text-xs font-heading font-medium bg-bg-secondary/40 border border-border-primary/50 rounded-xl focus:outline-none focus:border-brand-accent transition-colors"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full h-12 bg-[#111111] text-white text-[11px] font-heading font-extrabold tracking-[0.2em] rounded-xl hover:bg-brand-accent transition-all duration-300 shadow-md uppercase"
                  >
                    Verify Email
                  </button>
                </form>

                <div className="text-center pt-2">
                  <button 
                    onClick={() => {
                      setVerifyCodeInput('123456')
                      setFormSuccess('Code "123456" autofilled.')
                    }}
                    className="text-xs font-heading font-bold text-brand-accent uppercase hover:underline"
                  >
                    Resend Code
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN 5: RESET PASSWORD */}
            {authView === 'reset' && (
              <div className="space-y-5">


                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div>
                    <label className="block text-[9px] font-heading font-extrabold tracking-wider text-brand-text-muted uppercase mb-1.5">New Password</label>
                    <input 
                      type="password" 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full h-11 px-4 text-xs font-heading font-medium bg-bg-secondary/40 border border-border-primary/50 rounded-xl focus:outline-none focus:border-brand-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-heading font-extrabold tracking-wider text-brand-text-muted uppercase mb-1.5">Confirm Password</label>
                    <input 
                      type="password" 
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full h-11 px-4 text-xs font-heading font-medium bg-bg-secondary/40 border border-border-primary/50 rounded-xl focus:outline-none focus:border-brand-accent"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full h-12 bg-[#111111] text-white text-[11px] font-heading font-extrabold tracking-[0.2em] rounded-xl hover:bg-brand-accent transition-all duration-300 shadow-md uppercase"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            )}

          </div>
        ) : (
          
          /* ================= PROFILE PAGE VIEW ================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-3 flex flex-col space-y-1.5 border border-border-primary/40 p-5 rounded-3xl bg-[#FAFAF8] shadow-[0_4px_25px_rgba(0,0,0,0.005)]">
              
              {/* Customer Avatar & Quick Details */}
              <div className="flex flex-col items-center pb-5 border-b border-border-primary/60 mb-3 text-center relative group">
                <div className="relative w-24 h-24 mb-3 rounded-full overflow-hidden border-2 border-brand-accent/50 shadow-md">
                  {currentUser.profileImage ? (
                    <img 
                      src={currentUser.profileImage} 
                      alt={currentUser.firstName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#111111] text-white flex items-center justify-center font-heading font-extrabold text-3xl">
                      {currentUser.firstName[0]}
                    </div>
                  )}
                  {/* Photo upload overlay */}
                  <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer">
                    <Camera size={18} className="text-white" />
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleAvatarChange}
                      className="hidden" 
                    />
                  </label>
                </div>
                
                <h3 className="font-heading text-base font-extrabold text-brand-text uppercase leading-normal tracking-wide">
                  {currentUser.firstName} {currentUser.lastName}
                </h3>
                <p className="text-[11px] text-slate-400 font-body leading-normal">{currentUser.email}</p>
              </div>

              {/* Sidebar Tabs */}
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl text-[10px] font-heading font-extrabold uppercase tracking-wider transition-all duration-200 text-left ${
                  activeTab === 'profile' 
                    ? 'bg-[#111111] text-white shadow-sm' 
                    : 'text-brand-text-muted hover:bg-bg-secondary hover:text-brand-text'
                }`}
              >
                <User size={13} />
                <span>Personal Info</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl text-[10px] font-heading font-extrabold uppercase tracking-wider transition-all duration-200 text-left ${
                  activeTab === 'orders' 
                    ? 'bg-[#111111] text-white shadow-sm' 
                    : 'text-brand-text-muted hover:bg-bg-secondary hover:text-brand-text'
                }`}
              >
                <Package size={13} />
                <span>Order History</span>
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl text-[10px] font-heading font-extrabold uppercase tracking-wider transition-all duration-200 text-left ${
                  activeTab === 'addresses' 
                    ? 'bg-[#111111] text-white shadow-sm' 
                    : 'text-brand-text-muted hover:bg-bg-secondary hover:text-brand-text'
                }`}
              >
                <MapPin size={13} />
                <span>Saved Addresses</span>
              </button>

              <button
                onClick={() => setActiveTab('wishlist')}
                className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl text-[10px] font-heading font-extrabold uppercase tracking-wider transition-all duration-200 text-left ${
                  activeTab === 'wishlist' 
                    ? 'bg-[#111111] text-white shadow-sm' 
                    : 'text-brand-text-muted hover:bg-bg-secondary hover:text-brand-text'
                }`}
              >
                <Heart size={13} />
                <span>Wishlist</span>
              </button>

              <button
                onClick={() => setActiveTab('coupons')}
                className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl text-[10px] font-heading font-extrabold uppercase tracking-wider transition-all duration-200 text-left ${
                  activeTab === 'coupons' 
                    ? 'bg-[#111111] text-white shadow-sm' 
                    : 'text-brand-text-muted hover:bg-bg-secondary hover:text-brand-text'
                }`}
              >
                <Percent size={13} />
                <span>Coupons</span>
              </button>

              <button
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl text-[10px] font-heading font-extrabold uppercase tracking-wider transition-all duration-200 text-left relative ${
                  activeTab === 'notifications' 
                    ? 'bg-[#111111] text-white shadow-sm' 
                    : 'text-brand-text-muted hover:bg-bg-secondary hover:text-brand-text'
                }`}
              >
                <Bell size={13} />
                <span>Notifications</span>
                {currentUser.notifications.length > 0 && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-accent animate-ping" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl text-[10px] font-heading font-extrabold uppercase tracking-wider transition-all duration-200 text-left ${
                  activeTab === 'settings' 
                    ? 'bg-[#111111] text-white shadow-sm' 
                    : 'text-brand-text-muted hover:bg-bg-secondary hover:text-brand-text'
                }`}
              >
                <Settings size={13} />
                <span>Account Settings</span>
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-4 py-3.5 rounded-xl text-[10px] font-heading font-extrabold uppercase tracking-wider text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors text-left mt-6"
              >
                <LogOut size={13} />
                <span>Logout</span>
              </button>
            </aside>

            {/* Main Content Pane */}
            <main className="lg:col-span-9 bg-white border border-border-primary/40 p-6 md:p-8 rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.005)] min-h-[500px]">
              
              {/* TAB 1: PERSONAL INFO */}
              {activeTab === 'profile' && (
                <div className="space-y-8">
                  <div className="border-b border-border-primary/50 pb-3">
                    <h2 className="font-heading text-sm font-extrabold tracking-widest uppercase">
                      Personal Information
                    </h2>
                  </div>
                  
                  <form onSubmit={handleUpdateProfile} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[9px] font-heading font-extrabold tracking-wider text-brand-text-muted uppercase mb-1.5">First Name</label>
                        <input 
                          type="text" 
                          value={editFirstName}
                          onChange={(e) => setEditFirstName(e.target.value)}
                          className="w-full h-11 px-4 text-xs font-heading font-medium bg-[#FAFAF8] border border-border-primary/50 rounded-xl focus:outline-none focus:border-brand-accent transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-heading font-extrabold tracking-wider text-brand-text-muted uppercase mb-1.5">Last Name</label>
                        <input 
                          type="text" 
                          value={editLastName}
                          onChange={(e) => setEditLastName(e.target.value)}
                          className="w-full h-11 px-4 text-xs font-heading font-medium bg-[#FAFAF8] border border-border-primary/50 rounded-xl focus:outline-none focus:border-brand-accent transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-heading font-extrabold tracking-wider text-brand-text-muted uppercase mb-1.5">Email Address</label>
                        <input 
                          type="email" 
                          value={currentUser.email}
                          disabled
                          className="w-full h-11 px-4 text-xs font-heading font-medium bg-[#EAE8E4]/30 border border-border-primary/50 rounded-xl disabled:opacity-75 cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-heading font-extrabold tracking-wider text-brand-text-muted uppercase mb-1.5">Mobile Number</label>
                        <input 
                          type="tel" 
                          value={editPhone}
                          onChange={(e) => setEditPhone(e.target.value.replace(/[^0-9]/g, ''))}
                          className="w-full h-11 px-4 text-xs font-heading font-medium bg-[#FAFAF8] border border-border-primary/50 rounded-xl focus:outline-none focus:border-brand-accent transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-heading font-extrabold tracking-wider text-brand-text-muted uppercase mb-1.5">Member Since</label>
                        <p className="flex items-center h-11 px-4 text-xs font-heading font-bold text-slate-500 bg-[#EAE8E4]/30 border border-border-primary/50 rounded-xl">
                          {currentUser.createdAt}
                        </p>
                      </div>
                    </div>
                    <button 
                      type="submit"
                      className="px-6 py-3 bg-[#111111] text-white text-[9px] font-heading font-extrabold tracking-widest uppercase rounded-lg hover:bg-brand-accent transition-all duration-300 shadow-md focus:outline-none"
                    >
                      Save Changes
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 2: ORDER HISTORY */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <div className="border-b border-border-primary/50 pb-3">
                    <h2 className="font-heading text-sm font-extrabold tracking-widest uppercase">
                      My Orders History
                    </h2>
                  </div>
                  
                  {/* Empty state simulation */}
                  <div className="p-8 text-center border border-dashed border-border-primary rounded-2xl bg-[#FAFAF8]/50">
                    <ClipboardList size={28} className="mx-auto text-slate-300 mb-3" />
                    <p className="text-xs text-brand-text-muted font-heading font-bold uppercase tracking-wider">No Orders Placed Yet</p>
                    <p className="text-[11px] text-slate-400 mt-1 font-body">Browse our catalog to make your first purchase</p>
                    <Link to="/shop" className="inline-block mt-4 px-6 py-2.5 bg-[#111111] text-white text-[9px] font-heading font-extrabold tracking-widest uppercase rounded-lg hover:bg-brand-accent transition-colors duration-300 shadow-sm">
                      Start Shopping
                    </Link>
                  </div>
                </div>
              )}

              {/* TAB 3: SAVED ADDRESSES */}
              {activeTab === 'addresses' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-border-primary/50 pb-3">
                    <h2 className="font-heading text-sm font-extrabold tracking-widest uppercase">
                      Saved Shipping Addresses
                    </h2>
                    {!showAddressForm && (
                      <button 
                        onClick={() => {
                          clearAddressForm()
                          setShowAddressForm(true)
                        }}
                        className="text-[9px] font-heading font-extrabold tracking-widest text-brand-accent hover:underline uppercase"
                      >
                        + Add Address
                      </button>
                    )}
                  </div>

                  {/* Add / Edit Address form inline */}
                  {showAddressForm && (
                    <form onSubmit={handleAddOrEditAddress} className="border border-border-primary/50 p-6 rounded-2xl bg-[#FAFAF8] space-y-4">
                      <h3 className="font-heading text-xs font-extrabold tracking-wider uppercase text-slate-600">
                        {editingAddressId ? 'Edit Address' : 'New Address'}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[8px] font-heading font-extrabold tracking-wider text-brand-text-muted uppercase mb-1">Address Label</label>
                          <select 
                            value={addressLabel} 
                            onChange={(e) => setAddressLabel(e.target.value)}
                            className="w-full h-10 px-3 text-xs font-heading font-medium bg-white border border-border-primary/50 rounded-xl focus:outline-none focus:border-brand-accent"
                          >
                            <option value="Home">Home</option>
                            <option value="Office">Office</option>
                            <option value="Warehouse">Warehouse</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[8px] font-heading font-extrabold tracking-wider text-brand-text-muted uppercase mb-1">Contact Phone</label>
                          <input 
                            type="tel" 
                            value={addressPhone}
                            onChange={(e) => setAddressPhone(e.target.value.replace(/[^0-9]/g, ''))}
                            placeholder="Recipient contact phone"
                            className="w-full h-10 px-3 text-xs font-heading font-medium bg-white border border-border-primary/50 rounded-xl focus:outline-none"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-[8px] font-heading font-extrabold tracking-wider text-brand-text-muted uppercase mb-1">Street Address</label>
                          <input 
                            type="text" 
                            value={addressLine}
                            onChange={(e) => setAddressLine(e.target.value)}
                            placeholder="Flat/House no, building, street, area details"
                            className="w-full h-10 px-3 text-xs font-heading font-medium bg-white border border-border-primary/50 rounded-xl focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-heading font-extrabold tracking-wider text-brand-text-muted uppercase mb-1">City</label>
                          <input 
                            type="text" 
                            value={addressCity}
                            onChange={(e) => setAddressCity(e.target.value)}
                            placeholder="e.g. Ludhiana"
                            className="w-full h-10 px-3 text-xs font-heading font-medium bg-white border border-border-primary/50 rounded-xl focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-heading font-extrabold tracking-wider text-brand-text-muted uppercase mb-1">State</label>
                          <input 
                            type="text" 
                            value={addressState}
                            onChange={(e) => setAddressState(e.target.value)}
                            placeholder="e.g. Punjab"
                            className="w-full h-10 px-3 text-xs font-heading font-medium bg-white border border-border-primary/50 rounded-xl focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-heading font-extrabold tracking-wider text-brand-text-muted uppercase mb-1">PIN / ZIP Code</label>
                          <input 
                            type="text" 
                            value={addressZip}
                            onChange={(e) => setAddressZip(e.target.value.replace(/[^0-9]/g, ''))}
                            placeholder="6-digit ZIP code"
                            className="w-full h-10 px-3 text-xs font-heading font-medium bg-white border border-border-primary/50 rounded-xl focus:outline-none"
                          />
                        </div>

                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="addressIsDefault"
                            checked={addressIsDefault}
                            onChange={(e) => setAddressIsDefault(e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300 text-brand-accent focus:ring-brand-accent"
                          />
                          <label htmlFor="addressIsDefault" className="ml-2 text-[9px] font-heading font-bold uppercase tracking-wider text-brand-text-muted cursor-pointer">
                            Set as Default Address
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <button 
                          type="submit"
                          className="px-5 py-2.5 bg-[#111111] text-white text-[9px] font-heading font-extrabold tracking-widest uppercase rounded-lg hover:bg-brand-accent transition-colors duration-300"
                        >
                          {editingAddressId ? 'Save Address' : 'Add Address'}
                        </button>
                        <button 
                          type="button" 
                          onClick={clearAddressForm}
                          className="px-5 py-2.5 border border-border-primary/60 text-slate-500 text-[9px] font-heading font-extrabold tracking-widest uppercase rounded-lg hover:bg-bg-secondary transition-colors duration-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}

                  {/* List Addresses */}
                  {currentUser.addresses.length === 0 ? (
                    <div className="p-8 text-center border border-dashed border-border-primary rounded-2xl bg-[#FAFAF8]/50">
                      <MapPin size={28} className="mx-auto text-slate-300 mb-3" />
                      <p className="text-xs text-brand-text-muted font-heading font-bold uppercase tracking-wider">No Addresses Saved</p>
                      <p className="text-[11px] text-slate-400 mt-1 font-body">Save shipping addresses for faster checkouts</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {currentUser.addresses.map((addr) => (
                        <div 
                          key={addr.id}
                          className="border border-border-primary/60 p-5 rounded-2xl space-y-3 relative group hover:border-brand-accent/30 transition-colors flex flex-col justify-between"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between border-b border-border-primary/40 pb-2">
                              <span className="text-[9px] font-heading font-extrabold tracking-widest text-brand-accent uppercase bg-[#FAFAF8] px-2.5 py-1 rounded-sm">
                                {addr.label}
                              </span>
                              {addr.isDefault && (
                                <span className="text-[8px] font-heading font-extrabold tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-xs font-body font-medium text-brand-text-muted leading-relaxed">
                              {addr.addressLine}, {addr.city}, {addr.state} - {addr.zip}
                            </p>
                            <p className="text-[10px] font-heading font-bold text-slate-500">
                              📞 {addr.phone}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-border-primary/30 mt-3">
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleEditAddressClick(addr)}
                                className="text-[9px] font-heading font-bold text-slate-400 hover:text-brand-text transition-colors uppercase"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => handleDeleteAddress(addr.id)}
                                className="text-[9px] font-heading font-bold text-red-400 hover:text-red-600 transition-colors uppercase"
                              >
                                Delete
                              </button>
                            </div>
                            {!addr.isDefault && (
                              <button 
                                onClick={() => handleSetDefaultAddress(addr.id)}
                                className="text-[9px] font-heading font-extrabold text-brand-accent hover:underline uppercase"
                              >
                                Set Default
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: WISHLIST */}
              {activeTab === 'wishlist' && (
                <div className="space-y-6">
                  <div className="border-b border-border-primary/50 pb-3">
                    <h2 className="font-heading text-sm font-extrabold tracking-widest uppercase">
                      My Wishlist
                    </h2>
                  </div>
                  
                  {wishlist.length === 0 ? (
                    <div className="p-8 text-center border border-dashed border-border-primary rounded-2xl bg-[#FAFAF8]/50">
                      <Heart size={28} className="mx-auto text-slate-300 mb-3" />
                      <p className="text-xs text-brand-text-muted font-heading font-bold uppercase tracking-wider">Your Wishlist is Empty</p>
                      <p className="text-[11px] text-slate-400 mt-1 font-body">Save items you love here to shop them later</p>
                      <Link to="/shop" className="inline-block mt-4 px-6 py-2.5 bg-[#111111] text-white text-[9px] font-heading font-extrabold tracking-widest uppercase rounded-lg hover:bg-brand-accent transition-colors duration-300">
                        Explore Shop
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {wishlist.map((prod) => (
                        <div 
                          key={prod.id}
                          className="border border-border-primary/60 rounded-2xl overflow-hidden flex flex-col justify-between bg-[#FAFAF8]/20 group"
                        >
                          <div className="aspect-[3/4] overflow-hidden relative">
                            <img 
                              src={prod.images[0]} 
                              alt={prod.name} 
                              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                            />
                            <button 
                              onClick={() => toggleWishlist(prod)}
                              className="absolute top-3 right-3 p-2 rounded-full bg-white text-red-500 shadow-sm hover:scale-105 transition-transform"
                            >
                              <Heart size={14} className="fill-current" />
                            </button>
                          </div>
                          
                          <div className="p-4 space-y-2.5">
                            <div className="space-y-0.5">
                              <h4 className="font-heading font-extrabold text-[11px] uppercase tracking-wide truncate">{prod.name}</h4>
                              <p className="text-[11px] font-heading font-extrabold text-brand-accent">₹{prod.price.toLocaleString()}</p>
                            </div>
                            
                            <div className="flex gap-2">
                              <button 
                                onClick={() => {
                                  // Add a simulated color/size item to cart
                                  addToCart(prod, 'M', { name: 'Standard', hex: '#111111' })
                                  alert(`${prod.name} added to cart!`)
                                }}
                                className="flex-1 py-2 bg-[#111111] text-white text-[8px] font-heading font-extrabold tracking-widest uppercase rounded hover:bg-brand-accent transition-colors"
                              >
                                Move to Cart
                              </button>
                              <button 
                                onClick={() => toggleWishlist(prod)}
                                className="py-2 px-3 border border-border-primary/60 text-slate-400 hover:text-red-500 hover:border-red-500 transition-colors text-[8px] font-heading font-extrabold uppercase rounded"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: COUPONS */}
              {activeTab === 'coupons' && (
                <div className="space-y-6">
                  <div className="border-b border-border-primary/50 pb-3">
                    <h2 className="font-heading text-sm font-extrabold tracking-widest uppercase">
                      My Exclusive Coupons
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentUser.coupons.map((c, idx) => (
                      <div 
                        key={idx}
                        className="border-2 border-dashed border-brand-accent/40 p-5 rounded-2xl bg-[#FAFAF8] relative overflow-hidden flex flex-col justify-between gap-4"
                      >
                        <div className="space-y-1.5">
                          <span className="inline-block px-2.5 py-0.5 rounded bg-brand-accent text-white text-[9px] font-heading font-extrabold tracking-wide uppercase">
                            {c.discount}
                          </span>
                          <h3 className="font-heading text-base font-extrabold text-brand-text tracking-wide uppercase mt-1">
                            CODE: {c.code}
                          </h3>
                          <p className="text-xs text-brand-text-muted font-body leading-relaxed">
                            {c.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between border-t border-border-primary/40 pt-3 text-[10px] text-slate-400 font-heading font-medium">
                          <span>Expires {c.expiry}</span>
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(c.code)
                              alert(`Coupon code "${c.code}" copied to clipboard!`)
                            }}
                            className="text-brand-accent font-extrabold hover:underline uppercase"
                          >
                            Copy Code
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: NOTIFICATIONS */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-border-primary/50 pb-3">
                    <h2 className="font-heading text-sm font-extrabold tracking-widest uppercase">
                      Notifications Log
                    </h2>
                    {currentUser.notifications.length > 0 && (
                      <button 
                        onClick={() => {
                          const updatedUser = {
                            ...currentUser,
                            notifications: []
                          }
                          saveUserSession(updatedUser)
                        }}
                        className="text-[9px] font-heading font-extrabold tracking-widest text-red-500 hover:underline uppercase"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  {currentUser.notifications.length === 0 ? (
                    <div className="p-8 text-center border border-dashed border-border-primary rounded-2xl bg-[#FAFAF8]/50">
                      <Bell size={28} className="mx-auto text-slate-300 mb-3" />
                      <p className="text-xs text-brand-text-muted font-heading font-bold uppercase tracking-wider">No notifications found</p>
                      <p className="text-[11px] text-slate-400 mt-1 font-body">We will alert you here when there are updates</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {currentUser.notifications.map((note, idx) => (
                        <div 
                          key={idx}
                          className="flex items-start gap-3 border border-border-primary/50 p-4 rounded-xl bg-[#FAFAF8]/30"
                        >
                          <Bell size={14} className="text-brand-accent flex-shrink-0 mt-0.5" />
                          <p className="text-xs font-body font-medium text-brand-text-muted leading-relaxed">{note}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 7: ACCOUNT SETTINGS */}
              {activeTab === 'settings' && (
                <div className="space-y-8">
                  <div className="border-b border-border-primary/50 pb-3">
                    <h2 className="font-heading text-sm font-extrabold tracking-widest uppercase">
                      Account Settings & Security
                    </h2>
                  </div>

                  {/* Password update section */}
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault()
                      alert('Password successfully updated (simulated).')
                    }}
                    className="space-y-4 border border-border-primary/50 p-6 rounded-2xl bg-[#FAFAF8]/40 max-w-md"
                  >
                    <h3 className="font-heading text-xs font-extrabold tracking-wider uppercase text-slate-600">Update Password</h3>
                    <div>
                      <label className="block text-[8px] font-heading font-extrabold tracking-wider text-brand-text-muted uppercase mb-1">Current Password</label>
                      <input 
                        type="password"
                        placeholder="••••••••"
                        className="w-full h-10 px-3 text-xs font-heading font-medium bg-white border border-border-primary/50 rounded-xl focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] font-heading font-extrabold tracking-wider text-brand-text-muted uppercase mb-1">New Password</label>
                      <input 
                        type="password"
                        placeholder="••••••••"
                        className="w-full h-10 px-3 text-xs font-heading font-medium bg-white border border-border-primary/50 rounded-xl focus:outline-none"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="px-5 py-2.5 bg-[#111111] text-white text-[9px] font-heading font-extrabold tracking-widest uppercase rounded-lg hover:bg-brand-accent transition-colors shadow-sm"
                    >
                      Change Password
                    </button>
                  </form>

                  {/* Privacy / Delete Account */}
                  <div className="border border-red-100 p-6 rounded-2xl bg-red-50/20 max-w-md space-y-4">
                    <div>
                      <h3 className="font-heading text-xs font-extrabold tracking-wider uppercase text-red-600">Danger Zone</h3>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        Deleting your account will remove all stored personal information, wishlist records, coupons, and orders history permanently.
                      </p>
                    </div>
                    <button 
                      onClick={handleDeleteAccount}
                      className="px-5 py-2.5 bg-red-600 text-white text-[9px] font-heading font-extrabold tracking-widest uppercase rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                    >
                      Delete My Account
                    </button>
                  </div>
                </div>
              )}

            </main>
          </div>
        )}

      </div>
    </div>
  )
}

export default ProfilePage
