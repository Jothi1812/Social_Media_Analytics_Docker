import React, { useState } from "react";
import { Card, Modal } from "react-bootstrap";
import { BiBarChart } from "react-icons/bi";
import ChartDonut from "./ChartDonut"; // Import the ChartDonut component
import "./dashboard.css";

const EngagementCard = ({ platform, likes, comments, shares }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Card onClick={handleOpenModal} className="engagement-card animate-card">
        <Card.Body>
          <Card.Title className="dynamic-text">{platform}</Card.Title>
          <p className="count-number">Likes: {likes}</p>
          <p className="count-number">Comments: {comments}</p>
          <p className="count-number">Shares: {shares}</p>
        </Card.Body>
      </Card>

      {/* Modal for Chart */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{platform} Engagement Analytics</Modal.Title>
        </Modal.Header>
        <Modal.Body className="chart-container">
          <ChartDonut likes={likes} comments={comments} shares={shares} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EngagementCard;
