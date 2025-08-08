// app/menu/profile/page.tsx

export default function ProfilePage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Profile</h1>
      <form className="space-y-8 max-w-2xl">
        <div>
          <label className="block text-base font-medium mb-2.5">Full Name</label>
          <input className="w-full border border-[#515151] px-4 py-2 rounded-md" type="text" />
        </div>
        <div>
          <label className="block text-base font-medium mb-2.5">Email Address</label>
          <input className="w-full border border-[#515151] px-4 py-2 rounded-md" type="email" />
        </div>
        <button className="px-18 py-4 bg-black text-white rounded-none text-base font-bold w-full lg:w-fit">Update Profile</button>
      </form>
    </div>
  );
}
