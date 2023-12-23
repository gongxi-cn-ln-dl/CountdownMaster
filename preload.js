const { contextBridge } = require('electron');
const fs = require('fs');

// Expose fs to the renderer process
contextBridge.exposeInMainWorld('fs', {
    // Function to read and parse a JSON file synchronously
    readFileSync: (filePath, encoding) => {
        try {
            // Read the file synchronously
            const data = fs.readFileSync(filePath, encoding);
            // Parse the data as JSON
            return JSON.parse(data);
        } catch (error) {
            // Throw any errors that occur during the file reading or parsing process
            throw error;
        }
    },
});
