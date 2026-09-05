"use client"
import css from '@/app/(auth routes)/sign-up/sign-up.module.css';
import { register } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function signUp() {
   const router = useRouter();
  const [error, setError] = useState('');
  
    async function handlesubmit(formData: FormData){
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    try {
      await register({email, password});
      router.push('/profile');
    }catch(error){
      setError(error as string);
    }
  
   }

  return (
    <>
      <main className={css.mainContent}>
        <h1 className={css.formTitle}>Sign up</h1>
        <form className={css.form} action={handlesubmit}>
          <div className={css.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className={css.input}
              required
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className={css.input}
              required
            />
          </div>

          <div className={css.actions}>
            <button type="submit" className={css.submitButton}>
              Register
            </button>
          </div>

          {error && <p className={css.error}>Error</p>}
        </form>
      </main>
    </>
  );
}
