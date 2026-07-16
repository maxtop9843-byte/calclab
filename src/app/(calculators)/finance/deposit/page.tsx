import { permanentRedirect } from "next/navigation";

export default function DepositRedirectPage() {
  return permanentRedirect("/ko/finance/fixed-deposit");
}
