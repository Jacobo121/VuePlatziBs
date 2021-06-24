Vue.component('coinDetail', {

    props: ['coin'],

    data () {
        return {
            showPrices: false,
            value: 0,
        }
    },

    methods: {
        toggleShowPrices () {
            this.showPrices = !this.showPrices
            this.$emit('change-color', this.showPrices ? 'FF96CB' : '3D3D3D')
        },
    },

    computed: {
        title () {
            return `${this.coin.name} - ${this.coin.symbol}`
        },

        convertedValue () {
            if (!this.value) {
                return 0
            }
            
            return this.value / this.coin.price
        }
    },

    template: `
    <div>
        <!-- : es la abreviacion de v-bind -->
        <img @mouseover="toggleShowPrices" 
        @mouseout="toggleShowPrices"
        v-bind:src="coin.img" :alt="coin.name" />

        <h1 :class="coin.changePercent > 0 ? 'green' : 'red' "> 
            {{title}}
            <!-- v-if remueve directamente del DOM la condicion que no se cumple -->
            <span v-if="coin.changePercent > 0" >😁</span>
            <span v-else-if="coin.changePercent < 0" >🤯</span>
            <span v-else > 😑 </span>

            <!-- v-show cambia el display del elemento -->
            <span v-show="coin.changePercent > 0" >🙄</span>
            <span v-show="coin.changePercent < 0" > 😂 </span>
            <span v-show="coin.changePercent == 0" > 😣 </span>

            <!-- V-on sirve para disparar un evento, despues de los dos puntos va el evento click en este caso  
            De igual forma podemos abreviar v-on: con un simple @-->
            <span v-on:click="toggleShowPrices" >{{showPrices ? '🤩' : '😶'}}</span>
        </h1>

        <input type="number" v-model="value">
        <span>{{convertedValue}}</span>

        <slot name="text"></slot>
        <slot name="link" ></slot>

        <ul v-show="showPrices">
            <!-- P e I son las variables en este caso, p representa el elemento y I el indice -->
            <li 
                class="uppercase"
                :class="{orange: p.value === coin.price, red: p.value < coin.price, green: p.value > coin.price }"
                v-for="(p, i) in coin.pricesWithDays" 
                v-bind:key="p" > 
                {{ i }} - {{p.day}} - {{ p.value }} 
            </li>
        </ul>

    </div>
    `,
})


new Vue({
    el: '#app',

    data(){
        return {
            btc: {
                name: 'Bitcoin',
                symbol: 'BTC',
                img: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
                changePercent: 1,
                price: 8400,
                pricesWithDays: [
                    { day: 'Lunes', value: 8400 },
                    { day: 'Martes', value: 7900 },
                    { day: 'Miercoles', value: 8200 },
                    { day: 'Jueves', value: 9000 },
                    { day: 'Viernes', value: 9400 },
                    { day: 'Sabado', value: 10000 },
                    { day: 'Domingo', value: 10200 },
                ],
            },
            color: 'f4f4f4',
        }
    },

    /* computed son propiedades que se calculan en tiempo real en base a otras propiedades
        un ejemplo sera que calculemos en precio del BTC en Euros en base al precio del BTC en dolares
        se calcula en tiempo real cada que cambie el precio del BTC 
    */
    computed: {
    },

    /* Watcher es un disparador de codigo, cada que cambia el precio del BTC en dolar esta funcion se va a ejecutar 
        como una notificacion de que el BTC alcanzó otro precio
    */
    /* watch : {
        showPrices(newVal, olVal) {
            console.log(newVal, olVal);
        }
    }, */

    methods: {
        updateColor (color) {
            this.color = color || this.color.split('').reverse().join('')
        }
    }
})