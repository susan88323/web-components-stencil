import { Component, Prop, h } from '@stencil/core';

@Component({
    tag: 'uc-side-drawer',
    styleUrl: './side-drawer.css',
    shadow: true
})
export class SideDrawer {
    // with reflect true, the attribute will be updated whenever the prop changes
    @Prop({reflect: true}) title: string;
    @Prop({reflect: true, mutable: true}) open: boolean;

    onCloseDrawer() {
        this.open = false;
    }

    render() {
        // let content = null;
        // if (this.open) {
        //     content = (
        //         <aside>
        //             <header><h1>{this.title}</h1></header>
        //             <main>
        //                 <slot />
        //             </main>
        //         </aside>
        //     );
        // }
        return (
            <aside>
                <header>
                    <h1>{this.title}</h1>
                    <button onClick={this.onCloseDrawer.bind(this)}>X</button>
                </header>
                <main>
                    <slot />
                </main>
            </aside>
        );
    }
}