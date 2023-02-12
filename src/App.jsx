import { useState, useEffect } from "react";
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/public/user-data.json")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((person) => {
          person.pointsEarned = 0;
          person.monthBreakdown = [];
          person.purchases.forEach((purchase) => {
            const month = new Date(purchase.timestamp).getMonth();
            if (!person.monthBreakdown[month]) person.monthBreakdown[month] = { pointsEarned: 0, purchases: [] };
            const pointsEarned = Math.floor(purchase.amount > 100 ? 50 + (purchase.amount - 100) * 2 : purchase.amount < 50 ? 0 : purchase.amount - 50);
            person.pointsEarned += pointsEarned;
            person.monthBreakdown[month].pointsEarned += pointsEarned;
            person.monthBreakdown[month].purchases.push({...purchase, pointsEarned });
          });
        });
        setTimeout(() => setData(data), 1000);
      });
  }, []);
  return (
    <div className="App">
      {data ? (
        <ul>
          {data.map((person) => (
            <li key={person.name + "-name"}>
              {person.name} - Total Points {person.pointsEarned}
              <ol>{person.monthBreakdown.map((month, i) => month ? <li key={i}>{months[i]} {month.pointsEarned}</li> : null)}</ol>
            </li>
          ))}
        </ul>
      ) : "Loading..." }
    </div>
  );
}
export default App;