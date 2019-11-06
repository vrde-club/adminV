<template>
  <div id="app">
    <div class="menu">
      <router-link to="/admin">Admin</router-link>
      <router-link to="/portal">Portal</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style>

@import url('https://fonts.googleapis.com/css?family=Ubuntu');

html, body {
  font-family: 'Ubuntu', sans-serif;
}

#app {
  font-size: 12px;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 900px;
  margin: 0 auto;
}

input {
  padding: 5px;
}
select {
  height: 29px;
  padding: 0px 10px;
}

button {
  font-weight: bold;
}
.menu {
  display:flex;
}

a {
  padding: 10px 20px;
    margin: 0px 5px;
    text-decoration: none;
    font-weight: bold;
    background-color: #00cc65;
    color: white;
    font-size: 14PX;
}
</style>
