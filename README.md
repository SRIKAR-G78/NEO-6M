🚀 GPS Tracking System (Full Stack Project)
📌 Overview
This project is a real-time GPS tracking system that consists of a backend server and a frontend dashboard.
It reads GPS data, processes it, and displays live location updates using WebSockets.
🎯 Features
📡 Real-time GPS data streaming
🔌 WebSocket-based communication
📍 Supports NMEA GPS format parsing
📊 Live location updates on UI
🔁 Auto-reconnect with exponential backoff
🧪 Mock GPS data support for testing
🛠️ Tech Stack
Backend
Node.js
Express.js
WebSocket (ws)
SerialPort
Frontend
React.js
JavaScript (ES6+)
CSS
🚀 Installation & Setup
1️⃣ Backend Setup
cd backend
npm install
npm start
2️⃣ Frontend Setup
cd frontend
npm install
npm start
⚙️ Configuration

Create a .env file in backend:
PORT=5000
SERIAL_PORT=/dev/ttyUSB0
BAUD_RATE=9600
📡 API Endpoints
| Method | Endpoint   | Description     |
| ------ | ---------- | --------------- |
| GET    | `/`        | Server status   |
| GET    | `/api/gps` | Latest GPS data |

🔌 WebSocket Usage
Connect:
const socket = new WebSocket("ws://localhost:5000");
Example Message:
{
  "latitude": 17.385,
  "longitude": 78.486,
  "timestamp": "2026-04-23T10:00:00Z"
}
📊 Supported GPS Formats
NMEA Example
$GPGGA,123519,4807.038,N,01131.000,E,1,08,...
Parsed Output
{
  "latitude": 48.1173,
  "longitude": 11.5167
}
🧠 How It Works
❌ WebSocket not connecting
Check backend is running
Verify correct port
❌ No GPS data
Check serial port connection
Use mock data for testing
❌ Frontend not loading
Run npm install
Check for port conflicts
📚 Code Explanatio
Backend (server.js)
📦 Module imports
⚙️ Configuration setup
📡 API routes
🔌 Serial port handling
📍 NMEA parsing logic
🌐 WebSocket server
Frontend (App.js)
📋 State management
🔗 WebSocket connection
🔁 Auto reconnect logic
🎨 UI rendering
🧪 Testing (Mock Data)

You can simulate GPS data in frontend for testing:
setInterval(() => {
  console.log("Mock GPS Data");
}, 2000);
🤝 Contribution

Feel free to fork this project and submit pull requests!
📄 License

This project is open-source and available under the MIT License.
👨‍💻 Author
https://www.linkedin.com/in/praveen-g-a11449312
