<template>
  <div :class="['bg-cover h-screen', { dark: isDark }]">
    <div :class="['bg-bg-light dark:bg-bg-dark w-screen bg-cover h-screen grid sm:justify-center sm:items-center']">
      <!-- Calculator component -->
      <FadeInOut entry="center" exit="center" :duration="300" appear>
        <div class="bg-[#F1F3F6] dark:bg-[#141518] px-5 py-8 w-full sm:w-[397px]">
          <div class="flex justify-end">
            <!-- Light mode/Dark mode switch -->
            <div aria-label="Switch theme" title="Switch theme">
              <button @click="handleThemeChange" class="p-0.5 mb-8 active:translate-y-[3px] rounded-full bg-[#f1f3f6] dark:shadow-neoDark shadow-neo dark:bg-[#141518] focus:ring-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#1565C0] dark:text-[#F1F3F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </button>
            </div>
          </div>
          <FadeInOut entry="center" exit="center" :duration="600" appear>
            <!-- Input -->
            <div class="p-3 bg-[#f1f3f6] dark:bg-[#141518] !text-right shadow-neoInput dark:shadow-neoDarkInput mb-16 rounded-[15px]">
              <!-- <FadeInOut entry="center" exit="center" :duration="1000" appear>
              <div v-show="previousOperand" class="h-[25px] mb-3">
                <p class="px-8 text-xl text-right dark:text-white font-display">{{ previousOperand + " " + operand }}</p>
              </div>
            </FadeInOut> -->
              <input placeholder="888888888888888888" v-model="currentOperand" type="text" name="input" id="input" class="w-full px-8 py-7 bg-transparent dark:bg-[#202226] border-gray-300 dark:border-gray-100 rounded-md dark:focus:border-transparent focus:ring-indigo-[#1565C0] focus:border-[#1565C0] sm:text-2xl dark:text-white text-right font-display" />
            </div>
          </FadeInOut>

          <!-- Keyboard -->
          <FadeInOut entry="center" exit="center" :duration="800" appear>
            <div class="grid grid-cols-4 grid-rows-4 gap-3">
              <button class="button" data-all-clear>AC</button>
              <button class="button" data-operation>$</button>
              <button class="button" data-operation>%</button>
              <button class="button border-[#1565C0] text-[#1565C0]" data-operation>/</button>
              <button class="button" data-number>7</button>
              <button class="button" data-number>8</button>
              <button class="button" data-number>9</button>
              <button class="button border-[#1565C0] text-[#1565C0]" data-operation>x</button>
              <button class="button" data-number>4</button>
              <button class="button" data-number>5</button>
              <button class="button" data-number>6</button>
              <button class="button border-[#1565C0] text-[#1565C0]" data-operation>-</button>
              <button class="button" data-number>3</button>
              <button class="button" data-number>2</button>
              <button class="button" data-number>1</button>
              <button class="button border-[#1565C0] text-[#1565C0]" data-operation>+</button>
              <button class="col-span-2 button" data-number>0</button>
              <button class="button" data-number>.</button>
              <button class="button bg-[#1565C0] active:bg-[#f1f3f6] dark:active:bg-[#f1f3f6] dark:active:text-gray-800 active:text-gray-800 text-white border-3 border-[#F1F3F6] dark:!border-gray-900 dark:bg-[#1565C0]" data-equals>=</button>
            </div>
          </FadeInOut>

          <!--  -->
        </div>
      </FadeInOut>

      <!--  -->
      <SlideInOut entry="left" exit="left" :duration="800" appear>
        <!-- Gif  -->
        <div v-show="showGif" class="absolute hidden sm:block left-12 bottom-16">
          <iframe src="https://giphy.com/embed/anuMFPLssX6SI" width="320" height="270" frameBorder="0" class="hidden xl:block giphy-embed" allowFullScreen></iframe>
        </div>

        <!--  -->
      </SlideInOut>
    </div>
  </div>
</template>

<script>
import { FadeInOut, SlideInOut } from "vue3-transitions";

export default {
  name: "App",

  data: () => ({
    currentOperand: "",
    previousOperand: "",
    operand: "",
    isDark: false,
    showGif: false,
  }),

  components: { FadeInOut, SlideInOut },

  methods: {
    // Handle theme change
    handleThemeChange() {
      this.isDark = !this.isDark;
      // Set the theme preference in localStorage
      localStorage.setItem("isDark", this.isDark);
    },

    // This function handles the arithmetic operations.
    compute(operation) {
      let computation;
      const prev = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);
      if (isNaN(prev) || isNaN(current)) {
        return;
      }
      // A Switch statement to handle the different operations
      switch (operation) {
        case "+":
          computation = prev + current;
          break;
        case "-":
          computation = prev - current;
          break;
        case "x":
          computation = prev * current;
          break;
        case "/":
          computation = prev / current;
          break;
        case "%":
          computation = prev % current;
          break;
        case "$":
          computation = prev - prev * (current / 100);
          break;
        default:
          return;
      }
      // Set the currentOperand to the result of the computation and clear the rest
      this.operand = "";
      if (computation < 10 && computation > 0) {
        this.currentOperand = "🗑️";
        this.showGif = true;
        setTimeout(() => {
          this.currentOperand = "";
          this.showGif = false;
        }, 4000);
      } else {
        this.currentOperand = computation;
      }
      this.previousOperand = "";
    },

    operation(operation) {
      if (this.currentOperand === "") {
        return;
      }
      if (this.operand !== "") {
        this.compute(this.operand);
      }
      this.operand = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = "";
    },

    appendNumber(number) {
      // The operator can only add one period
      if (number === "." && this.currentOperand.includes(".")) {
        return;
      }
      if (number !== "." && isNaN(number)) {
        return;
      }
      // Append the number to the current operand. Convert to string since JS doesn't have a number type and 1 + "1" = "11"
      this.currentOperand = this.currentOperand.toString() + number.toString();
    },
  },

  mounted() {
    // Check if the user has set a theme in localStorage
    if (localStorage.getItem("isDark") === "true") {
      this.isDark = true;
    }
    // Listen to the keydown event of the input buttons
    const numberButtons = document.querySelectorAll("[data-number]");
    numberButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.appendNumber(button.innerText);
      });
    });
    // Listen to the keydown event of the operation buttons
    const operationButtons = document.querySelectorAll("[data-operation]");
    operationButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.operation(button.innerText);
      });
    });
    // Listen to the keydown event of the equals button
    const equalsButton = document.querySelector("[data-equals]");
    equalsButton.addEventListener("click", () => {
      this.compute(this.operand);
    });
    // Listen to the keydown event of the clear button and clear the current operand, previous operand and operand ,and the operator symbol
    const allClearButton = document.querySelector("[data-all-clear]");
    allClearButton.addEventListener("click", () => {
      this.currentOperand = "";
      this.previousOperand = "";
      this.operand = "";
    });
  },
};
</script>
