export default function SocialLogin() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button className="flex items-center justify-center px-4 py-3 border-2 rounded-xl hover:bg-red-50">
        <span className="text-sm font-medium">Google</span>
      </button>
      <button className="flex items-center justify-center px-4 py-3 border-2 rounded-xl hover:bg-blue-50">
        <span className="text-sm font-medium">Facebook</span>
      </button>
    </div>
  );
}
