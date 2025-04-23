import { ProdErrorPage } from "../components/error-boundary/ProdErrorPage";

export default function NotFoundPage() {
  return <ProdErrorPage text="Page not found." canRefresh={false} />;
}
