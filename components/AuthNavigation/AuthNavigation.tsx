'use client';
import css from '@/components/AuthNavigation/AuthNavigation.module.css';
import { logout } from '@/lib/api/clientApi';
import { useAuthUser } from '@/lib/store/authStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AuthNavigation() {
  const isAuth = useAuthUser(state => state.isAuthenticated);
  const removeUser = useAuthUser(state => state.clearIsAuthenticated);
  const router = useRouter();

  async function hanldeLogout() {
    try {
      await logout();
      removeUser();
      router.push('/sign-in');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {isAuth && (
        <>
          {' '}
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={css.navigationLink}
            >
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>User email</p>
            <button className={css.logoutButton} onClick={hanldeLogout}>
              Logout
            </button>
          </li>
        </>
      )}
      {!isAuth && (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/sign-in"
              prefetch={false}
              className={css.navigationLink}
            >
              Login
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link
              href="/sign-up"
              prefetch={false}
              className={css.navigationLink}
            >
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
}
