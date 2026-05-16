import dotenv from "dotenv";
import app from "./app.js";

import userRouter from "./routes/user.routes.js";

dotenv.config();

// routes
app.use("/api/v1/users", userRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});