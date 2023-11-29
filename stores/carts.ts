import { defineStore } from 'pinia'

export const useCartStore = defineStore({
    id: 'cart',
    state: () => ({
        cart: [],
        amount: 0,
        cartTotal: 0
    }),
    getters: {
        getCart: (state) => {
            return state.cart
        },
        getAmount: (state) => {
            return state.amount
        },
        getCartTotal: (state) => {
            return state.cartTotal
        }
    },
    actions: {
        ADD_TO_CART(payload: any) {
            // payload = {
            //     id: props.id,
            //     name: props.name,
            //     description: props.description,
            //     unit: props.unit,
            //     manufacturer_name: props.manufacturer_name,
            //     image: props.image,
            //     lastPrice: props.lastPrice,
            //     quantity: 1,
            // }
            const product = payload
            const cartItem = this.cart.find((item: any) => item.id === product.id)
            if (!cartItem) {
                this.cart.push({
                    ...product,
                    quantity: 1
                })
            } else {
                cartItem.quantity++
            }
            this.amount++
            this.cartTotal += product.lastPrice
        },
        decrementQty(payload: any) {
            const product = payload
            const cartItem = this.cart.find((item: any) => item.id === product.id)
            if (cartItem) {
                cartItem.quantity--
                this.amount--
                this.cartTotal -= product.lastPrice
            }
        },
        incrementQty(payload: any) {
            const product = payload
            console.log(product)
            const cartItem = this.cart.find((item: any) => item.id === product.id)
            console.log(cartItem)
            if (cartItem) {
                cartItem.quantity++
                this.amount++
                this.cartTotal += product.lastPrice
            }
        }
    }
})