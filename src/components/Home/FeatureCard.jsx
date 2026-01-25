export default function FeatureCard({ title, desc, action, image, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white rounded-xl shadow-sm
        hover:shadow-md transition overflow-hidden"
    >
      <div className="h-40 relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover
            hover:scale-105 transition duration-500"
        />
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
