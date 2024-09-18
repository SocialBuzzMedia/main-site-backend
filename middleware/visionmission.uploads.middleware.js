import multer from "multer";
import path from "path";

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/visionMission/");
    },
    filename: (req, file, cb) => {
        cb(null, `about-section-img_${Date.now()}_${file.originalname}`);
    },
});

// Initial upload middleware
const upload = multer({
    storage,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg/;
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
