import { Component, h, State, Element } from '@stencil/core';

import { AV_API_KEY } from '../../global/global';

@Component({
    tag: 'uc-stock-price',
    styleUrl: './stock-price.css',
    shadow: true
})
export class StockPrice {
    stockInput: HTMLInputElement;
    @Element() el: HTMLElement;
    @State() fetchedPrice: number;

    onFetchStockPrice(event: Event) {
        event.preventDefault();
        // When using @Element()
        // const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
        // When using ref
        const stockSymbol = this.stockInput.value;
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
            .then(res => {
                return res.json();
            })
            .then(parsedRes => {
                this.fetchedPrice = +parsedRes['Global Quote']['05. price'];
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return [
            <form onSubmit={this.onFetchStockPrice.bind(this)}>
                <input id="stock-symbol" ref={el => this.stockInput = el} />
                <button type="submit">Fetch</button>
            </form>,
            <div>
                <p>Price: ${this.fetchedPrice}</p>
            </div>
        ];
    }
}