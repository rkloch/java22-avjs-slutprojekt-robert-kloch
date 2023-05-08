export default function Status({ status }) {
  return (
    <div className={status}>
      {status === "loading" ? (
        <h1>Loading...</h1>
      ) : (
        <h1>Something went wrong</h1>
      )}
    </div>
  );
}
