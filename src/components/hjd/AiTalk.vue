<template>
  <div class="chatroom">
    <div class="chat-box">
      <div v-for="(message, index) in messages" :key="index" class="message" :class="{ 'user-message': message.sender === 'user', 'ai-message': message.sender === 'ai' }">
        {{ message.text }}
      </div>
    </div>
    <div class="input-box">
      <input v-model="userMessage" @keyup.enter="sendMessage" placeholder="Type a message...">
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from "axios";

const messages = ref([
  { sender: 'ai', text: 'Hello! How can I assist you?' }
]);
const userMessage = ref('');

const getResponse=(input)=>{
  let formData = new FormData();
  formData.append("user_input",input)

  axios({
    method:"POST",
    url:"/AITalk",
    data:formData
  }).then(res=>{
    console.log(res)
    messages.value.push({ sender: 'ai', text: res.data });
  })
}

const sendMessage = () => {
  if (userMessage.value.trim() !== '') {
    messages.value.push({ sender: 'user', text: userMessage.value });
    // Simulate AI response (Replace with actual AI logic)
    // setTimeout(() => {
      // messages.value.push({ sender: 'ai', text: 'I am just a demo AI. I cannot respond properly yet.' });
    // }, 500);
    getResponse(userMessage.value)
    userMessage.value = '';
  }
};
</script>

<style scoped>
.chatroom {
  //max-width: 400px;

  margin: 0 auto;
  padding: 20px;
}

.chat-box {
  border: 1px solid #ccc;
  padding: 10px;
  height: 80vh;

  overflow-y: auto;
}

.message {
  margin-bottom: 10px;
  padding: 5px 10px;
  border-radius: 5px;
}

.user-message {
  background-color: #007bff;
  color: white;
  align-self: flex-end;
}

.ai-message {
  background-color: #f0f0f0;
  color: #333;
  align-self: flex-start;
}

.input-box {
  margin-top: 10px;
  display: flex;
  height: 50px;
}

.input-box input {
  flex: 1;
  padding: 5px;
  border-radius: 5px 0 0 5px;
  border: 1px solid #ccc;
}

.input-box button {
  padding: 5px 10px;
  border: 1px solid #007bff;
  border-radius: 0 5px 5px 0;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}
</style>