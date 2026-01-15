import "./env.loader.ts";

import { app }from "./app.ts"
import connectDB from "./config/db.ts"
import env from "./config/env.ts";

const PORT = env.PORT || 8000;

// connect to database
connectDB()
.then(() => {
    // start server
    app.listen(PORT, () => {
        console.log(`Server is running on port http://127.0.0.1:${PORT}`);
    })
})
.catch((error) => {
    console.error("Failed to connect to database", error);
})