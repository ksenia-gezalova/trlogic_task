<template>
  <div class="form">
    <div class="form__wrapper">
      <button v-on:click="(isNew = true) && (isExist = false)">Sign up</button>
      <button v-on:click="(isExist = true) && (isNew = false)">Sign in</button>
    </div>
    <div class="form__auth" v-if="isNew">
      <div class="form__wrapper">
      <label for="name" class="form__label">Name</label>
      <input type="text" class="form__field" id="name" placeholder="Please enter your real name" v-model="name" required></div>
    <div class="form__wrapper">
      <label for="login" class="form__label">Login</label>
      <input type="text" class="form__field" id="login" placeholder="Choose your nickname" v-model="login" required></div>
    <div class="form__wrapper">
      <label for="email" class="form__label">Email</label>
      <input type="email" id="email" class="form__field" placeholder="Give us your mail" v-model="email" required></div>
    <div class="form__wrapper">
      <label for="password" class="form__label">Password</label>
      <input type="text" class="form__field" id="password" placeholder="Make strong password" v-model="password" required></div>
      <button v-on:click="insertData()">Sign up</button>
    </div>

    <div class="form__login" v-if="isExist">
      <div class="form__wrapper">
      <label for="login" class="form__label">Login</label>
      <input type="text" class="form__field" id="login" placeholder="Enter your nickname" v-model="login" required></div>
      <div class="form__wrapper">
      <label for="password" class="form__label">Password</label>
      <input type="text" class="form__field" id="password" placeholder="Enter your password" v-model="password" required></div>
      <button v-on:click="findData()">Sign in</button>
    </div>
  </div>
</template>

<script>
var Datastore = require('nedb')
var db = new Datastore({filename:'./test.db', autoload:true})
export default {
  name: 'form',
  data() {
    return {
      isNew: true,
      isExist: false,
      login: null,
      password: null,
      email: null,
      name: null
    }
  },
  methods: {
    insertData() {
      db.insert({name:this.name, password:this.password, email:this.email, login:this.login}, function(err, res) {
          console.log(res)
        })
    },
    findData() {
        db.find({}, function(err, res) {
          console.log(res)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  border: 3px solid black;
  border-radius: 3px;
  padding: 20px;
}
</style>

