// src/components/house/Inventory.jsx
import { INVENTORY } from "./mockItems"

export default function Inventory({ onAdd }) {
  return (
    <div className="w-64 bg-white border-r p-4">
      <h2 className="font-bold text-lg mb-4">🎒 Túi đồ</h2>

      <div className="grid grid-cols-2 gap-3">
        {INVENTORY.map(item => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onAdd(item)}
              className="border rounded-xl p-3 hover:bg-gray-100 flex flex-col items-center"
            >
              <Icon size={item.size} />
              <span className="text-sm mt-1">{item.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
