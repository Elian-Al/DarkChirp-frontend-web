import styles from "../../styles/ProfilePage/UploadProfileImage.module.css";
import { useState, useRef } from "react";
import { imageUpload } from "../../services/authService";
import useAuthStore from "../../stores/authStore";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Modal from "../UI/Modal";

const UploadProfileImage = ({ isOpen, onClose, onSuccess }) => {
    const [imageToUpload, setImageToUpload] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [uploadValidation, setUploadValidation] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const fileInputRef = useRef(null);

    const user = useAuthStore((state) => state);
    const token = user.token;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageToUpload(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleCancelClick = () => {
        setImageToUpload(null);
        setPreviewUrl(null);
        setUploadValidation({});
        onClose();
    };

    const handleConfirmClick = async () => {
        console.log("Confirm Clicked !");
        setIsLoading(true);

        const result = await imageUpload(token, imageToUpload);

        if (result.success) {
            setPreviewUrl(null);
            setImageToUpload(null);
            setUploadValidation(result.data);
            onSuccess();
        } else {
            setUploadValidation(result.data);
        }

        setIsLoading(false);
    };

    return (
        <Modal isOpen={isOpen} onClose={handleCancelClick}>
            <div className={styles.title}>
                <h4>Modifier votre photo de profil</h4>
            </div>
            <div className={styles.uploadContainer}>
                {!uploadValidation.result ? (
                    <>
                        <Input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
                        {previewUrl && <img src={previewUrl} alt="Aperçu" className={styles.avatarPreview} />}
                        <div className={styles.placeholderZone}>
                            <Button onClick={handleButtonClick}>{previewUrl ? "Modifier l'image" : "Cliquez ici pour choisir une image"}</Button>
                        </div>
                    </>
                ) : (
                    <span>{uploadValidation.message}</span>
                )}
            </div>
            <div className={styles.actionButton}>
                <Button onClick={handleCancelClick}>{uploadValidation.result ? "Fermer" : "Annuler"}</Button>
                <Button onClick={handleConfirmClick} disabled={!imageToUpload}>
                    {!isLoading ? "Confirmer" : "Upload en cours..."}
                </Button>
            </div>
        </Modal>
    );
};

export default UploadProfileImage;
