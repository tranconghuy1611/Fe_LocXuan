import FeatureCard from "../../../components/Home/FeatureCard";
import Reveal from "../../../components/Reveal/Reveal";
import { activityCards } from "../../../constrant/activityCards";

export default function ActivitiesPage() {
  return (
    <div className="bg-[#FFF5F5] min-h-screen">

      <section className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <Reveal effect="fade-up">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold">
              🎊 Hoạt động Tết 2026
            </h1>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Trải nghiệm trọn vẹn không khí Tết truyền thống và hiện đại
              thông qua các hoạt động tương tác hấp dẫn.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {activityCards.map((card, i) => (
            <Reveal key={i} effect="fade-up" delay={i * 100}>
              <FeatureCard {...card} />
            </Reveal>
          ))}
        </div>
      </section>

    </div>
  );
}
