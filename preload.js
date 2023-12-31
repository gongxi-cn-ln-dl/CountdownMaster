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
            fs.writeFile(filePath, '{"events":[{"eventName":"2025","time":"2025-01-01"}],"window":{"width":0.125,"height":1,"left":0.875,"top":0}}', (err) => {
                if (err) {
                    console.error('Failed to create file:', err);
                } else {
                    console.log('File created successfully');
                }
            });
            return { "events": [{ "eventName": "2025", "time": "2025-01-01" }], "window": { "width": 0.125, "height": 1, "left": 0.875, "top": 0 } }
            // Throw any errors that occur during the file reading or parsing process
            // throw error;
        }
    },
});
