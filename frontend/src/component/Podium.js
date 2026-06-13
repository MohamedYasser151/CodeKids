export default function Podium({ data }) {

  return (
    <div style={{ textAlign: "center" }}>

      <h2>🏆 Weekly Champions</h2>

      {data && data.length > 0 ? (
        data.map((item, index) => (
          <div key={index} style={{ margin: "10px" }}>

            {index === 0 && "🥇"}
            {index === 1 && "🥈"}
            {index === 2 && "🥉"}

            <h3>{item.name}</h3>
            <p>{item.score} points</p>

          </div>
        ))
      ) : (
        <p>No data yet</p>
      )}

    </div>
  );
}