import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="mt-4 text-lg">Trang không tồn tại</p>

      <Link to="/home" className="mt-6 text-blue-500 underline">
        Về trang chủ
      </Link>
    </div>
  );
}
