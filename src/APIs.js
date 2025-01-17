import { Public } from "@mui/icons-material";

// Define a class to hold API URLs
class ApiUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000/api/v1'
        this.endpoints = {
            getTeachers: `${this.baseUrl}/teachers`,
            getCreate: `${this.baseUrl}/`,
            getAllSessions:`${this.baseUrl}/sessions`,
            
            // Add more endpoints as needed
        };
    }

    // Method to get a specific API URL
    getUrl(endpointName) {
        return this.endpoints[endpointName];
    }
}

// Export the class
export default ApiUrls;