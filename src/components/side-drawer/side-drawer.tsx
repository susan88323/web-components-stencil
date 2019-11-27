import { Component, Prop, h } from '@stencil/core';

@Component({
    tag: 'uc-side-drawer',
    styleUrl: './side-drawer.css',
    shadow: true
})
export class SideDrawer {
    // with reflect true, the attribute will be updated whenever the prop changes
    @Prop({reflect: true}) title: string;

    render() {
        return (
            <aside>
                <header><h1>{this.title}</h1></header>
                <main>
                    <slot />
                </main>
            </aside>
        );
    }
}