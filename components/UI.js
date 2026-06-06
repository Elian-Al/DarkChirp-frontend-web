import Modal from "./UI/Modal";
import Button from "./UI/Button";
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
        <div>
            <h1>UI Page</h1>
            <Button onClick={handleOpenModal}>Test Modal</Button>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                Test
            </Modal>
        </div>
    );
}

export default UI;
