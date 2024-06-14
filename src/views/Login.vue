<script setup>
import { ref } from 'vue'
import router from '../../index'
import { login } from '../services/auth'

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const IDENTIFIANT = import.meta.env.VITE_IDENTIFIANT
const PASSWORD = import.meta.env.VITE_PASSWORD

const log = async () => {

  console.log('identifiant',IDENTIFIANT )
  console.log('PASSWORD',PASSWORD )
  console.log('username.value',username.value )
  console.log('password.value',password.value )
  try {
    if (username.value === IDENTIFIANT && password.value === PASSWORD) {
      // const userCredential = await signInAnonymously(auth)
      // console.log('Utilisateur connecté:', userCredential.user)
      // router.push('/gallery')
      await login(username.value, password.value)
      // Rediriger l'utilisateur après la connexion réussie
      router.push('/gallery')
    } else {
      errorMessage.value = 'Identifiant ou mot de passe incorrect'
      alert('Erreur de connexion')
    }
  } catch (error) {
    console.error('Erreur de connexion:', error.message)
    errorMessage.value = error.message
  }
}
</script>

<template>
  <div class="login-container">
    <h2>Connexion</h2>
    <div class="input-container">
      <input type="email" placeholder="Login" v-model="username" class="login-input" />
    </div>
    <div class="input-container">
      <input type="password" placeholder="Mot de passe" v-model="password" class="login-input" />
    </div>
    <button @click="log" class="login-button">Se connecter</button>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
  padding: 20px;
  box-sizing: border-box;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

.input-container {
  margin-bottom: 15px;
  width: 100%;
  max-width: 400px;
}

.login-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
}

.login-input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.login-button {
  width: 100%;
  max-width: 400px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.login-button:hover {
  background-color: #0056b3;
}
</style>
