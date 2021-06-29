import React from 'react';

export function hiJackHoc<T extends {new (...args: any[]): any}> (component: T) {
    return class extends component {
        handleClick () {
            console.log(this.handleClick);
            super.handleClick()
            alert('劫持')
        }
        render() {
            const parent = super.render();
            return React.cloneElement(parent, {
                onClick: () => this.handleClick()
            })
        }
    }
}