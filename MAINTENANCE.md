# 🛠️ Maintenance & Operations Notes

**Hey there! 👋**

Dammika Madushan Kumara here. I designed and built this Library Admin Panel. 

Whether I'm looking back at this code 6 months from now, or handing it off to another developer on the team, I wanted to leave some quick, human-friendly notes on how to keep everything running smoothly. The system is built on a solid MERN stack (MongoDB, Express, React, Node.js), and I’ve structured it to be as painless to maintain as possible.

Here’s what you need to know:

---

## 🔄 Keeping Things Up-to-Date

Dependencies change fast. I recommend checking for updates every few months so we don't fall behind on security patches.

**For the Frontend (React/Vite):**
Just pop into the `frontend` folder and run:
```bash
npm outdated      # See what's old
npm update        # Bring minor versions up to speed
npm audit fix     # Let NPM fix any obvious security holes
```

**For the Backend (Node/Express):**
Same drill in the `backend` folder:
```bash
npm outdated
npm update
npm audit fix
```
> **Pro Tip from Dammika:** Always spin up both servers and click around the app after doing an update! Sometimes React or Mongoose updates can break things unexpectedly.

---

## 🗄️ Database Stuff (MongoDB Atlas)

I went with MongoDB Atlas for the database because it handles most of the heavy lifting for us. 

- **Backups:** Atlas handles automated backups, but it doesn't hurt to log in to the dashboard once in a while just to make sure they are actually running.
- **Speed:** If the app starts feeling slow when searching for books or users, it's probably time to log into Atlas and add an index to the `isbn` or `email` fields.
- **The "I can't connect" Issue:** If you suddenly get database connection errors, 99% of the time it's because your current IP address changed. Go to Atlas -> Network Access -> Add IP Address, and whitelist your new IP.

---

## 🐛 Common Hiccups You Might Hit

Even the best code has bad days. Here are the most common issues I ran into while building this, so you don't have to waste time figuring them out:

**1. "Error connecting to MongoDB"**
- Like I mentioned above, this is almost always an IP whitelist issue in Atlas. Also, double-check that your `MONGO_URI` in `backend/.env` is exactly correct.

**2. Frontend API Calls are Failing (CORS Errors)**
- If the browser console screams about CORS, it means the backend isn't trusting the frontend. Check `backend/server.js` and make sure the `cors()` middleware is still there and configured properly.

**3. "Port 5000 is already in use"**
- You probably have another Node process running in the background. Kill the terminal, or use `npx kill-port 5000` to clear it out.

---

## 🚀 Before You Deploy

When you're ready to put this live on the internet (like on Vercel and Heroku/Render):

1. **Don't share secrets:** Never commit the `.env` file to GitHub. Add those variables directly into your hosting provider's dashboard.
2. **Build it first:** For the frontend, always run `npm run build` so Vite can squish everything down into optimized files.
3. **Lock down the DB:** Once deployed, go back to MongoDB Atlas and remove the `0.0.0.0/0` (allow all) IP rule. Only allow the specific IP address of the deployed backend server. Security first!

---
*Happy coding! Keep the code clean, and don't hesitate to reach out if you get stuck.*  
*- Dammika*
