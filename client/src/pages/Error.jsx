import { useRouteError } from "react-router-dom"; // Importing useRouteError hook from react-router-dom

// ErrorPage component to display error message
export default function ErrorPage() {
  const error = useRouteError(); // Retrieving error object from useRouteError hook
  console.log(error); // Logging error object to the console

  // Rendering error page with error message
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i> {/* Displaying error status text or message */}
      </p>
    </div>
  );
}
