import { useParams } from "react-router-dom";
import { trpc } from "../App";
import LoadingData from "../components/LoadingData";
import ErrorData from "../components/ErrorData";
import PhoneInfo from "../components/PhoneInfo";
import { Phone as PhoneType } from "../../../common/validation";

function Phone() {
  const { id } = useParams();
  const { data, error, isLoading } = trpc.getSinglePhone.useQuery({
    id: id ?? "",
  });

  return (
    <div>
      {isLoading ? (
        <LoadingData />
      ) : error ? (
        <ErrorData />
      ) : (
        <PhoneInfo ph={data as any as PhoneType[]} />
      )}
    </div>
  );
}

export default Phone;
