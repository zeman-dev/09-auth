import css from "@/app/(private routes)/profile/ProfilePage.module.css";
import { getMe } from "@/lib/api/serverApi";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Profile Page',
  description:
    'Your profile page',
  openGraph: {
    type: 'website',
    title: 'Profile Page',
    description:
      'Your profile page',
    url: 'https://notehub.com/',
    images: [
      { url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
          height: 630,
          alt: 'App Improvements',
      },
      
    ],
  },
};

export default async function ProfilePage(){
  const user = await getMe();
    return(
        <main className={css.mainContent}>
  <div className={css.profileCard}>
      <div className={css.header}>
	     <h1 className={css.formTitle}>Profile Page</h1>
	     <Link href="/profile/edit" className={css.editProfileButton}>
	       Edit Profile
	     </Link>
	   </div>
     {user?.avatar && <div className={css.avatarWrapper}>
      <Image
        loading="eager"
        src={user.avatar}
        alt="User Avatar"
        width={120}
        height={120}
        className={css.avatar}
      />
    </div>}
    <div className={css.profileInfo}>
      <p>
        Username: {user?.username}
      </p>
      <p>
        Email: {user?.email}
      </p>
    </div>
  </div>
</main>

    )
}