import { useParams } from "react-router-dom";
import AddNewPlaceForm from "./PlaceForm";
import PlaceList from "./PlaceList";

const Place = () => {
  const { action } = useParams();

  return (
    <div>
      {action !== "new" && <PlaceList />}
      {action === "new" && <AddNewPlaceForm />}
    </div>
  );
};

export default Place;
