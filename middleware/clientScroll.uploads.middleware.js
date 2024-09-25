import multer from "multer";
import path from "path";

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/client-scroll/");
    },
    filename: (req, file, cb) => {
        cb(null, `client_image_${Date.now()}_${file.originalname}`);
    },
});

// Initial upload middleware
const upload = multer({
    storage,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        const mimetype = fileTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb("Error : Images Only");
        }
    },
});

export default upload;
