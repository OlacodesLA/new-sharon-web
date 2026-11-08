import { parishes } from "@/lib/parishes";
import { ParishCards } from "./ParishCards";

export function ParishDirectory() {
  return <ParishCards parishes={parishes} />;
}
