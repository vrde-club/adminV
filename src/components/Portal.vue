<template>
  <div id="portal">
    <h3>Vrde Portal</h3>
    <div class="total">
      <div class="item">
        <div class="name"></div>
        <div class="amount"></div>
      </div>
    </div>
    <div class="sale" v-for="sale in sales" v-bind:key="sale['.key']">
      <button class="redBtn" @click="removeSale(sale['.key'])">Remove</button>
      <div class="userData">
        <div class="line"></div>
        <div class="line date">Fecha : {{sale[0].date}}</div>
        <div class="line name">Nombre : {{sale[0].name}}</div>
        <div class="line address">Direccion : {{sale[0].address}}</div>
        <div class="line phone">Cel : {{sale[0].phone}}</div>
        <div class="line email">Correo : {{sale[0].email}}</div>
        <div class="line total">Total : {{sale[0].total}}</div>
        <div class="line"></div>
        <div class="items">
          <div class="item" v-for="item  in sale[0].items" v-bind:key="item">
            <div class="row name">Variedad : {{item.variedad}}</div>
            <div class="row amount">Cantidad : {{item.cantidad}}</div>
            <div class="row payment">Pago : {{item.pago}}</div>
            <div class="row price">Precio : {{item.precio}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import Vue2Filters from "vue2-filters";
const salesRef = db.ref("sales");

export default {
  data() {
    return {
      sales: []
    };
  },
  firebase: {
    sales: salesRef
  },
  mixins: [Vue2Filters.mixin],
  methods: {
    submitProduct() {
      salesRef.push({
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
    removeSale(key) {
      salesRef.child(key).remove();
    },
    setEditName(key) {
      salesRef.child(key).update({ edit: true });
    },
    cancelEdit(key) {
      salesRef.child(key).update({ edit: false });
    },
    saveEdit(product) {
      const key = product[".key"];
      salesRef.child(key).set({
        name: product.name,
        edit: false,
        image: product.image,
        type: product.type,
        price: product.price
      });
    }
  }
};
</script>

<style scoped>
.sale {
  margin-bottom: 10px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.06);
  position: relative;
  border-left: 2px solid #00cc65;
}
.sale .userData {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
}
.sale .userData .line {
  padding: 4px;
  width: 300px;
  text-align: left;
  padding-left: 10px;
  color: #333;
  font-weight: bold;
}
.sale .userData .items {
  display: flex;
  flex-direction: column;
  padding: 10px;
}
.sale .userData .items .item {
  display: flex;
  flex: 1 100%;
}
.sale .userData .items .item .row {
  padding: 4px;
  text-align: left;
}

.sale .userData .items .item .row.name {
  width: 200px;
}
.sale .userData .items .item .row.amount {
  width: 100px;
}
.sale .userData .items .item .row.payment {
  width: 100px;
}
.sale .userData .items .item .row.price {
  width: 100px;
}

.greenBtn {
  height: 30px;
  width: 80px;
  background-color: #00cc65;
  border: none;
  color: white;
}
.redBtn {
  height: 30px;
  width: 80px;
  background-color: #fe5046;
  border: none;
  color: white;
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
