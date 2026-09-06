'use client'
import css from '@/app/(private routes)/profile/edit/EditProfilePage.module.css';
import { getMe } from '@/lib/api/clientApi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default async function EditProfilePage() {

  const router = useRouter();

  const user = await getMe();

  function handleCancel(){
    router.back();
  }
  return (
    <>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <h1 className={css.formTitle}>Edit Profile</h1>

         {user !== null && user?.avatar && <Image
            loading="eager"
            src={user?.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />}

          <form className={css.profileInfo}>
            <div className={css.usernameWrapper}>
              <label htmlFor="username">Username:</label>
              <input id="username" type="text" className={css.input} />
            </div>

            <p>Email: {user?.email}</p>

            <div className={css.actions}>
              <button type="submit" className={css.saveButton}>
                Save
              </button>
              <button type="submit" className={css.cancelButton} onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
