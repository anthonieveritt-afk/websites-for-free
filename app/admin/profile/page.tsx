import { UserProfile } from "@clerk/nextjs";

export default function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">Your Profile</h1>
        <p className="text-gray-500 mt-1">Manage your account, photo, and security settings.</p>
      </div>
      <UserProfile
        appearance={{
          elements: {
            rootBox: "w-full",
            card: "shadow-sm border border-gray-100 rounded-2xl w-full",
          },
        }}
      />
    </div>
  );
}
