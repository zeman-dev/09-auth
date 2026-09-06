'use client';
import css from '@/app/(auth routes)/sign-in/sign-in.module.css';
import { ApiError } from '@/app/api/api';
import { login } from '@/lib/api/clientApi';
import { useAuthUser } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';



export default function signIn() {

const [isError, setIsError] = useState("");
const setUser = useAuthUser(state => state.setUser);
const router = useRouter();

  async function handlesubmit(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    try {
      const user = await login({ email: email, password });
      setUser(user);
      router.push('/profile');
    }catch(error){
          setIsError((error as ApiError).response?.data.error ?? (error as ApiError).message);
        }
    }

  return (
    <>
      <main className={css.mainContent}>
        <form className={css.form} action={handlesubmit}>
          <h1 className={css.formTitle}>Sign in</h1>

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
              Log in
            </button>
          </div>
          {isError && <p className={css.error}>{isError}</p>}
        </form>
      </main>
    </>
  );
}
