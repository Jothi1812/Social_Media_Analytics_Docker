import React from "react";
import "./App.css";
import EngagementCard from "./components/EngagementCard";
import UserGrowthChart from "./components/UserGrowthChart"; // Corrected import
import { userEngagement, userGrowth } from "./data/socialData.json"; // Ensure this file exists

const App = () => {
  return (
    <div className="App">
      <h1>Social Media Analytics</h1>
      <div className="engagement-cards">
        {userEngagement.map((entry, index) => (
          <EngagementCard
            key={index}
            platform={entry.platform}
            likes={entry.likes}
            comments={entry.comments}
            shares={entry.shares}
          />
        ))}
      </div>

      <div className="user-growth-cards">
        <UserGrowthChart data={userGrowth} />{" "}
        {/* Pass data to the chart component */}
      </div>
    </div>
  );
};

export default App;
