import { LeftPanel } from "@/components/layout/LeftPanel";
import { css } from "../../styled-system/css";
import { CalendarPanel } from "@/components/features/calendar/CalendarPanel";
import { RightPanel } from "@/components/layout/RightPanel";
const style = css({
  display: "flex",
  height: "100vh",
});
export default function Home() {
  return (
    <div className={style}>
      <LeftPanel
      // loading={loading}
      // selectedDate={selectedDate}
      // setSelectedDate={setSelectedDate}
      />
      <CalendarPanel
      // loading={loading}
      // selectedDate={selectedDate}
      // setSelectedDate={setSelectedDate}
      />
      <RightPanel
      // loading={loading}
      // selectedDate={selectedDate}
      // setSelectedDate={setSelectedDate}
      />
    </div>
  );
}
