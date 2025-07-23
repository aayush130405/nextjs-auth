# 🚀 Auth-NextJS

A modern, full-stack authentication system built with **Next.js**, **MongoDB**, **TypeScript**, and **Mailtrap**. This project demonstrates best practices for secure user authentication, email verification, password reset, and a beautiful, responsive UI.

---

## 🛠️ Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) (App Router, React 18)
- **Backend:** Next.js API Routes
- **Database:** [MongoDB](https://www.mongodb.com/)
- **ORM:** [Mongoose](https://mongoosejs.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Email:** [Mailtrap](https://mailtrap.io/) (for development email testing)
- **Styling:** Tailwind CSS

---

## ✨ Features

- 🔒 **User Authentication** (Sign Up, Login, Logout)
- 📧 **Email Verification** (with secure token)
- 🔑 **Forgot/Reset Password** (secure, token-based)
- 👤 **User Profile** (protected route)
- 📨 **Transactional Emails** (Mailtrap integration)
- 🧑‍💻 **TypeScript** throughout for type safety
- 🎨 **Modern, Responsive UI** (Tailwind CSS)
- 🛡️ **Security Best Practices** (hashed passwords, token expiry, etc.)


---

## 🚦 Getting Started

### 1. **Clone the repository**

```bash
git clone https://github.com/aayush130405/auth-nextjs.git
cd auth-nextjs
```

### 2. **Install dependencies**

```bash
npm install
# or
yarn install
```

### 3. **Set up environment variables**

Create a `.env.local` file in the root directory and add the following:

```env
MONGODB_URI=your_mongodb_connection_string
MAILTRAP_USER=your_mailtrap_username
MAILTRAP_PASS=your_mailtrap_password
NEXTAUTH_SECRET=your_nextauth_secret
BASE_URL=http://localhost:3000
```

> _Get your MongoDB URI from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and Mailtrap credentials from [Mailtrap.io](https://mailtrap.io/)_

### 4. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 🧩 Project Structure

```
src/
  app/
    api/
      users/           # API routes for authentication
    ...
    login/             # Login page
    signup/            # Signup page
    profile/           # User profile pages
    forgotpassword/    # Forgot password page
    resetpassword/     # Reset password page
    verifyemail/       # Email verification page
  dbConfig/            # MongoDB connection
  models/              # Mongoose models
  helpers/             # Utility functions (mailer, token, etc.)
  middleware.ts        # Middleware
```

---

## 📬 Email Testing with Mailtrap

All transactional emails (verification, password reset) are sent using [Mailtrap](https://mailtrap.io/), so you can safely test email flows in development.

- Check your Mailtrap inbox to view sent emails.
- Update Mailtrap credentials in `.env.local` as needed.

---

## 🛡️ Security Notes

- Passwords are hashed with bcrypt before storage.
- Email verification and password reset use secure, time-limited tokens.
- Sensitive routes are protected and require authentication.

---

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙋‍♂️ Contact & Support

- For issues, use the [GitHub Issues](https://github.com/aayush130405/auth-nextjs/issues) page.
- For questions, reach out to [aayush130405@gmail.com](mailto:aayush130405@gmail.com).

---

> _Made with ❤️ using Next.js, MongoDB, TypeScript, and Mailtrap._
