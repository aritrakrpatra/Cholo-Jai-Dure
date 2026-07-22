"use client";

import { createContext, useContext, useMemo, useState, useCallback } from "react";
import { useEffect } from "react";
import { useClerk, useUser } from "@clerk/nextjs";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { user: clerkUser, isLoaded } = useUser();
  const { openSignIn, openSignUp, signOut } = useClerk();
  const [error, setError] = useState(null);
  const [dbProfile, setDbProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    let active = true;

    async function syncProfile() {
      if (!isLoaded || !clerkUser) {
        if (active) {
          setDbProfile(null);
          setProfileLoading(false);
        }
        return;
      }

      if (active) {
        setProfileLoading(true);
      }

      try {
        const res = await fetch("/api/users/me", { cache: "no-store" });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load profile.");
        }

        if (active) {
          setDbProfile(data.user || null);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Failed to load profile.");
        }
      } finally {
        if (active) {
          setProfileLoading(false);
        }
      }
    }

    syncProfile();

    return () => {
      active = false;
    };
  }, [isLoaded, clerkUser]);

  const isAdmin = useMemo(() => {
    // publicMetadata is available directly on the useUser() object (no session token config needed)
    return clerkUser?.publicMetadata?.role === "admin";
  }, [clerkUser]);

  const user = useMemo(() => {
    if (!clerkUser) {
      return null;
    }

    const fullName = [clerkUser.firstName, clerkUser.lastName]
      .filter(Boolean)
      .join(" ")
      .trim();

    return {
      id: clerkUser.id,
      name: dbProfile?.name || fullName || clerkUser.username || clerkUser.primaryEmailAddress?.emailAddress || "Traveler",
      email: dbProfile?.email || clerkUser.primaryEmailAddress?.emailAddress || null,
      phoneNumber: dbProfile?.phoneNumber || clerkUser.unsafeMetadata?.phoneNumber || clerkUser.primaryPhoneNumber?.phoneNumber || null,
      gender: dbProfile?.gender || clerkUser.unsafeMetadata?.gender || null,
      dateOfBirth: dbProfile?.dateOfBirth || clerkUser.unsafeMetadata?.dateOfBirth || null,
      bookings: dbProfile?.bookingHistory || [],
      createdAt: dbProfile?.createdAt || clerkUser.createdAt,
    };
  }, [clerkUser, dbProfile]);

  const updateProfile = useCallback(async (fields) => {
    if (!clerkUser) return;

    const res = await fetch("/api/users/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to update profile.");
    }

    setDbProfile(data.user || null);

    const existing = clerkUser.unsafeMetadata || {};
    await clerkUser.update({
      unsafeMetadata: { ...existing, ...fields },
    });
  }, [clerkUser]);

  const signUp = async () => {
    try {
      setError(null);
      await openSignUp({
        redirectUrl: "/",
      });
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const login = async () => {
    try {
      setError(null);
      await openSignIn({
        redirectUrl: "/",
      });
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOut({
        redirectUrl: "/",
      });
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        loading: !isLoaded || profileLoading,
        error,
        signUp,
        login,
        logout,
        updateProfile,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
