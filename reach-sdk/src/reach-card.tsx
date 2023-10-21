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
        {adverts?.map((advert) => (
          <div key={advert?.id}>
            <h2>{advert?.title}</h2>
            <p>{advert?.description}</p>
            <p>{advert?.link}</p>
            <p>{advert?.category}</p>
            <p>{advert?.createdAt}</p>
            <p>{advert?.updatedAt}</p>
          </div>
        ))}
      </>
    </Card>
  );
}
