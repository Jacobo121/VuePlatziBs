

new Vue({
    el: '#app',

    data(){
        return {
            name: 'Bitcoin',
            symbol: 'BTC',
            img: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
            changePercent: 1,
            value: 0,
            price: 8400,
            color: 'f4f4f4',
            pricesWithDays: [
                { day: 'Lunes', value: 8400 },
                { day: 'Martes', value: 7900 },
                { day: 'Miercoles', value: 8200 },
                { day: 'Jueves', value: 9000 },
                { day: 'Viernes', value: 9400 },
                { day: 'Sabado', value: 10000 },
                { day: 'Domingo', value: 10200 },
            ],

            showPrices: false
        }
    },

    /* computed son propiedades que se calculan en tiempo real en base a otras propiedades
        un ejemplo sera que calculemos en precio del BTC en Euros en base al precio del BTC en dolares
        se calcula en tiempo real cada que cambie el precio del BTC 
    */
    computed: {
        title () {
            return `${this.name} - ${this.symbol}`
        },

        convertedValue () {
            if (!this.value) {
                return 0
            }
            
            return this.value / this.price
        }
    },

    /* Watcher es un disparador de codigo, cada que cambia el precio del BTC en dolar esta funcion se va a ejecutar 
        como una notificacion de que el BTC alcanzó otro precio
    */
    watch : {
        showPrices(newVal, olVal) {
            console.log(newVal, olVal);
        }
    },

    methods: {
        toggleShowPrices () {
            this.showPrices = !this.showPrices
            this.color = this.color.split('').reverse().join('')
        }
    }
})