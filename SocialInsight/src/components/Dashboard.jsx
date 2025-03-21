import React from "react";
import EngagementCard from "./EngagementCard";
import UserGrowthChart from "./UserGrowthChart";
import socialData from "../data/socialData.json";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Social Media Analytics Dashboard</h2>
      <div className="row">
        {socialData.userEngagement.map((data, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <EngagementCard
              platform={data.platform}
              likes={data.likes}
              comments={data.comments}
              shares={data.shares}
            />
          </div>
        ))}
      </div>
      <UserGrowthChart data={socialData.userGrowth} />
    </div>
  );
};

export default Dashboard;
