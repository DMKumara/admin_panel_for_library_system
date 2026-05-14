# 🎨 The Frontend (React UI)

**Welcome to the visual side of the Library Admin Panel!**

Dammika here. This folder contains all the React magic. I wanted to build an interface that isn't just functional, but also feels fast and intuitive to use. To achieve that, I ditched Create React App and went with **Vite**—if you haven't used Vite yet, you're going to love how fast it boots up.

## 📁 How I Organized the Code

I'm a big fan of keeping things tidy as a project grows. Instead of throwing everything into one giant `components` folder, I used a **Feature-Sliced Design**. 

If you look inside the `src/` folder, you'll see:
- `core/`: The absolute essentials. This is where I put the API client (`axios` config) so everything talks to the backend consistently.
- `features/`: The meat of the app. Books, Users, and the Dashboard all have their own little self-contained folders here. Makes finding things so much easier!
- `shared/`: The reusable stuff. Layouts, buttons, and topbars that get used everywhere live here.

## 🛠️ Commands You'll Need

If you're jumping in to help out or tweak the UI, here are your go-to commands:

- **Start Coding:** `npm run dev` (Starts the Vite dev server)
- **Get Ready for Production:** `npm run build` (Squishes everything into a tiny, fast bundle in the `/dist` folder)
- **Check for Mistakes:** `npm run lint` (Runs ESLint. Keep the code clean!)

*Have fun exploring the components! - Dammika*
