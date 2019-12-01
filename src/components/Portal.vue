<template>
  <div id="portal">
    <h1>Ventas</h1>
    <h1>Total : {{totalSales}}</h1>
    <div class="count">
      <div class="row" v-for="item in salesTotalCount" v-bind:key="item['.key']">
        <div class="name">{{item.name}}</div>
        <div class="amount">{{item.amount}}</div>
      </div>
    </div>
    <br />
    <br />
    <div class="sale" v-for="sale in sales" v-bind:key="sale['.key']">
      <button class="redBtn" @click="removeSale(sale['.key'])">Remove</button>

      <div class="userData">
        <div class="line"></div>
        <div class="line date">
          <div class="lineTitle">Fecha :</div>
          <input
            type="text"
            v-model="sale[0].date"
            @change="updateUserInfo($event, sale['.key'], '0/date')"
          />
        </div>

        <div class="line name">
          <div class="lineTitle">Nombre :</div>
          <input
            type="text"
            v-model="sale[0].name"
            @change="updateUserInfo($event, sale['.key'], '0/name')"
          />
        </div>

        <div class="line address">
          <div class="lineTitle">Direccion :</div>
          <input
            type="text"
            v-model="sale[0].address"
            @change="updateUserInfo($event, sale['.key'], '0/address')"
          />
        </div>

        <div class="line phone">
          <div class="lineTitle">Cel :</div>
          <input
            type="text"
            v-model="sale[0].phone"
            @change="updateUserInfo($event, sale['.key'], '0/phone')"
          />
        </div>

        <div class="line email">
          <div class="lineTitle">Correo :</div>
          <input
            type="text"
            v-model="sale[0].email"
            @change="updateUserInfo($event, sale['.key'], '0/email')"
          />
        </div>

        <div class="line total">
          <div class="lineTitle">Total :</div>
          <input
            type="text"
            v-model="sale[0].total"
            @change="updateUserInfo($event, sale['.key'], '0/total')"
          />
        </div>
        <div class="line pago">
          <div class="lineTitle">Pago :</div>
          <select
            v-model="sale[0].pago"
            @change="updateUserInfo($event, sale['.key'], '0/pago')"
            class="selectPayment"
          >
            <option value="Todavia no">todavia nop</option>
            <option value="MercadoPago">MercadoPago</option>
            <option value="Efectivo">Efectivo</option>
          </select>
        </div>

        <div class="line"></div>
        <div class="items">
          <div class="item" v-for="(item, index) in sale[0].items" v-bind:key="index">
            <div class="row name">{{item.variedad}}</div>
            <div class="row amount">
              Cantidad :
              <input
                type="text"
                v-model="item.cantidad"
                @change="updateItems($event, sale['.key'], index, 'cantidad', item, sale[0])"
              />
            </div>
            <div class="row payment">
              Pago :
              <input
                type="text"
                v-model="item.pago"
                @change="updateItems($event, sale['.key'], index, 'pago', item, sale[0])"
              />
            </div>
            <div class="row price">
              Precio :
              <input
                type="text"
                v-model="item.precio"
                @change="updateItems($event, sale['.key'], index, 'precio', item, sale[0])"
              />
            </div>
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
      sales: [],
      totalSales: 0,
      pago: ""
    };
  },
  firebase: {
    sales: salesRef
  },
  mixins: [Vue2Filters.mixin],
  methods: {
    removeSale(key) {
      salesRef.child(key).remove();
    },
    updateUserInfo(event, key, name) {
      var updateObject = {
        [name]: event.target.value
      };
      salesRef.child(key).update(updateObject);
    },
    updateItems(event, key, index, name, item, sale) {
      var n = "0/items/" + index + "/" + name;
      var p = "0/items/" + index + "/pago"
      if (name == "cantidad"){
        item.pago = item.precio * item.cantidad;
      }
      var saleTotal = 0;
      for (var i in sale.items){
        saleTotal += parseInt(sale.items[i].pago)
      } 
      let updateObject = {
        "0/total": saleTotal,
        [p]: item.pago,
        [n]: event.target.value
      };
      salesRef.child(key).update(updateObject);
    }
  },
  computed: {
    salesTotalCount: function() {
      var self = this;
      var s = self.sales;
      var c = {};
      for (var i in s) {
        var items = s[i][0].items;
        for (var o in items) {
          var name = items[o].variedad.toString();
          self.totalSales += parseInt(items[o].pago);
          if (!c[name]) {
            c[name] = 0;
          }
          c[name] += parseInt(items[o].cantidad);
        }
      }
      var n = [];
      for (var i in c) {
        n.push({ name: i, amount: c[i] });
      }
      n.sort(function(a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
      this.count = n;
      return this.count;
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
.line .lineTitle {
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

.sale .selectPayment {
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

.count {
}
.count .row {
  display: flex;
  border-bottom: 0.5px solid #e2e2e2;
  max-width: 180px;
  margin-bottom: 7px;
}
.count .row .amount {
}
.count .row .name {
  width: 180px;
  text-align: left;
}

#portal input {
  padding: 5px;
  border: none;
  background-color: #f1f1f1;
  margin-right: 2px;
  width: 200px;
}

#portal .item input {
  max-width: 70px;
}
</style>
