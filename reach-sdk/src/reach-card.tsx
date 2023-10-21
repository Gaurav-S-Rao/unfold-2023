import Card from "@mui/material/Card";
import { useReachDataContext } from "./components/reach-data";

export default function ReachCard() {
  const {
    adverts,
    advertsEmpty,
    advertsError,
    advertsLoading,
    advertsValidating,
  } = useReachDataContext();
  return (
    <Card>
      <>
        <h1>Reach Card</h1>
        {adverts}
        {advertsEmpty}
        {advertsError}
        {advertsLoading}
        {advertsValidating}
      </>
    </Card>
  );
}
