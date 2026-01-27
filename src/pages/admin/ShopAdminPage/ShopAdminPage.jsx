import { useEffect, useState } from "react";
import { getShopItems, createShopItem, updateShopItem, disableShopItem, getShopAdminItems } from "../../../services/shop.service";
import { Plus, Pencil, Trash2 } from "lucide-react";
import ShopItemModal from "./ShopItemModal";
import Pagination from "./Pagination";
const categoryLabel = {
    AVATAR: "Avatar",
    STICKER: "Sticker",
    FRAME: "Khung ảnh",
    LANTERN: "Đèn lồng",
    FLOWER: "Hoa",
};

export default function ShopAdminPage() {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);


    useEffect(() => {
        fetchItems();
    }, [page]);

    const fetchItems = async () => {
        setLoading(true);
        try {
            const res = await getShopAdminItems({ page, size: 10 });
            const data = res.data.data;
            setItems(data.content);
            setTotalPages(data.totalPages);

        } finally {
            setLoading(false);
        }
    };

    const handleDisable = async (id) => {
        if (!confirm("Disable sản phẩm này?")) return;
        await disableShopItem(id);
        fetchItems();
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Quản lý Shop</h1>
                <button
                    onClick={() => {
                        setEditingItem(null);
                        setOpenModal(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                    <Plus size={16} />
                    Thêm sản phẩm
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3">ID</th>
                            <th className="p-3">Ảnh</th>
                            <th className="p-3 text-left">Tên</th>
                            <th className="p-3">Danh mục</th>
                            <th className="p-3">Giá</th>
                            <th className="p-3">Trạng thái</th>
                            <th className="p-3">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id} className="border-t">
                                <td className="p-3 text-center">{item.id}</td>

                                <td className="p-3">
                                    <img
                                        src={item.imageUrl}
                                        className="w-12 h-12 object-contain mx-auto"
                                    />
                                </td>

                                <td className="p-3 font-medium">{item.name}</td>

                                <td className="p-3 text-center">
                                    {categoryLabel[item.category]}
                                </td>

                                <td className="p-3 text-center text-yellow-600 font-semibold">
                                    {item.price.toLocaleString()} đ
                                </td>

                                <td className="p-3 text-center">
                                    {item.active === false ? (
                                        <span className="text-red-500">Disabled</span>
                                    ) : (
                                        <span className="text-green-600">Active</span>
                                    )}
                                </td>

                                <td className="p-3 flex justify-center gap-2">
                                    <button
                                        onClick={() => {
                                            setEditingItem(item);
                                            setOpenModal(true);
                                        }}
                                        className="p-2 hover:bg-gray-100 rounded"
                                    >
                                        <Pencil size={16} />
                                    </button>

                                    <button
                                        onClick={() => handleDisable(item.id)}
                                        className="p-2 hover:bg-red-100 rounded text-red-500"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {loading && (
                    <div className="p-4 text-center text-gray-500">Đang tải...</div>
                )}
            </div>

            {/* Pagination */}
            <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />


            {openModal && (
                <ShopItemModal
                    editingItem={editingItem}
                    onClose={() => setOpenModal(false)}
                    onSuccess={fetchItems}
                />
            )}
        </div>
    );
}
