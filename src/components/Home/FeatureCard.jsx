import { useNavigate } from "react-router-dom";

export default function FeatureCard({ title, desc, action, image, to }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(to)}
      className="cursor-pointer
 bg-white
   rounded-xl
   shadow-sm
   hover:shadow-md
   transition
   overflow-hidden
   flex flex-col
   h-full"
    >
      <div className="h-32 sm:h-36 md:h-40 lg:h-48 relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover
                     hover:scale-105 transition duration-500"
        />
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-gray-600 text-sm mt-2">{desc}</p>
        <button className="mt-auto pt-4 text-red-500 font-semibold hover:underline">
          {action}
        </button>
      </div>
    </div>
  );
}
