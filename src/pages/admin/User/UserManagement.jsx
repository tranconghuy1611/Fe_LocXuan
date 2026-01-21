import React, { useEffect, useState } from "react";
import { getUsers, updateUserActive } from "../../../services/user.service";
import Pagination from "../ShopAdminPage/Pagination";

export default function UserManagement() {
  const [usersPage, setUsersPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [query, setQuery] = useState("");

  const filteredContent = (usersPage?.content || []).filter((u) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      (u.email || "").toLowerCase().includes(q) ||
      (u.fullName || "").toLowerCase().includes(q) ||
      (u.roles || []).join(" ").toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    fetchUsers(page, size);
  }, [page, size]);

  const fetchUsers = async (page, size) => {
    setLoading(true);
    setError("");
    try {
      const res = await getUsers(page, size);
      setUsersPage(res.data.data);
    } catch (err) {
      console.error(err);
      setError("Không thể tải danh sách user");
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (user) => {
    const newActive = !user.enabled;
    // optimistic update
    setUsersPage((prev) => ({
      ...prev,
      content: prev.content.map((u) =>
        u.id === user.id ? { ...u, enabled: newActive } : u
      ),
    }));

    try {
      const res = await updateUserActive(user.id, newActive);
      const updated = res.data.data;
      setUsersPage((prev) => ({
        ...prev,
        content: prev.content.map((u) => (u.id === updated.id ? updated : u)),
      }));
    } catch (err) {
      console.error(err);
      setError("Cập nhật trạng thái thất bại");
      // rollback
      setUsersPage((prev) => ({
        ...prev,
        content: prev.content.map((u) =>
          u.id === user.id ? { ...u, enabled: !newActive } : u
        ),
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Quản lý User
          </h1>
          <p className="text-slate-600 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Tổng: <span className="font-semibold text-slate-800">{usersPage?.totalElements || 0}</span> người dùng
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm theo email, tên hoặc role..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-5 py-4 pl-12 text-slate-700 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg shadow-sm">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Họ tên</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-slate-600 font-medium">Đang tải...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredContent.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <svg className="w-16 h-16 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <p className="text-slate-500 text-lg font-medium">Không tìm thấy người dùng nào</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredContent.map((u, idx) => (
                    <tr
                      key={u.id}
                      className={`hover:bg-slate-50 transition-colors ${
                        idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-mono text-slate-600 bg-slate-100 px-2 py-1 rounded">
                          {u.id}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-3 shadow-md">
                            {u.email?.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm text-slate-700 font-medium">{u.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-800 font-medium">{u.fullName}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {u.roles.map((r) => (
                            <span
                              key={r}
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-200 shadow-sm"
                            >
                              {r.replace("ROLE_", "")}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => toggleActive(u)}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all transform hover:scale-105 shadow-md ${
                            u.enabled
                              ? "bg-gradient-to-r from-green-400 to-green-500 text-white hover:from-green-500 hover:to-green-600"
                              : "bg-gradient-to-r from-red-400 to-red-500 text-white hover:from-red-500 hover:to-red-600"
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${u.enabled ? "bg-white" : "bg-white"} animate-pulse`}></span>
                          {u.enabled ? "Active" : "Disabled"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && usersPage?.totalPages > 1  && (
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
              <Pagination
                page={page}
                totalPages={usersPage?.totalPages || 0}
                onPageChange={setPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}