import React, { useState } from "react";
import { Card, Modal } from "react-bootstrap";
import { BiBarChart } from "react-icons/bi";
import "./dashboard.css";

const UserGrowthChart = ({ data }) => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (month) => {
    setSelectedMonth(month);
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="user-growth-container">
      <h4 className="dynamic-text">User Growth Over Months</h4>
      <div className="user-growth-cards">
        {data.map((entry, index) => (
          <Card
            key={index}
            className="growth-card animate-card"
            onClick={() => handleOpenModal(entry.month)}
          >
            <Card.Body>
              <Card.Title className="dynamic-text">{entry.month}</Card.Title>
              <p className="count-number">New Users: {entry.newUsers}</p>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Modal for Chart */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedMonth} Growth Analytics</Modal.Title>
        </Modal.Header>
        <Modal.Body className="chart-container">
          <BiBarChart size={100} color="#007bff" />
          <p>Chart data coming soon...</p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserGrowthChart;
