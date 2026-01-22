export default function TraditionCard({ title, desc, image }) {
    return (
        <div className="h-[386px] bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
            <div className="h-40 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
            </div>

            <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-red-500">
                    {title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                    {desc}
                </p>
            </div>
        </div>
    );
}
