module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  // We can now toggle the dark mode class
  darkMode: "class",
  //
  theme: {
    extend: {
      backgroundImage: {
        "bg-light": "url('/src/assets/light.png')",
        "bg-dark": "url('/src/assets/dark.png')",
      },
      boxShadow: {
        // Neumorphism shadows for light mode & dark mode
        neo: "-5px -5px 10px #ffffff, 5px 5px 10px rgba(55, 84, 170, 0.4)",
        neoInput: "-5px -5px 10px #FFFFFF, 5px 5px 10px rgba(55, 84, 170, 0.1)",
        neoDark: "5px 5px 10px #000000, -5px -5px 10px rgba(20, 21, 24, 0.4)",
        neoDarkInput: "5px 5px 10px #000000, -5px -5px 10px rgba(20, 21, 24, 0.1);",
        //
      },
    },
    fontFamily: {
      // Add custom font families
      orbitron: ["Orbitron"],
      display: ["Display", "sans-serif"],
      //
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    // ...
  ],
};
