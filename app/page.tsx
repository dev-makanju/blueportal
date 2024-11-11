"use client";
import Tab from "@/components/Tabs/tab";
import { TABS_OPTION , STUDENT_TABS_OPTION } from "@/utils/constant";
import { useUserStore } from "@/store/useUserStore";

export default function Home() {
  const { role } = useUserStore(state => state);
  return (
    <div>
        {
          role ? ( 
            <section>
              <Tab tabs={ role === 'LECTURER' ? TABS_OPTION :  STUDENT_TABS_OPTION }/>
            </section>
          ): null
        }
    </div>
  );
}
