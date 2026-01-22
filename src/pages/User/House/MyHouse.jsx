import { useState } from "react"
import { Sofa, TreePine, LampDesk } from "lucide-react"

export default function MyHouse() {
  const INVENTORY = [
    { id: 1, name: "Sofa", icon: Sofa, size: 60 },
    { id: 2, name: "Cây cảnh", icon: TreePine, size: 60 },
    { id: 3, name: "Đèn", icon: LampDesk, size: 50 }
  ]

  const [decorations, setDecorations] = useState([])
  const [dragType, setDragType] = useState(null) // 'new' hoặc 'move'
  const [movingId, setMovingId] = useState(null)

  // Bắt đầu kéo từ inventory
  const handleInventoryDragStart = (e, item) => {
    setDragType('new')
    e.dataTransfer.setData('text/plain', JSON.stringify(item))
  }

  // Bắt đầu kéo đồ vật trong nhà
  const handleItemDragStart = (e, decoId) => {
    setDragType('move')
    setMovingId(decoId)
  }

  // Cho phép thả
  const handleDragOver = (e) => {
    e.preventDefault()
  }

  // Xử lý thả
  const handleDrop = (e) => {
    e.preventDefault()
    
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - 32
    const y = e.clientY - rect.top - 32

    if (dragType === 'new') {
      // Thêm mới từ inventory
      const data = e.dataTransfer.getData('text/plain')
      if (data) {
        const item = JSON.parse(data)
        setDecorations(prev => [
          ...prev,
          {
            ...item,
            decoId: Date.now() + Math.random(),
            x: x,
            y: y
          }
        ])
      }
    } else if (dragType === 'move' && movingId) {
      // Di chuyển đồ vật đã có
      setDecorations(prev =>
        prev.map(d =>
          d.decoId === movingId ? { ...d, x, y } : d
        )
      )
    }

    // Reset
    setDragType(null)
    setMovingId(null)
  }

  return (
    <div className="flex min-h-screen">
      {/* INVENTORY */}
      <div className="w-64 bg-white border-r p-4 shadow-lg">
        <h2 className="font-bold text-xl mb-4">🎒 Túi đồ</h2>

        <div className="grid grid-cols-2 gap-3">
          {INVENTORY.map(item => {
            const Icon = item.icon
            return (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleInventoryDragStart(e, item)}
                className="border-2 border-gray-300 p-3 rounded-lg 
                           flex flex-col items-center gap-2
                           cursor-grab active:cursor-grabbing
                           hover:bg-blue-50 hover:border-blue-400
                           transition-all duration-200"
              >
                <Icon size={40} className="text-gray-700" />
                <span className="text-xs font-medium text-center">
                  {item.name}
                </span>
              </div>
            )
          })}
        </div>

        <div className="mt-6 p-3 bg-blue-50 rounded-lg text-xs text-gray-600">
          💡 <strong>Hướng dẫn:</strong><br/>
          • Kéo từ túi vào nhà để thêm<br/>
          • Kéo đồ vật để di chuyển
        </div>
      </div>

      {/* HOUSE */}
      <div 
        className="flex-1 relative bg-gradient-to-br from-pink-100 to-purple-100"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {decorations.map(item => {
          const Icon = item.icon
          return (
            <div
              key={item.decoId}
              draggable
              onDragStart={(e) => handleItemDragStart(e, item.decoId)}
              style={{
                position: 'absolute',
                left: item.x,
                top: item.y,
                width: 64,
                height: 64
              }}
              className="flex items-center justify-center
                         cursor-move
                         hover:bg-white/30 rounded-xl
                         transition-all duration-200
                         active:scale-110"
            >
              <Icon size={item.size} className="text-gray-800 drop-shadow-lg" />
            </div>
          )
        })}

        {decorations.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center
                          text-gray-400 pointer-events-none">
            <div className="text-6xl mb-4">🏡</div>
            <div className="text-xl font-medium">
              Kéo đồ vật từ túi đồ để trang trí nhà bạn
            </div>
          </div>
        )}

        {/* Số lượng đồ vật */}
        <div className="absolute top-4 right-4 bg-white/90 px-4 py-2 rounded-full
                        shadow-lg text-sm font-medium">
          📦 {decorations.length} vật dụng
        </div>
      </div>
    </div>
  )
}