//Lånad av cleivas i sin helhet, bara displayar loading till datan är hämtad från firebase.
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
