export default function Feature({ icon, title }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-red-100 text-red-500 mb-4">
                {icon}
            </div>
            <h3 className="font-semibold">{title}</h3>
        </div>
    );
}