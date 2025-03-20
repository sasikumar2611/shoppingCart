
import { useState } from "react";


const Dashboard = () => {
  const [count] = useState(0);
  // const navigate=useNavigate()

  return (
    <div>
      <h1>function</h1>
      <h1>{count}</h1>

    </div>
  );
};

export default Dashboard;
