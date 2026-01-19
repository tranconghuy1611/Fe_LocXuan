import { useEffect, useState } from "react";
import { getMyProfile,updateMyProfile } from "../../../services/profile";
import { Save } from "lucide-react";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    favoriteQuote: "",
    avatarUrl: "",
  });

  // Load profile
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getMyProfile();
      setProfile(data);
      setForm({
        fullName: data.fullName || "",
        favoriteQuote: data.favoriteQuote || "",
        avatarUrl: data.avatarUrl || "",
      });
    } catch (err) {
      console.error(err);
      alert("Không thể tải hồ sơ");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateMyProfile(form);
      alert("Cập nhật hồ sơ thành công");
      fetchProfile();
    } catch (err) {
      console.error(err);
      alert("Cập nhật thất bại");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-6">Đang tải hồ sơ...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Hồ sơ cá nhân</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Avatar + Info */}
        <div className="bg-white rounded-xl shadow p-6">
          <img
            src={profile.avatarUrl || "/avatar-default.png"}
            className="w-28 h-28 rounded-full object-cover mx-auto mb-4"
            alt="avatar"
          />

          <div className="text-center space-y-1">
            <p className="font-semibold text-lg">{profile.fullName}</p>
            <p className="text-sm text-gray-500">{profile.email}</p>
          </div>

          <div className="mt-4 text-sm">
            <p>
              <b>Điểm:</b>{" "}
              <span className="text-yellow-600 font-semibold">
                {profile.points.toLocaleString()}
              </span>
            </p>
          </div>
        </div>

        {/* Right: Edit form */}
        <div className="md:col-span-2 bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Cập nhật thông tin</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email (readonly) */}
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                value={profile.email}
                disabled
                className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-100 text-sm"
              />
            </div>

            {/* Full name */}
            <div>
              <label className="text-sm font-medium">Họ tên</label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg text-sm"
              />
            </div>

            {/* Favorite quote */}
            <div>
              <label className="text-sm font-medium">Câu nói yêu thích</label>
              <textarea
                name="favoriteQuote"
                value={form.favoriteQuote}
                onChange={handleChange}
                rows={3}
                className="w-full mt-1 px-4 py-2 border rounded-lg text-sm"
              />
            </div>

            {/* Avatar URL */}
            <div>
              <label className="text-sm font-medium">Avatar URL</label>
              <input
                name="avatarUrl"
                value={form.avatarUrl}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg text-sm"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <Save size={16} />
                {saving ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
