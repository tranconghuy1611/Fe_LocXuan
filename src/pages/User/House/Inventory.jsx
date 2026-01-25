export default function Inventory({ inventory, onAdd }) {
  return (
    <div className="w-64 bg-white border-r p-4">
      <h2 className="font-bold text-xl mb-4">🎒 Túi đồ</h2>

      <div className="grid grid-cols-2 gap-3">
        {inventory.map(item => (
          <button
            key={item.id}
            onClick={() => onAdd(item)}
            className="border rounded-xl p-2 hover:bg-gray-100"
          >
            <img
              src={item.image}
              className="w-full h-16 object-cover rounded"
            />
            <div className="text-sm mt-1 font-medium">
              {item.name}
            </div>
            <div className="text-xs text-gray-500">
              SL: {item.quantity}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
