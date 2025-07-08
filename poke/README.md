# 🧩 PokéRiddle Quest 🎒🌍

A location-based Pokémon-themed web game where players must **reach real-world coordinates** to unlock and solve riddles, guided by none other than **Professor Oak** himself.

> _"It’s dangerous to go alone. Take this... voice-guided encouragement."_  
> — Professor Oak (probably)

---

## 🚀 Features

- 🗺️ **Live GPS tracking** — Uses your device's live location to guide you toward a hidden Poké-destination.
- 🤖 **Professor Oak dialog** — Click to hear Professor Oak speak as you progress!
- 🔉 **Background music and volume control** — Game audio fully customizable to set the perfect journey mood.
- 🌅 **Dynamic themes** — Switch between morning and evening background styles.
- ❓ **Riddles at your destination** — Once you're at the spot, test your wits and unlock your Pokémon!

---

## 📦 Tech Stack

- **Next.js** 15
- **Tailwind CSS** for styling
- **Zustand** for state management
- **HTML Geolocation API** for live location tracking
- **Web Speech API** for voice feedback
- **Modular Components**: Reusable React components for dialogs, riddle generation, background music, etc.

---

## 🔌 APIs Used

| API                     | Purpose                                              |
|-------------------------|------------------------------------------------------|
| 🧠 **Riddle API**        | To generate the riddles for players to solve         |
| 😂 **Joke API**          | To sprinkle humor or serve as bonus Professor lines  |
| 🌐 **Google Maps API**   | To render maps showing user and target locations     |
| 🧭 **Web Geolocation API** | To fetch the live location of the player’s device   |
| 🧍‍♂️ **Pokémon API**       | To fetch Pokémon images, data, and names             |
| 🗣️ **Web Speech API**     | To make Professor Oak talk out loud (because why not?)|

---

## 📸 Screenshots

| Professor Oak Dialog | Live Location Tracking | Riddle UI |
|----------------------|------------------------|-----------|
| ![oak](./public/oak.png) | ![map](./public/maps.png) | ![riddle](./public/riddle.png) |

---

## 📍 Gameplay Flow

1. **Get Your Location** – Let the app detect your current location.
2. **Find the Target** – Move towards the mystery destination shown on the map.
3. **Professor Oak Speaks** – Get periodic encouragement or instructions.
4. **Unlock the Riddle** – Reach your target to unlock a riddle.
5. **Solve & Catch** – Solve it right and catch your assigned Pokémon.

---
deployment link: <a>https://pika-cool-git-main-praptis-projects-e22f758c.vercel.app/</a>
