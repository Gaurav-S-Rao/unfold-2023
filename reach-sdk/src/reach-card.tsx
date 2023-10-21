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
        {
          <div key={adverts?.id}>
            <h2>{adverts?.title}</h2>
            <p>{adverts?.description}</p>
            <p>{adverts?.link}</p>
            <p>{adverts?.category}</p>
            <p>{adverts?.createdAt}</p>
            <p>{adverts?.updatedAt}</p>
          </div>
        }
      </>
    </Card>
  );
}
