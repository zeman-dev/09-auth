import css from '@/app/(private routes)/profile/edit/EditProfilePage.module.css';
import { getMe } from '@/lib/api/serverApi';
import Image from 'next/image';

export default async function EditProfilePage() {
  const user = await getMe();
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
              <button type="button" className={css.cancelButton}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
