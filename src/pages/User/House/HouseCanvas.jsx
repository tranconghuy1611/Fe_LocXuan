import Draggable from "react-draggable"
import { X } from "lucide-react"

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
    <div className="flex-1 relative overflow-hidden"
         style={{
           backgroundImage: "url(/house.jpg)",
           backgroundSize: "cover"
         }}
    >
      {decorations.map(item => (
        <Draggable
          key={item.decoId}
          defaultPosition={{ x: item.x, y: item.y }}
          onStop={(e, data) =>
            updatePosition(item.decoId, data.x, data.y)
          }
        >
          <div className="absolute cursor-move group">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg shadow-lg"
            />

            <button
              onClick={() => removeItem(item.decoId)}
              className="absolute -top-2 -right-2 bg-red-600 text-white
                         w-5 h-5 rounded-full hidden group-hover:flex
                         items-center justify-center"
            >
              <X size={12} />
            </button>
          </div>
        </Draggable>
      ))}
    </div>
  )
}
