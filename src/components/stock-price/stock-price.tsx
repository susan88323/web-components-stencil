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
    @State() stockUserInput: string; // Set two way binding
    @State() stockInputValid = false;
    @State() error: string;

    onUserInput(event: Event) {
        this.stockUserInput = (event.target as HTMLInputElement).value;
        if (this.stockUserInput.trim() !== '') {
            this.stockInputValid = true;
        } else {
            this.stockInputValid = false;
        }
    }

    onFetchStockPrice(event: Event) {
        event.preventDefault();
        // When using @Element()
        // const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
        // When using ref
        const stockSymbol = this.stockInput.value;
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
            .then(res => {
                if (res.status !== 200) {
                    throw new Error('Invalid');
                }
                return res.json();
            })
            .then(parsedRes => {
                if (!parsedRes['Global Quote']['05. price']) {
                    throw new Error('Invalid Symbol');
                }
                this.error = null;
                this.fetchedPrice = +parsedRes['Global Quote']['05. price'];
            })
            .catch(err => {
                this.error = err.message;
            });
    }

    render() {
        let dataContent = <p>Please enter a symbol!</p>;
        if (this.error) {
            dataContent = <p>{this.error}</p>
        }
        if (this.fetchedPrice) {
            dataContent = <p>Price: ${this.fetchedPrice}</p>;
        }
        return [
            <form onSubmit={this.onFetchStockPrice.bind(this)}>
                <input
                    id="stock-symbol"
                    ref={el => this.stockInput = el}
                    value={this.stockUserInput}
                    onInput={this.onUserInput.bind(this)} />
                <button type="submit" disabled={!this.stockInputValid}>Fetch</button>
            </form>,
            <div>
                {dataContent}
            </div>
        ];
    }
}