'use client'
import css from '@/(auth routes)/sign-in/sign-in.module.css';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function signIn(){
  const [error, setError] = useState('');
  const [loading, setLoading] = useState();

  async function handlesubmit(formData: FormData){
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
 }

 const router = useRouter();

    return(
        <><main className={css.mainContent}>
 <form className={css.form}>
    <h1 className={css.formTitle}>Sign in</h1>

    <div className={css.formGroup}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" className={css.input} required />
    </div>

    <div className={css.formGroup}>
      <label htmlFor="password">Password</label>
      <input id="password" type="password" name="password" className={css.input} required />
    </div>

    <div className={css.actions}>
      <button type="submit" className={css.submitButton} onClick={() => handlesubmit}>
        Log in
      </button>
    </div>
        {error && <p className={css.error}>{error}</p>}
  </form>
</main>
</>
    )
}