import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-red-600">403</h1>
      <p className="mt-4 text-lg">Bạn không có quyền truy cập trang này</p>

      <Link to="/trangchu" className="mt-6 text-blue-500 underline">
        Quay về trang chủ
      </Link>
    </div>
  );
}
