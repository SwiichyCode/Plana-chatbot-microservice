# Chatbot Microservice with Redis & PostgreSQL

## 📌 Overview
This microservice is designed to handle chatbot interactions efficiently by leveraging **Redis** for caching and **PostgreSQL** for persistent storage. The architecture ensures quick responses while maintaining a reliable conversation history.

## 🏗️ Architecture
The chatbot service follows a **Producer-Consumer pattern** to achieve high performance and scalability:

1. **Fast response**: Chat history is **temporarily stored in Redis** for quick retrieval.
2. **Asynchronous persistence**: Each message is **queued in Redis** for background storage.
3. **Worker process**: A background **worker listens to Redis** and saves conversations into **PostgreSQL**.

### 📂 Project Structure
```
📂 chatbot-service/
├── 📂 src/
│   ├── 📂 config/       # Configuration (Redis, OpenAI, PostgreSQL)
│   ├── 📂 controllers/  # Business logic for handling requests
│   ├── 📂 services/     # Services (Chat handling, database operations)
│   ├── 📂 workers/      # Background worker for PostgreSQL storage
│   ├── 📂 models/       # Sequelize models for PostgreSQL
│   ├── app.js          # Express app configuration
│   ├── server.js       # Main server entry point
│   ├── worker.js       # Worker process for persisting conversations
├── .env
├── package.json
```

## 🚀 Installation & Setup
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-repo/chatbot-service.git
cd chatbot-service
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file with the following configuration:
```env
PORT=4000
OPENAI_API_KEY=your_openai_api_key
REDIS_HOST=localhost
REDIS_PORT=6379
PG_HOST=localhost
PG_USER=your_pg_user
PG_PASSWORD=your_pg_password
PG_DATABASE=your_pg_database
EXPIRATION_TIME=1800
```

### 4️⃣ Start the Services
Start the **chatbot API**:
```bash
npm run start
```
Start the **worker for database persistence**:
```bash
npm run worker
```

## 🛠️ Implementation Details

### 📌 Chatbot Service (`src/services/chatService.js`)
- Stores conversation in **Redis** for quick access.
- Enqueues messages in **Redis Queue** (`chatQueue`) for background storage.
- Calls **OpenAI API** to generate responses.

### 📌 PostgreSQL Storage Worker (`src/workers/worker.js`)
- Listens to the `chatQueue` in Redis.
- Saves the conversation history to **PostgreSQL** in the background.
- Ensures persistent data storage **without affecting chatbot response time**.

## 📈 Advantages of This Architecture
✅ **High Performance**: Fast chatbot responses using **Redis cache**.
✅ **Scalability**: Background worker allows **high throughput** for message storage.
✅ **Resilience**: If PostgreSQL is down, **Redis retains messages** until it's back up.
✅ **Reliability**: Messages are stored **permanently in PostgreSQL** for long-term history.

## 🏗️ Future Enhancements
- **Dockerization**: Deploy with Docker & Kubernetes.
- **BullMQ Integration**: Replace Redis Queue with BullMQ for better job handling.
- **Multi-user Sessions**: Handle multiple active conversations more efficiently.

## 🎯 Conclusion
This chatbot microservice balances **performance, scalability, and reliability** by combining **Redis caching** with **PostgreSQL persistence**. The asynchronous **Worker pattern** ensures fast responses while keeping conversation history intact.

🚀 Ready to deploy? Let’s get started! 🔥

