const { app, connect } = require('./src/app.js');

const PORT = 3000;


app.listen(PORT, function(err) {
    if (err) {
        console.log("Error in server setup:", err);
        logError("Server startup error:", err);
    } else {
        console.log("Server is running on Port", PORT);
        logInfo("Server started on Port", PORT);
    }
});
