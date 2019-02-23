<template>
  <div id="app">
    <h1>Welcome to the auth form</h1>
    <Form></Form>
  </div>
</template>

<script>
import Form from './components/Form'
export default {
  name: 'app',
  components: {
    Form
  }
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #ffffff; /* Old browsers */
  background: -moz-linear-gradient(top, #ffffff 0%, #e5e5e5 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top, #ffffff 0%,#e5e5e5 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#e5e5e5',GradientType=0 ); /* IE6-9 */
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 0 10px;
}

h1 {
  font-weight: 300;
  font-variant: small-caps;
  font-size: 18px;
  text-transform: uppercase;
}
</style>
