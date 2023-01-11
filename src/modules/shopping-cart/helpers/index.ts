

export const setCartInLocalStorage = (cart: Record<string, number>) => {
    /**
     * Ideally I would have used the redux-persist library but
     * that would have made this task trivial
     */
    return new Promise<boolean>((res, rej) => {
        try {
        const cartString = JSON.stringify(cart);
        window.localStorage.setItem('shopping-cart', cartString);
        res(true);

        } catch(err) {
            rej(false);

        }
    })
}

export const fetchCartFromStorage = () => {
    return new Promise<Record<string, number>>((res) => {
        try {
        const cartString = window.localStorage.getItem('shopping-cart');
        if(cartString) {
            res(JSON.parse(cartString));
        }
    }   catch(err) {
        // Cannot fetch from localstorage for some reason
        res({});
    }

    })
}