import React, { createContext, useContext, useState, useEffect } from 'react';
import { signUp, signIn, signOut, getCurrentUser, getTrialInfo, markAsPaid } from '../../modules/auth/auth.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [trial, setTrial] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshTrial = () => {
    setTrial(getTrialInfo());
  };

  useEffect(() => {
    // On mount, check if there's a logged-in user in localStorage/Firebase
    const checkUser = async () => {
      try {
        const u = await getCurrentUser();
        if (u) {
          setUser(u);
          setTrial(getTrialInfo());
        }
      } catch (err) {
        console.warn('Auth check failed:', err);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const login = async (credentials) => {
    const u = await signIn(credentials);
    setUser(u);
    setTrial(getTrialInfo());
    return u;
  };

  const register = async (userData) => {
    const u = await signUp(userData);
    setUser(u);
    setTrial(getTrialInfo());
    return u;
  };

  const logout = async () => {
    await signOut();
    setUser(null);
    setTrial(null);
  };

  const payAndUnlock = async (paymentId) => {
    await markAsPaid(paymentId);
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setTrial(getTrialInfo());

    // Trigger confirmation emails asynchronously
    try {
      fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: currentUser.email,
          name: currentUser.name,
          whatsapp: currentUser.whatsapp || 'N/A',
          paymentId: paymentId
        })
      }).catch(err => console.warn('Email API trigger error:', err));
    } catch (e) {
      console.warn('Email trigger request failed:', e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, trial, loading, login, register, logout, payAndUnlock, refreshTrial }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
