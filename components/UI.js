import Modal from "./UI/Modal";
import Button from "./UI/Button";
import Loading from "./UI/Loading";
import { useState } from "react";

function UI() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div
      style={{
        border: "1px solid red",
        minHeight: "100vh",
        display: "flex",
        "flex-direction": "column",
        "align-items": "center",
        gap: 30,
      }}
    >
      <h1>UI Page</h1>
      <Button onClick={handleOpenModal}>Test Modal</Button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        Test
      </Modal>
      <Loading>Chargement en cours...</Loading>
    </div>
  );
}

export default UI;
