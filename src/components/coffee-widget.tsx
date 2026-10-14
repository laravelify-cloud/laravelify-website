'use client';

import Script from 'next/script';
import { site } from '@/config/site';

/**
 * The floating Buy Me a Coffee button. The widget draws itself on DOMContentLoaded, which has
 * already passed when a lazy script loads, so the event is sent again once it is in.
 */
export function CoffeeWidget() {
    return (
        <Script
            id="bmc-widget"
            src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
            strategy="lazyOnload"
            data-name="BMC-Widget"
            data-cfasync="false"
            data-id={site.coffeeId}
            data-description="Support me on Buy me a coffee!"
            data-message=""
            data-color="#BD5FFF"
            data-position="Right"
            data-x_margin="18"
            data-y_margin="18"
            onLoad={() => {
                window.dispatchEvent(new Event('DOMContentLoaded', { bubbles: false, cancelable: false }));
            }}
        />
    );
}
