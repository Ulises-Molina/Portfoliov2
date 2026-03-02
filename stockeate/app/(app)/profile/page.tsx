import PasswordForm from "@/components/profile/password-form"
import StoreNameForm from "@/components/profile/store-name-form"

function ProfilePage() {
  return (
    <div className="space-y-6">
      <StoreNameForm />
      <PasswordForm />
    </div>
  )
}

export default ProfilePage
