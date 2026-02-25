# 🪙 Crypto Trade Platform

A high-performance, full-stack cryptocurrency trading platform built with **Spring Boot** and **React**. This project utilizes a **microservices architecture** to handle real-time market data, secure wallet transactions, and seamless payment integration.

---

## 📌 Project Overview

The **Crypto Trade Platform** is designed for high scalability and fault isolation. By decoupling core business logic into independent services, the system ensures a clean, maintainable, and production-ready backend.

### Key Capabilities:
* **Live Market Tracking:** Fetch and monitor real-time cryptocurrency prices.
* **Portfolio Management:** Maintain a virtual wallet with simulated buy/sell operations.
* **Secure Deposits:** Integrated with **Razorpay** for verified fund additions.
* **Personalization:** Custom watchlists and user profile management.

---

## 🏗️ Architecture Overview

The application follows a distributed microservices model. Each service is built with a strictly layered structure:  
**Controller** → **Service** → **Repository**



[Image of microservices architecture diagram]


### 🔐 Microservices Breakdown

| Service | Responsibility | Key Tech |
| :--- | :--- | :--- |
| **User Service** | Registration, JWT Authentication, & RBAC. | Spring Security, JWT, MySQL |
| **Crypto Service** | External API integration & real-time market data. | REST Template/WebClient |
| **Watchlist Service** | Personalized user tracking & coin management. | JPA, MySQL |
| **Wallet Service** | Transaction history & simulated trading logic. | Hibernate, JPA |
| **Payment Service** | Razorpay order creation & signature verification. | Razorpay SDK |

---

## 📊 Market Insight Features

The **Crypto Service** integrates with industry-leading data providers (like CoinGecko) to provide users with actionable market insights:

### 🔥 Trending Coins
* **Functionality:** Discovers the most searched/trending cryptocurrencies in the last 24 hours.
* **Implementation:** Calls the `/search/trending` endpoint to surface high-momentum assets.

### 🏆 Top 50 Market Leaders
* **Functionality:** Provides a comprehensive list of the top 50 coins by market capitalization.
* **Implementation:** Uses the `/coins/markets` endpoint with pagination to ensure users see the most established and liquid assets first.

---

## 🛠️ Tech Stack

### Backend
* **Language:** Java 17
* **Framework:** Spring Boot 3.x
* **Security:** Spring Security, JWT (JSON Web Tokens)
* **Data:** Spring Data JPA, Hibernate
* **Database:** MySQL
* **Build Tool:** Maven

### Integration & Tools
* **Payment:** Razorpay API
* **External Data:** CoinGecko API
* **Testing:** Postman
* **Version Control:** Git & GitHub

---

## 🔄 API Structure (Sample Endpoints)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/crypto/top50` | Retrieve Top 50 coins by market cap |
| `GET` | `/api/crypto/trending` | Get current trending crypto assets |
| `POST` | `/api/auth/login` | Authenticate user & receive JWT |
| `POST` | `/api/watchlist/add` | Add a coin to user's watchlist |
| `POST` | `/api/wallet/deposit` | Execute deposit after payment |
| `POST` | `/api/payment/create-order` | Initialize Razorpay transaction |

---

## 💳 Payment Flow
1. **Initiate:** User selects deposit amount on the React frontend.
2. **Order:** Backend communicates with Razorpay to create a unique `Order ID`.
3. **Payment:** User completes the transaction via the Razorpay checkout overlay.
4. **Verification:** Backend validates the `razorpay_signature` to prevent fraud.
5. **Update:** Wallet balance is updated upon successful verification.

---

## 📈 Key Features

* ✅ **Microservices Architecture:** Independently deployable and scalable services.
* ✅ **Secure Authentication:** Stateless JWT-based security with BCrypt encryption.
* ✅ **Real-time Data:** Integration with external crypto market APIs.
* ✅ **Simulated Trading:** Full buy/sell lifecycle without financial risk.
* ✅ **Layered Design:** Follows Single Responsibility and Clean Code principles.

---

## 🚀 Future Enhancements
* [ ] **API Gateway:** Implementation of Spring Cloud Gateway for centralized routing.
* [ ] **Service Discovery:** Integrating Netflix Eureka for service registration.
* [ ] **Real-time Updates:** Adding WebSockets for live price tickers without refreshing.
* [ ] **Frontend:** Full React dashboard implementation (in progress).

---

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone [https://github.com/your-username/crypto-trade-platform.git](https://github.com/your-username/crypto-trade-platform.git)
