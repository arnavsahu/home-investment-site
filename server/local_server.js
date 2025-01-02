const express = require("express");
const app = require("./middleware/middleware");

const PORT = 3001;


// Start the server
app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});


