import { ProdErrorPage } from "../components/error-boundary/ProdErrorPage";

export default function SomethingWentWrongPage() {
  return <ProdErrorPage text="Something went wrong." canRefresh={true} />;
}
