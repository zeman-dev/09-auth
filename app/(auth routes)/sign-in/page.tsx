'use client'
import css from '@/app/(auth routes)/sign-in/sign-in.module.css';
import { login } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function signIn(){

 const router = useRouter();
const [error, setError] = useState('');

  async function handlesubmit(formData: FormData){
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  try {
    await login({email, password});
    router.push('/notes/filter/all');
  }catch(error){
    setError(error as string)
  }

 }

    return(
        <><main className={css.mainContent}>
 <form className={css.form} action={handlesubmit}>
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
      <button type="submit" className={css.submitButton}>
        Log in
      </button>
    </div>
        {error && <p className={css.error}>{error}</p>}
  </form>
</main>
</>
    )
}