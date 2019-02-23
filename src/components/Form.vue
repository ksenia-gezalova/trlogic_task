<template>
  <div class="form">
    <div v-if="!isSuccess">
      <h1>Welcome to the <span v-if="isNew">auth</span> <span v-if="isExist">login</span> form</h1>
    <div v-if="showAlert" class="form__alert">
      {{ message }}
    </div>
    <div class="form__holder">
      <button class="form__button" :class="{'form__button--active': isNew}" v-on:click="(isNew = true) && (isExist = false)">Sign up</button>
      <button class="form__button" :class="{'form__button--active': isExist}" v-on:click="(isExist = true) && (isNew = false)">Sign in</button>
    </div>
    <form class="form__auth" v-if="isNew" v-on:keyup="showAlert = false">
      <div class="form__wrapper">
      <label for="name" class="form__label">Name*</label>
      <input type="text" class="form__field" id="name" placeholder="Please enter your real name" v-model="name" required></div>
    <div class="form__wrapper">
      <label for="login" class="form__label">Login*</label>
      <input type="text" class="form__field" id="login" placeholder="Choose your nickname" v-model="login" required></div>
    <div class="form__wrapper">
      <label for="email" class="form__label">Email*</label>
      <input type="email" id="email" class="form__field" placeholder="Give us your mail" v-model="email" required></div>
    <div class="form__wrapper">
      <label for="password" class="form__label">Password*</label>
      <input type="password" class="form__field" id="password" placeholder="Make strong password" v-model="password" required></div>
    <div class="form__wrapper">
      <label for="password-repeat" class="form__label">Repeat password*</label>
      <input type="password" class="form__field" id="password-repeat" placeholder="Repeat your password" v-model="passwordRepeat" required>
    </div>
    <button class="form__button" v-on:click="insertData()">Sign up</button>
    </form>

    <form class="form__login" v-if="isExist" v-on:keyup="showAlert = false">
      <div class="form__wrapper">
        <label for="login" class="form__label">Login*</label>
        <input type="text" class="form__field" id="login" placeholder="Enter your nickname" v-model="login" required>
      </div>
      <div class="form__wrapper">
        <label for="password" class="form__label">Password*</label>
        <input type="password" class="form__field" id="password" placeholder="Enter your password" v-model="password" required>
      </div>
      <p class="form__restore" v-on:click="isForgot = !isForgot">Forgot your password?</p>
      <div class="form__wrapper" v-if="isForgot">
        <label for="email-sent" class="form__label">Email</label>
        <input type="email" class="form__field" id="email-sent" placeholder="Enter your email" v-model="emailSent">
        <button class="form__button form__button--restore" v-on:click="restorePassword()">Restore password</button>
      </div>
      <button class="form__button" v-on:click="findData()">Sign in</button>
    </form>
    <p class="form__text">*required fields</p>
    </div>
    

    <div class="form__success" v-if="isSuccess">
      Congratulations! You have passed all checks!
    </div>
  </div>
</template>

<script>
var Datastore = require('nedb')
var db = new Datastore({filename:'./test.db', autoload:true})
//test.ensureIndex({ fieldName: 'email', unique: true });
export default {
  name: 'form',
  data() {
    return {
      isNew: true,
      isExist: false,
      isSuccess: false,
      isForgot: false,
      login: '',
      password: '',
      passwordRepeat: '',
      email: '',
      name: '',
      emailSent: '',
      showAlert: false,
      message: '',
    }
  },
  methods: {
    validateFields() {
      if(this.isNew) {
        if(this.login === '' || this.password === '' || this.email === '' || this.name === '' || this.passwordRepeat === '') {
          this.message = 'Please fill all required fields';
          this.showAlert = true;
          return
        }
        if(this.password !== this.passwordRepeat) {
          this.message = 'Your password information does not match, try again';
          this.showAlert = true;
          return
        }
      } else {
          this.message = 'Please fill all required fields';
          this.showAlert = true;
          return
      }    
    },
    insertData() {
      this.validateFields();
      db.insert({name:this.name, password:this.password, email:this.email, login:this.login}, function(err, res) {
          console.log(res);
          console.log('errr' + err)
        })
    },
    findData() {
        db.find({ login: 'ksenia-gezalova' }, function(err, res) {
          console.log(res)
        })
    },
    restorePassword() {
      db.findOne({ email: this.emailSent }, function(err, res) {
          console.log(res)
          if(res === null) {  
            alert('Unfortunately user not found :(')
          } else {
            alert('Your password:' + res.password)
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  font-size: 14px;
  border: 3px solid black;
  border-radius: 3px;
  padding: 20px;
  //min-height: 280px;
  padding-bottom: 10px;

  @media(min-width: 768px) {
    font-size: 16px;
  }

&__alert {
  color: red;
  margin-bottom: 10px;
  text-transform: uppercase;
}

&__holder {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  margin-bottom: 20px;
}

&__button {
  padding: 5px;
  cursor: pointer;
  transition: all .4s;
  border: 1px solid transparent;
  border-radius: 3px;
  color: rgb(99, 96, 96);
  &--active {
    background-color: rgb(99, 96, 96);
    color: #ebebeb;
    border-color: rgb(99, 96, 96);
  }
  &:hover {
    border: 1px solid rgb(99, 96, 96);
  }

  &--restore {
    grid-column-end: -1;
    grid-column-start: 2;
    display: block;
    margin-top: -20px;
  }
}

&__wrapper {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 30px;
  text-align: left;
  margin-bottom: 10px;
}

&__field {
  padding: 4px 0 4px 6px;
  border: none;
  border-radius: 3px;
}

&__text {
  font-size: 12px;
  text-align: right;
}

&__success {
  color: green;
}

&__restore {
  cursor: pointer;
}
}
</style>

