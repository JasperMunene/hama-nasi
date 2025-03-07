'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MoverDash from '@/components/dashboard/Mover';
import CompanyDash from '@/components/dashboard/Company';
import Spinner from '@/components/elements/Spinner';

const HomePage = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/user', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) {
          // If not authenticated or error, redirect to login.
          router.push('/login');
          return;
        }
        const data = await res.json();
        // Assume the API returns a "role" property in the user object.
        setRole(data.role);
        // If role is null or still default ("User"), then redirect to onboarding.
        if (!data.role || data.role === 'User') {
          router.push('/onboarding');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return <Spinner />;
  }

  // At this point, role is defined and not null or 'User'.
  if (role === 'Mover') {
    return <MoverDash />;
  } else if (role === 'Moving Company') {
    return <CompanyDash />;
  } 
};

export default HomePage;
