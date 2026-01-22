// src/components/house/HouseCanvas.jsx
import Draggable from "react-draggable"

export default function HouseCanvas({ decorations, setDecorations }) {

  const updatePosition = (id, x, y) => {
    setDecorations(prev =>
      prev.map(item =>
        item.decoId === id ? { ...item, x, y } : item
      )
    )
  }

  const removeItem = (id) => {
    setDecorations(prev => prev.filter(i => i.decoId !== id))
  }

  return (
    <div className="flex-1 relative bg-gradient-to-b from-green-100 to-green-200 overflow-hidden">
      <div className="absolute inset-4 border-4 border-dashed border-green-400 rounded-xl"></div>

      {decorations.map(item => {
        const Icon = item.icon
        return (
          <Draggable
            key={item.decoId}
            defaultPosition={{ x: item.x, y: item.y }}
            onStop={(e, data) =>
              updatePosition(item.decoId, data.x, data.y)
            }
          >
            <div className="absolute cursor-move group">
              <Icon size={item.size} />
              <button
                onClick={() => removeItem(item.decoId)}
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 hidden group-hover:flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          </Draggable>
        )
      })}
    </div>
  )
}
