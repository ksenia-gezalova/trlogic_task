<template>
  <div class="form" :class="{'form--success': isSuccess}">
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
      <input type="text" class="form__field" id="login" placeholder="Choose your nickname" v-model="login" autocomplete="username" required></div>
    <div class="form__wrapper form__wrapper--icon">
      <img class="form__icon" src="https://img.icons8.com/color/30/000000/checked-2.png" v-if="isOk">
      <img class="form__icon" src="https://img.icons8.com/color/30/000000/close-window.png" v-if="isError">
      <label for="email" class="form__label">Email*</label>
      <input type="email" id="email" class="form__field" placeholder="Give us your mail" v-model="email" autocomplete="username email" required v-on:change="validateEmail(email)"></div>
    <div class="form__wrapper">
      <label for="password" class="form__label">Password*</label>
      <input type="password" class="form__field" id="password" placeholder="Make strong password" v-model="password" autocomplete="new-password" required></div>
    <div class="form__wrapper">
      <label for="password-repeat" class="form__label">Repeat password*</label>
      <input type="password" class="form__field" id="password-repeat" placeholder="Repeat your password" v-model="passwordRepeat" autocomplete="new-password" required>
    </div>
    <button type="button" class="form__button" v-on:click="sign('up')">Sign up</button>
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
      <button type="button" class="form__button" v-on:click="sign('in')">Sign in</button>
    </form>
    <p class="form__text">*required fields</p>
    </div>
    

    <div class="form__success" v-if="isSuccess">
      Congratulations! You have passed all checks!
      <p>You profile below:</p>
      <div class="form__wrapper-success">
        <b>Your name:</b> {{ profile.name }}
        <b>Your login:</b> {{ profile.login }}
        <b>Your mail:</b> {{ profile.email }}
        <b>Your password:</b> {{ profile.password }}
      </div>
    </div>
  </div>
</template>

<script>
var Datastore = require('nedb')
var db = new Datastore({filename:'./users.db', autoload:true})
db.ensureIndex({ fieldName: 'email', unique: true });
export default {
  name: 'form',
  data() {
    return {
      isNew: true,
      isExist: false,
      isSuccess: false,
      isOk: null,
      isError: null,
      login: '',
      password: '',
      passwordRepeat: '',
      email: '',
      name: '',
      showAlert: false,
      message: '',
      profile: ''
    }
  },
  methods: {
    validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(email).toLowerCase())) {
      this.isError = false;
      this.isOk = true;
    } else {
      this.isOk = false;
      this.isError = true;
    }
    return re.test(String(email).toLowerCase());
  },
    sentData() {
      if(this.isNew) {
        if(this.login === '' || this.password === '' || this.email === '' || this.name === '' || this.passwordRepeat === '' || !this.validateEmail(this.email)) {
          this.message = 'Please fill all required fields';
          this.showAlert = true;
          return false;
        }
        if(this.password !== this.passwordRepeat) {
          this.message = 'Your password information does not match, try again';
          this.showAlert = true;
          return false;
        }
        if(this.validateEmail(this.email)) {
          return true;
        }
      } else {
        if(this.login === '' || this.password === '') {
          this.message = 'Please fill all required fieldsss';
          this.showAlert = true;
          return false;
        } else {
          return true;
        }       
      }    
    },
    insertData() {
      db.insert({name:this.name, password:this.password, email:this.email, login:this.login}, (err, res) => {
        if(err) {
          this.message = 'This mail is already in use';
          this.showAlert = true;
        } else {
          this.showAlert = false;
          this.profile = res;
          this.isSuccess = true;
        }
        })
    },
    findData() {
        db.findOne({ login: this.login, password: this.password }, (err, res) => {
          if(res === null) {  
            this.message = 'Unfortunately user not found :(';
            this.showAlert = true;
          } else {
            this.showAlert = false;
            this.profile = res;
            this.isSuccess = true;
          }
        })
    },
    deleteDb() {
      db.remove({}, { multi: true }, function(err, numDeleted) {  
      console.log('Deleted', numDeleted, 'user(s)');
    });
    },
    sign(str) {
      this.sentData();
      if(this.sentData()) {
        switch(str) {
          case 'up': 
            this.insertData();
            break;
          case 'in':
            this.findData();
            break;
        }
      } else {
        return;
      }
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

  &--success {
    border-color: green;
  }

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

  &--icon {
    position: relative;
  }

  &-success {
    display: grid;
    grid-template-columns: 3fr 1fr;
    text-align: left;
    padding: 0 20px;
  }
}

&__icon {
  position: absolute;
  right: 0;
  top: -4px;
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
}
</style>

