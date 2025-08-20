import { LeftPanel } from "@/components/layout/LeftPanel";
import { css } from "../../styled-system/css";
import { CalendarPanel } from "@/components/features/calendar/CalendarPanel";
import { RightPanel } from "@/components/layout/RightPanel";
const style = css({
  display: "flex",
  height: "100vh",
  minW: "fit-content",
});
export default function Home() {
  return (
    <div className={style}>
      <LeftPanel />
      <CalendarPanel />
      <RightPanel />
    </div>
  );
}
