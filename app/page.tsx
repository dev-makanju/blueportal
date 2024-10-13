"use client";
import Tab from "@/components/Tabs/tab";
import { TABS_OPTION } from "@/utils/constant";

export default function Home() {
  return (
    <section>
      <Tab tabs={TABS_OPTION}/>
    </section>
  );
}
