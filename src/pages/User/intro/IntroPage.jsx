import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  RedCurtain,
  CherryBlossom,
  FallingPetals,
  GlowingLantern,
  FloatingLuckyItems,
  Header,
  MainCard,
  WishModal,
} from "@/components/intro";
import { wishes } from "../../../constrant/wishes";

export default function IntroPage() {
  const [opened, setOpened] = useState(false);
  const [wish, setWish] = useState("");

  const openEnvelope = () => {
    setWish(wishes[Math.floor(Math.random() * wishes.length)]);
    setOpened(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <RedCurtain />
      <FallingPetals />
      <CherryBlossom side="left" />
      <CherryBlossom side="right" />
        <GlowingLantern className="left-20 top-8 " />
        <GlowingLantern className="right-20 top-8" />
      <Header />
      <FloatingLuckyItems />

      <div className="relative z-20 min-h-screen flex items-center justify-center pt-64">
        <MainCard onOpenWish={openEnvelope} />
      </div>

      <AnimatePresence>
        {opened && <WishModal wish={wish} onClose={() => setOpened(false)} />}
      </AnimatePresence>
    </div>
  );
}
