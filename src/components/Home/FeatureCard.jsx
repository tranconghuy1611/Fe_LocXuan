export default function FeatureCard({ title, desc, action, image }) {
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
            <div className="h-40 relative overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/10"></div>
            </div>

            <div className="p-5">
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="text-gray-600 text-sm mt-2">{desc}</p>
                <button className="mt-4 text-red-500 font-semibold hover:underline">
                    {action}
                </button>
            </div>
        </div>
    );
}
