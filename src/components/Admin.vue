<template>
  <div id="admin">
    <h3>Vrde Admin</h3>
    <div class="addProduct">
      <div class="productBox">
        <label for="name">Name</label>
        <input id="name" type="text" v-model="name" />
      </div>
      <div class="productBox">
        <label for="image">Image Url</label>
        <input id="image" type="text" v-model="image" />
      </div>
      <div class="productBox">
        <label for="category">Category</label>
        <select id="category" v-model="type">
          <option disabled value>Categoria</option>
          <option>verdura</option>
          <option>fruta</option>
          <option>almacen</option>
        </select>
      </div>
      <div class="productBox">
        <label for="price">Price</label>
        <input id="price" type="text" v-model="price" />
      </div>
      <div class="productBox">
        <label for="active">Active</label>
        <input id="active" type="checkbox" v-model="active" />
      </div>
      <button id="addProduct" class="greenBtn" @click="submitProduct()">Add</button>
    </div>
    <div class="search">
      <strong>Busca con " cntrl + f "</strong>
      <div class="hideActive">
        <label for="toggleHide">
          <strong>Mostrar desactivados</strong>
        </label>
        <input id="toggleHide" type="checkbox" v-model="toggleHide" />
      </div>
    </div>
    <div>
      <div
        class="item"
        v-for="product in orderBy(products, 'name')"
        v-bind:key="product['.key']"
        v-bind:class="{ active: product.active, hidden: !toggleHide }"
      >
        <div class="static" v-if="!product.edit">
          <div class="box product">{{product.name}}</div>
          <div class="box url">{{product.image}}</div>
          <div class="box category">{{product.type}}</div>
          <div class="box price">{{product.price}}</div>
          <div class="box status">{{product.active}}</div>
          <button class="greenBtn" @click="setEditName(product.name, product['.key'])">Edit</button>
        </div>
        <div class="edit" v-else>
          <div class="element">
            <label for="name">Name</label>
            <input id="name" type="text" v-model="productEditName" />
          </div>
          <div class="element">
            <label for="image">Image Url</label>
            <input id="image" type="text" v-model="product.image" />
          </div>
          <div class="element">
            <label for="category">Category</label>
            <select v-model="product.type">
              <option disabled value>Categoria</option>
              <option>verdura</option>
              <option>fruta</option>
              <option>almacen</option>
            </select>
          </div>
          <div class="element">
            <label for="price">Price</label>
            <input id="price" type="text" v-model="product.price" />
          </div>
          <div class="element">
            <label for="active">Active</label>
            <input id="active" type="checkbox" v-model="product.active" />
          </div>
          <button class="greenBtn" @click="saveEdit(product)">Save</button>
          <button class="redBtn" @click="removeProductName(product['.key'])">Remove</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import Vue2Filters from "vue2-filters";
const productsRef = db.ref("products");

export default {
  data() {
    return {
      search: "",
      name: "",
      edit: false,
      image: "",
      type: "",
      price: 0,
      active: true,
      toggleHide: true,
      products: [],
      productEditName:""
    };
  },
  firebase: {
    products: productsRef
  },
  mixins: [Vue2Filters.mixin],
  methods: {
    submitProduct() {
      productsRef.push({
        name: this.name,
        edit: false,
        image: this.image,
        type: this.type,
        price: this.price,
        active: this.active,
        amount: 0
      });
      this.name = "";
      this.image = "";
      this.type = "";
      this.price = "";
      this.active = true;
    },
    removeProductName(key) {
      productsRef.child(key).remove();
    },
    setEditName(name, key) {
      productsRef.child(key).update({ edit: true });
      this.productEditName = name;
    },
    cancelEdit(key) {
      productsRef.child(key).update({ edit: false });
      this.productEditName = "";
    },
    saveEdit(product) {
      const key = product[".key"];
      productsRef.child(key).set({
        name: this.productEditName,
        edit: false,
        image: product.image,
        type: product.type,
        price: product.price,
        active: product.active,
        amount: 0
      });
    }
  }
};
</script>

<style scoped>
#app {
  font-family: sans-serif;
  font-size: 12px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 1080px;
  margin: 0 auto;
}

input {
  padding: 5px;
}
input#price {
  padding: 5px;
  width: 60px;
}
select {
  height: 29px;
  padding: 0px 10px;
}

button {
  font-weight: bold;
}

.search {
  height: 20px;
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  margin-bottom: 10px;
}

.search label {
  padding-right: 15px;
}

#toggleHide {
  position: relative;
  top: 2px;
  right: 8px;
}

.addProduct {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #fff;
  margin-bottom: 20px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.06);
  padding: 20px 10px;
  border-left: 2px solid #00cc65;
}
.addProduct .productBox {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.addProduct .productBox label {
  font-family: sans-serif;
  font-weight: bold;
  font-size: 12px;
  margin-bottom: 5px;
}

.item {
  margin-bottom: 10px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.06);
  padding: 0px;
  background-color: #d8d8d8;
  color: #999;
  padding-left: 10px;
  border-left: 2px solid #00cc65;
}

.item.hidden {
  display: none;
}
.item.active {
  padding-left: 10px;
  background-color: white;
  color: #444;
  display: block;
}
.item .static {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.item .static .box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  text-align: left;
}
.item .static .box.product {
  width: 350px;
  padding-right: 20px;
}
.item .static .box.url {
  width: 200px;
}
.item .static .box.price {
  width: 50px;
}
.item .static .box.status {
  width: 90px;
}
.item .static .box.category {
  width: 80px;
}
.edit {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  padding-left: 0px;
}
.edit .element {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
}
.edit .element label {
  font-family: sans-serif;
  font-weight: bold;
  font-size: 12px;
  margin-bottom: 5px;
}

.greenBtn {
  height: 30px;
  width: 80px;
  background-color: #00cc65;
  border: none;
  color: white;
  position: relative;
  left: 2px;
}
.redBtn {
  height: 30px;
  width: 80px;
  background-color: #fe5046;
  border: none;
  color: white;
}
</style>
