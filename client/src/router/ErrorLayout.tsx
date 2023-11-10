import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

export default function ErrorLayout() {
  const error = useRouteError() as Error;
  const navigate = useNavigate();
  if (!isRouteErrorResponse(error)) {
    return null;
  }
  return (
    <div className="flex flex-col justify-center items-center mt-[100px]">
      <h1 className="text-3xl">Oops, something went wrong!!!</h1>
      <p>Sorry, an unexpected error has occurred</p>
      <p className="text-red-500">
        <i>{error.message || error.status}</i>
      </p>
      <button
        onClick={() => navigate(-1)}
        className="rounded-md p-2 mt-2"
        style={{ backgroundColor: "#242526", color: "#C2C2C2" }}
      >
        {" "}
        Click here to go back{" "}
      </button>
    </div>
  );
}
