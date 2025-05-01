import { redirect } from "next/navigation";

export default function StatisticsIndex() {
  redirect("/statistics/customer-analysis/dashboard");
}
