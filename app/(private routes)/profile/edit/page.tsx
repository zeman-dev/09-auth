'use client';
import css from '@/app/(private routes)/profile/edit/EditProfilePage.module.css';
import { getMe, updateMe } from '@/lib/api/clientApi';
import { useAuthUser } from '@/lib/store/authStore';
import { User } from '@/types/user';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditProfilePage() {
  const isAuth = useAuthUser(state => state.isAuthenticated);
  const setChangedUser = useAuthUser(state => state.setUser);
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!isAuth) return;
    getMe()
      .then(data => setUser(data))
      .catch(error => {
        console.error('Failed to fetch user:', error);
      });
  }, [isAuth]);

  function handleCancel() {
    router.back();
  }

  async function changeUserData(formData: FormData) {
    if (user) {
    const changedUsername = formData.get('username') as string;
    const updatedUser = { ...user, username: changedUsername };
    setUser(updatedUser);
      setChangedUser(updatedUser);
      try {
        await updateMe({username : changedUsername});
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  }
  return (
    <>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <h1 className={css.formTitle}>Edit Profile</h1>

          {user !== null && user?.avatar && (
            <Image
              loading="eager"
              src={user?.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          )}

          <form className={css.profileInfo} action={changeUserData}>
            <div className={css.usernameWrapper}>
              <label htmlFor="username">Username:</label>
              <input id="username" name="username" type="text" className={css.input} defaultValue={user?.username}/>
            </div>

            <p>Email: {user?.email}</p>

            <div className={css.actions}>
              <button type="submit" className={css.saveButton}>
                Save
              </button>
              <button
                type="button"
                className={css.cancelButton}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
