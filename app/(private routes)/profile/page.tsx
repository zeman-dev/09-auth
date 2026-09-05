import css from "@/app/(private routes)/profile/ProfilePage.module.css";
import Link from "next/link";


export default function ProfilePage(){
    return(
        <main className={css.mainContent}>
  <div className={css.profileCard}>
      <div className={css.header}>
	     <h1 className={css.formTitle}>Profile Page</h1>
	     <Link href="/profile/edit" className={css.editProfileButton}>
	       Edit Profile
	     </Link>
	   </div>
     <div className={css.avatarWrapper}>
      <img
        src="user_avatar"
        alt="User Avatar"
        width={120}
        height={120}
        className={css.avatar}
      />
    </div>
    <div className={css.profileInfo}>
      <p>
        Username: user_username
      </p>
      <p>
        Email: user_email
      </p>
    </div>
  </div>
</main>

    )
}