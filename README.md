# Mobile Bank Management System

## Overview
The **Mobile Bank Management System** is a web-based application that allows merchants to manage their banking transactions efficiently. The system enables merchants to create accounts, log in securely, transfer money between authorized merchants, and track transaction history.

## Features
- **Merchant Registration**: Merchants can create an account.
- **Secure Authentication**: Authorized merchants can log in using JWT-based authentication.
- **Money Transfer**: Authorized merchants can transfer money to other authorized merchants.
- **Transaction History**: Merchants can view and filter transaction history by date.
- **Downloadable Reports**: Merchants can download transaction history.
- **Chart Representation**: Merchants can view sent receipts in a graphical chart.

## Technologies Used
- **Backend**: [NestJS](https://nestjs.com/) (Node.js framework for scalable applications)
- **Frontend**: [Next.js](https://nextjs.org/) (React-based framework for server-side rendering and static site generation)
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Token) for secure authentication

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js (v16 or later)
- PostgreSQL
- npm or yarn

### Backend Setup (NestJS)
1. Clone the repository:
   ```sh
   git clone https://github.com/amirhossainalif/Mobile_Bank_Management_System.git
   cd Mobile_Bank_Management_System/backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npm run start
   ```

### Frontend Setup (Next.js)
1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## Usage
1. Visit `http://localhost:3000` in your browser.
2. Register as a merchant and log in.
3. Transfer money to other authorized merchants.
4. View and download transaction history.
5. Check transaction summaries in the chart view.


## Contributors
- Md. Amir Hossain Alif - [GitHub Profile](https://github.com/amirhossainalif)

## Contact
For any inquiries, feel free to reach out:
- Email: amirhossainalif1@gmail.com

