<template>
  <div class="auth-overlay">
    <div>
      <intro :onAnimationFinished="showLoginForm"></intro>
    </div>
    <div :class="['auth-container', activeTab === 2 ? 'large' : (activeTab === 3 ? 'smallest' : '')]" v-if="showLogin" class="auth-container">
      <div class="auth-content">
        <div v-if="showPopup" class="popup">
          <h2>Popup Title</h2>
          <p>This is a popup!</p>
          <button @click="showPopup = false">Close</button>
        </div>
        <h2>Evolution DM</h2>
        <p v-if="activeTab !== 3" style="margin-bottom: 10px;">Добро пожаловать на сервер!<br> Войдите под свой аккаунт или создайте новый</p>
        <form @submit="submitForm" v-if="activeTab === 1">
          <div>
            <p style="margin-top: 0px" v-if="errors.username" class="error">{{ errors.username }}</p>
            <input v-model="username" type="text" placeholder="Логин">
          </div>
          <div>
            <p v-if="errors.password" class="error">{{ errors.password }}</p>
            <input v-model="password" type="password" placeholder="Пароль">
          </div>
          <div>
            <button type="submit">Войти</button>
            <button @click="activeTab = 2" type="button">Зарегистрироваться</button>
          </div>
          <p style="margin-bottom: 35px">Забыли пароль? <a @click="activeTab = 3">Востановить</a></p>
        </form>
        <div>
        </div>
        <form @submit="submitRegistrationForm" v-if="activeTab === 2">
          <div class="auth-container-register-inputs">
            <p v-if="errors.reg_username" class="error">{{ errors.reg_username }}</p>
            <input v-model="reg_username" type="text" placeholder="Логин">
          </div>
          <div>
            <p v-if="errors.email" class="error">{{ errors.email }}</p>
            <input v-model="email" type="text" placeholder="Почта">
          </div>
          <div>
            <p v-if="errors.reg_password" class="error">{{ errors.reg_password }}</p>
            <input v-model="reg_password" type="password" placeholder="Пароль">
          </div>
          <div>
            <p v-if="errors.reg_confirm_password" class="error">{{ errors.reg_confirm_password }}</p>
            <input v-model="reg_confirm_password" type="password" placeholder="Подтвердите пароль">
            <p v-if="errors.validPassword" class="error">{{ errors.validPassword }}</p>
          </div>
          <button @click="openPopup" type="button" style="width: 100%">Правила сервера</button>
          <div class="auth-container-checkmarks">
            <form>
              <div class="checkmark-container">
                <label><input v-model="is18Checked" type="checkbox" value=""/>Вам есть 18?</label>
              </div>
              <div class="checkmark-container">
                <label @click="onCheckboxClick"><input v-model="readRulesChecked" :disabled="!wasPopupOpen"
                                                       type="checkbox" value=""/>Вы прочитали правила?</label>
              </div>
              <div class="checkmark-container">
                <label><input type="checkbox" v-model="privacyChecked" value=""/>Вы согласны с политикой
                  конфиденциальности?</label>
              </div>
            </form>
          </div>
          <p style="margin-top: 0px" v-if="errors.popup" class="error">{{ errors.popup }}</p>
          <button type="submit">Зарегистрироваться</button>
          <button @click="activeTab = 1" type="button">Отмена</button>
        </form>
        <div class="restore" v-if="activeTab === 3">>
          <p>Напишите свою почту для восстановления пароля</p>
          <form @submit="submitResetPasswordForm">
            <div>
              <p v-if="errors.resetEmail" class="error">{{ errors.resetEmail }}</p>
              <input v-model="resetEmail" type="text" placeholder="Email">
            </div>
            <button type="submit">Восстановить</button>
            <button @click="activeTab = 1" type="button">Отмена</button>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Intro from '@/components/intro.vue';
import {ref, watch} from 'vue';
import {useAuthStore} from '@/stores/Authstores.js';
import router from "@/routes/routes.js";



export default {
  watch: {
    email(value) {
      this.email = value;
      this.validateEmail(value);
    },

    resetEmail(value) {
      this.resetEmail = value;
      this.validateEmail(value);
      this.errors.resetEmail = 'Введите корректную почту!';
    },

    reg_password(value) {
      this.reg_password = value;
      this.validatePassword(value)
    },

    wasPopupOpen(value) {
      if (value) {
        this.errors.popup = 'Вы не прочитали правила сервера!';
      } else {
        this.errors.popup = '';
      }
    },
  },

  components: {Intro},
  data() {
    return {
      showPopup: false,
      wasPopupOpen: false,
      is18Checked: false,
      readRulesChecked: false,
      privacyChecked: false,
      username: '',
      password: '',
      email: '',
      reg_username: '',
      reg_password: '',
      reg_confirm_password: '',
      validPassword: '',
      resetEmail: '',
      errors: {},
    };
  },
  setup() {
    const authStore = useAuthStore();
    const showLogin = ref(authStore.showLogin);
    const showPopup = ref(false);
    const username = ref(``)
    const password = ref(``)

    const showLoginForm = () => {
      authStore.setShowLogin(true);
    };

    let activeTab = ref(1);

    watch(() => authStore.showLogin, (newValue) => {
      showLogin.value = newValue;
      console.log('showLogin updated:', newValue);
    });

    const wasPopupOpen = ref(false);

    return {showLogin, showLoginForm, activeTab, showPopup, username, password, wasPopupOpen};
  },


  methods: {
    submitForm(e) {
      e.preventDefault();
      this.errors = {};

      if (!this.username) {
        console.log(1)
        this.errors.username = 'Необходим логин!';
      }

      if (!this.password) {
        console.log(2)
        this.errors.password = 'Необходим пароль!';
      }

      if (Object.keys(this.errors).length === 0) {
        this.$router.push("/chooseMenu")

      }
    },

    submitRegistrationForm(e) {
      e.preventDefault();
      this.errors = {};

      if (!this.email) {
        this.errors.email = 'Необходима почта!';
      }

      if (!this.reg_username) {
        this.errors.reg_username = 'Необходим логин!';
      }

      if (!this.reg_password) {
        this.errors.reg_password = 'Необходим пароль!';
      }

      if (!this.reg_confirm_password) {
        this.errors.reg_confirm_password = 'Необходим пароль!';
      }


      if (this.reg_password !== this.reg_confirm_password) {
        this.errors.validPassword = 'Пароли должны совпадать!';
      }

      if (!this.is18Checked || !this.readRulesChecked || !this.privacyChecked) {
        this.errors.popup = 'Необходимо отметить все чекбоксы!';
      }

      if (Object.keys(this.errors).length === 0) {
        this.$router.push("/chooseMenu")
      }
    },

    submitResetPasswordForm(e) {
      e.preventDefault();
      this.errors = {};

      if (!this.resetEmail) {
        this.errors.resetEmail = 'Введите верную почту!';
      }

      if (Object.keys(this.errors).length === 0) {
        this.errors.resetEmail = 'На Вашу почту было выслано письмо для восстановления пароля';
      }
    },


    validateEmail(email) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        this.errors.email = ''
        return

      } else {
        this.errors.email = 'Введите корректную почту!';
      }
    },

    validatePassword(reg_password) {
      this.errors.reg_password = '';

      // Проверка на длину пароля (не менее 8 символов)
      if (reg_password.length < 8) {
        this.errors.reg_password = 'Пароль должен быть не менее 8 символов!';
        return false;
      }

      // Проверка на наличие хотя бы одной цифры в пароле
      if (!/\d/.test(reg_password)) {
        this.errors.reg_password = 'Пароль должен содержать хотя бы одну цифру!';
        return false;
      }

      // Проверка на наличие хотя бы одной заглавной буквы в пароле
      if (!/[A-Z]/.test(reg_password)) {
        this.errors.reg_password = 'Пароль должен содержать хотя бы одну заглавную букву!';
        return false;
      }

      // Проверка на наличие хотя бы одной строчной буквы в пароле
      if (!/[a-z]/.test(reg_password)) {
        this.errors.reg_password = 'Пароль должен содержать хотя бы одну букву!';
        return false;
      }

      // Если все проверки прошли, возвращаем true
      return true;
    },

    openPopup() {
      this.showPopup = true;
      this.wasPopupOpen = true;
    },

    onCheckboxClick() {
      if (!this.wasPopupOpen) {
        console.log(1)
        this.errors.popup = 'Вы не прочитали правила сервера!';
      } else {
        console.log(2)
        this.errors.popup = '';
        // Add additional logic or actions if needed when the checkbox is clicked after the popup was open
      }
    },
  }
}

</script>


<style scoped>

.auth-overlay {
  background: rgb(0, 0, 0);
  background: -moz-linear-gradient(30deg, rgba(0, 0, 0, 0.742734593837535) 24%, rgba(0, 0, 0, 0) 100%);
  background: -webkit-linear-gradient(30deg, rgba(0, 0, 0, 0.742734593837535) 24%, rgba(0, 0, 0, 0) 100%);
  background: linear-gradient(30deg, rgba(0, 0, 0, 0.742734593837535) 24%, rgba(0, 0, 0, 0) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000", endColorstr="#000000", GradientType=1);
}

p, label {
  font-size: 14px;
  color: #62676a;
  font-weight: 600;
}

h2 {
  font-size: 30px;
  font-style: italic;
}

.auth-container {
  z-index: 9;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  place-self: center;
  display: grid;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 40vh;
  min-height: 50vh;
  max-height: 100vh;
  background-color: #1e1f1f;
  width: 60vh;
  border-radius: 20px;
  margin: 0 auto; /* Center the container horizontally */
  opacity: 0; /* Initial opacity to make it invisible */
  animation: flyIn 1s ease-out forwards;
}


.auth-container.restore {
  display: none; /* or any other styles to hide the auth-container on restore page */
}


.auth-container.small {
  /* Styles for when activeTab is not 2 */
  min-height: 40vh;
  min-height: 50vh;
  max-height: 100vh;
}

.auth-container.large {
  min-height: 75vh; /* Adjust as needed */
  min-height: 82vh; /* Adjust as needed */
  max-height: none;
}

.auth-container.smallest {
  min-height: 31vh;
}

.auth-container-register-inputs::placeholder {
  text-align: left;
}

.auth-container-checkmarks {
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.checkmark-container {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  width: 100%;
}

.checkmark-container p,
.checkmark-container label {
  margin: 4px;
}

.checkmark-container input {
  margin-right: 8px; /* Add margin to the right of the checkbox */
}

.popup {
  width: 45vh;
  height: 90%;
  background-color: #292828;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  z-index: 3;
}

.error {
  margin-top: 10px;
  color: #D4242C;
}

@keyframes flyIn {
  0% {
    transform: translate(-50%, -100%);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
}

</style>

