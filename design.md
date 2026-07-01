 # Design & API Specifications - RUUT E-Commerce System

This document provides detailed design specifications, function definitions, parameter lists, hooks, and REST/AJAX API routes for both the frontend and backend systems of the RUUT e-commerce website.

---

## 1. Design Tokens & Styling (CSS Variables)

Defined in `/assets/css/styles.css`, these custom properties dictate the visual environment of the store.

| Token Name | Value | Purpose |
|---|---|---|
| `--font-serif` | `'Playfair Display', Georgia, serif` | Serif headers and premium text |
| `--font-sans` | `'Inter', 'Karla', sans-serif` | Body text and descriptions |
| `--font-heading` | `'Lexend Deca', 'Rubik', sans-serif` | Clean, geometric heading text |
| `--ruut-bg` | `#E6DED1` | Warm beige background color |
| `--ruut-text` | `#664436` | Primary dark brown coffee color for text |
| `--ruut-accent` | `#895158` | Deep rose mauve accent color |
| `--ruut-coffee` | `#4A3324` | Solid dark coffee color (buttons, banners) |
| `--ruut-white` | `#FFFFFF` | Clear white for cards and drawer backing |
| `--ruut-border` | `#D1C7B7` | Neutral border outline separator |
| `--ruut-btn-bg` | `#EADBC8` | Light warm beige color for background of buttons |

---

## 2. Frontend Functions (`assets/js/app.js`)

Core functions responsible for state management, AJAX fetching, layout building, and transitions.

### Cart & Checkout Managers

#### `fetchServerCart()`
- **Description**: Contacts the WordPress backend AJAX handler to retrieve the current Woo cart state.
- **Parameters**: None.
- **Return Type**: `Promise`. Updates global variables `cart` and `cartTotals`, then triggers `renderCart()`.

#### `openCart()` / `closeCart()`
- **Description**: Handles the sliding visual transition of the minicart drawer overlay.
- **Parameters**: None.
- **Return Type**: `void`. Adds/removes the `.open` class.

#### `addToCart(btnOrId, productIdOrPrice, quantityOrPrice = 1, qty = 1)`
- **Description**: Adds an item to the cart via AJAX. If called with a button element, changes button text to 'ADDING...' and provides a visual 'ADDED!' completion animation.
- **Parameters**:
  - `btnOrId` (`HTMLElement` | `number`): Button element or product WooCommerce ID.
  - `productIdOrPrice` (`number` | `string`): Product WooCommerce ID or price.
  - `quantityOrPrice` (`number` | `string`): Quantity or price.
  - `qty` (`number`): Fallback quantity value.
- **Return Type**: `void`. Dispatches `wp_ajax_ruut_add_to_cart`.

#### `updateQty(key, qty)`
- **Description**: Updates the quantity of a specific item in the WooCommerce cart.
- **Parameters**:
  - `key` (`string`): Unique WooCommerce cart item hash key.
  - `qty` (`number`): New quantity value.
- **Return Type**: `void`. Dispatches `wp_ajax_ruut_update_cart_qty`.

#### `removeCartItem(key)`
- **Description**: Removes an item completely from the cart.
- **Parameters**:
  - `key` (`string`): Unique WooCommerce cart item hash key.
  - `Return Type`: `void`. Dispatches `wp_ajax_ruut_remove_cart_item`.

#### `buyNow(btnOrId, productIdOrPrice, priceOrQty = 1, qty = 1)`
- **Description**: Adds product to WooCommerce cart and redirects to checkout instantly.
- **Parameters**: Same as `addToCart`.
- **Return Type**: `void`.

#### `renderCart()`
- **Description**: Renders HTML cards for cart items, updates the total count badge, updates the progressive free gift progress bar dots, and toggles upsell recommendation visibility.
- **Parameters**: None.
- **Return Type**: `void`.

#### `triggerConfetti()`
- **Description**: Renders a beautiful visual confetti explosion using custom canvas drawing when a discount/privilege coupon is successfully applied.
- **Parameters**: None.
- **Return Type**: `void`.

### Coupon & Promo System

#### `fetchCoupons()`
- **Description**: Dispatches AJAX request to query active available privilege coupons from WooCommerce, rendering them in the My Account popup drawer list.
- **Parameters**: None.
- **Return Type**: `void`.

#### `tryApplyCoupon(code)`
- **Description**: Checks if a coupon is already applied. If a different coupon is active, displays the Loss Prevention confirmation modal overlay to prevent accidental benefit losses.
- **Parameters**:
  - `code` (`string`): Coupon coupon code (e.g. `TEST-34`).
- **Return Type**: `void`.

#### `executeApplyCoupon(code)`
- **Description**: Applies the coupon code directly to the WooCommerce cart session and triggers a confetti popper on success.
- **Parameters**:
  - `code` (`string`): Coupon code.
- **Return Type**: `void`. Dispatches `wp_ajax_ruut_apply_coupon`.

#### `removeCoupon(code)`
- **Description**: Removes the coupon from the cart.
- **Parameters**:
  - `code` (`string`): Coupon code.
- **Return Type**: `void`. Dispatches `wp_ajax_ruut_remove_coupon`.

### Component Builders & Carousel Controllers

#### `createProductCard(product, isFavoriteGrid, isBestsellerBadge)`
- **Description**: Generates responsive e-commerce product card templates dynamically, supporting bestseller labels, and computing dynamic sale percentages (e.g. `SALE -15%`).
- **Parameters**:
  - `product` (`object`): WooCommerce product object.
  - `isFavoriteGrid` (`boolean`): Adds specific favorite-item card styles.
  - `isBestsellerBadge` (`boolean`): Renders BESTSELLER badge.
- **Return Type**: `string` (HTML).

#### `initHeroSlideshow()`
- **Description**: Sets up the landing page hero slider. Supports automatic 5s cycling, previous/next manual arrow controls, center indicator dots, and cycling timer resets.
- **Parameters**: None.
- **Return Type**: `void`.

#### `initCategoryCarousel(categoriesData)`
- **Description**: Initializes the infinite category slide carousel. Sets up slider tracks, handles responsive item counts, binds swipe bounds, and configures auto-scroll features.
- **Parameters**:
  - `categoriesData` (`array`): Array of category details.
- **Return Type**: `void`.

#### `showToast(message)`
- **Description**: Appends a beautiful temporary visual notification toast to the bottom center of the page.
- **Parameters**:
  - `message` (`string`): Notification message text.
- **Return Type**: `void`.

---

## 3. Frontend Checkout Script (`assets/checkout.js`)

Scripts handling headless address selector states and OTP gating on the checkout page.

#### `extractAddressData(addr, key)` / `fuzzyExtract(obj, keywords)`
- **Description**: Performs deep recursive scanning of address arrays to correctly resolve city, zip, address lines, and phone numbers.
- **Parameters**:
  - `addr` (`object`): Native WooCommerce address record.
  - `key` (`string`): Lookup key prefix.
- **Return Type**: `string`.

#### `ruut_build_layout()`
- **Description**: Re-orchestrates the WooCommerce checkout template grid into a modern single-page panel with distinct login, billing, address vault select boxes, shipping selector, and cart summary sections.
- **Parameters**: None.
- **Return Type**: `void`.

#### `renderOtpBoxes()`
- **Description**: Renders OTP input field boxes with keyboard event listeners, auto-tabbing, and backspace management.
- **Parameters**: None.
- **Return Type**: `void`.

#### `ruut_show_coupon_modal(message, showLink, autoClose)`
- **Description**: Renders temporary status screens or loading animations over checkout fields.
- **Parameters**:
  - `message` (`string`): Modal text.
  - `showLink` (`boolean`): Renders link options.
  - `autoClose` (`boolean`): Automatically dismisses the overlay.
- **Return Type**: `void`.

---

## 4. Headless REST API Endpoints (`/wp-json/ruut/v1/`)

Custom REST API routes exposed by the plugins for headless frontend consumption.

### A. Announcement Settings: `GET /announcement`
- **Callback**: `ruut_get_announcement()`
- **Permission Callback**: `__return_true`
- **Response Structure**:
  ```json
  {
    "messages": ["✨ USE CODE TEST-12 FOR ₹200 OFF ✨", "🌿 FREE SHIPPING ON ORDERS > ₹1500 🌿"],
    "reward_threshold": 3,
    "reward_amount": "₹250"
  }
  ```

### B. Send OTP Code: `POST /send-otp`
- **Callback**: `ruut_api_send_otp($request)`
- **Parameters**:
  - `username` (`string`, query/json): Email address or mobile phone number.
- **Response Structure**:
  ```json
  {
    "success": true,
    "message": "OTP sent successfully."
  }
  ```

### C. Verify OTP Code: `POST /verify-otp`
- **Callback**: `ruut_api_verify_otp($request)`
- **Parameters**:
  - `username` (`string`): Email/Mobile.
  - `otp` (`string`): 4-digit code.
- **Response Structure**:
  ```json
  {
    "success": true,
    "cookie": "wordpress_logged_in_...",
    "user_id": 15
  }
  ```

### D. Get Logged-In User Profile: `GET /user`
- **Callback**: `ruut_api_get_user()`
- **Header**: Requires authenticated cookie session details.
- **Response Structure**: Returns profile ID, email, billing details, onboarding flags, and saved address book records.

### E. Update User Details: `POST /user`
- **Callback**: `ruut_api_update_user($request)`
- **Parameters**: `first_name`, `last_name`, `phone`, `email`.
- **Response Structure**: `{"success": true}`.

### F. Save Saved Address Book Record: `POST /save-address`
- **Callback**: `ruut_api_save_address($request)`
- **Parameters**: `id` (to edit) or none (to add new), `first_name`, `last_name`, `address_1`, `address_2`, `city`, `postcode`, `phone`.
- **Response Structure**: Returns serialized address book objects.

### G. Delete Saved Address Book Record: `POST /delete-address`
- **Callback**: `ruut_api_delete_address($request)`
- **Parameters**: `id` (hash string key of the address).
- **Response Structure**: `{"success": true}`.

### H. Products Query Catalog: `GET /products`
- **Callback**: `ruut_get_products_api($request)`
- **Parameters**:
  - `id` (`int`): Query specific product details.
  - `category` (`string`): Query products by category term slug.
  - `featured` (`string`): Query 'true' to list featured products.
- **Response Structure**: JSON array containing product details, gallery arrays, metadata fields (feels_like, story, name, directions, cautions), and pricing.

### I. Collections Catalog: `GET /collections`
- **Callback**: `ruut_get_collections_api($request)`
- **Parameters**:
  - `slug` (`string`): Query specific category slug.
- **Response Structure**: Array of collections containing image url, titles, description, and parent taxonomy slug.

### J. Global FAQs List: `GET /faqs`
- **Callback**: `ruut_get_faqs_api($request)`
- **Parameters**: None.
- **Response Structure**:
  ```json
  [
    {
      "id": 105,
      "question": "How long does the scent last?",
      "answer": "Typically, the environment air mist lasts between 4-6 hours in enclosed areas.",
      "order": 1
    }
  ]
  ```

### K. The Ruut Story: `GET /story`
- **Callback**: `ruut_get_story_api($request)`
- **Parameters**: None.
- **Response Structure**:
  ```json
  {
    "title": "The Ruut Story",
    "content": "<p>Inspired by the quiet mornings in Landour, Mussoorie...</p>",
    "image": "http://localhost/wp-content/uploads/2026/06/story.jpg"
  }
  ```

### L. Product Reels Carousel: `GET /reels`
- **Callback**: `ruut_get_reels_api($request)`
- **Parameters**: None.
- **Response Structure**:
  ```json
  [
    {
      "id": 204,
      "title": "Evening Ritual Scent",
      "video_url": "http://localhost/wp-content/uploads/2026/06/reel1.mp4",
      "thumbnail": "http://localhost/wp-content/uploads/2026/06/reel1-thumb.jpg",
      "order": 0,
      "product": {
        "id": 2489,
        "title": "Beach Holiday 50ml",
        "price": "1199.00",
        "regular_price": "1699.00",
        "sale_price": "1199.00",
        "image": "http://localhost/wp-content/uploads/2026/06/beach-holiday.webp",
        "permalink": "https://yourruut.com/product/beach-holiday-50ml/",
        "formatted_price": "₹1,199.00",
        "discount_percentage": 29,
        "categories": [
          { "name": "Air Mists", "slug": "airmist", "parent": 0 }
        ]
      }
    }
  ]
  ```

---

## 5. WooCommerce AJAX Actions (`/wp-admin/admin-ajax.php`)

procedural callbacks in `ruut-core.php` mapped to native WooCommerce cart actions.

| Action Name | Hook Callback | Purpose |
|---|---|---|
| `wp_ajax_ruut_get_cart` | `ruut_ajax_get_cart()` | Fetches active Woo items list, item regular vs sale pricing, subtotal, and coupons. |
| `wp_ajax_ruut_add_to_cart` | `ruut_ajax_add_to_cart()` | Safely adds products to cart session, returning updated cart json structure. |
| `wp_ajax_ruut_update_cart_qty` | `ruut_ajax_update_cart_qty()` | Alters item quantities inside the WooCommerce active cart object. |
| `wp_ajax_ruut_remove_cart_item` | `ruut_ajax_remove_cart_item()` | Deletes the item hash from cart, returning updated totals. |
| `wp_ajax_ruut_get_active_coupons` | `ruut_ajax_get_active_coupons()` | Resolves available coupon codes that fit store conditions. |
| `wp_ajax_ruut_apply_coupon` | `ruut_ajax_apply_coupon()` | Registers coupon strings directly inside Woocommerce's session validation. |
| `wp_ajax_ruut_remove_coupon` | `ruut_ajax_remove_coupon()` | Removes applied discounts from cart. |
| `wp_ajax_ruut_save_address` | `ruut_ajax_save_address()` | AJAX version of saving address book entries for inline account views. |
| `wp_ajax_ruut_delete_address` | `ruut_ajax_delete_address()` | AJAX endpoint to delete addresses from user meta. |

---

## 6. Visual Component Styling (CSS Classes & Layouts)

### A. Product Cards
The standard product cards (`.product-card`) are split into an image wrapper (with a hover-based action) and a details area:
1.  **Image Container (`.product-img-wrap`)**:
    *   Contains the product image and any active discount/sale badges.
    *   **Add To Cart Overlay (`.add-to-cart-overlay`)**: A full-size flex container that is hidden by default and becomes visible on hover. It uses glassmorphic styling (blurred semi-transparent background).
    *   **Add To Cart Button (`.btn-add-cart`)**: Centered within the overlay. Styled with a frosted glass look, dark text, and subtle hover animations.
2.  **Product Info Container (`.product-info-custom`)**:
    *   **Meta Row (`.product-meta-row`)**: Displays the sub-category label (`.product-category-tag`) and the rating score (`.product-rating`).
    *   **Title (`.product-title-custom`)**: Clean typography linking to the single product page.
    *   **Price and Action Row (`.product-price-row`)**: A flex row (`justify-content: space-between`) mapping:
        *   **Price (`.product-price-custom`)** on the left.
        *   **Buy Now Button** on the right.
3.  **Buy Now Button Design Variants**:
    *   **Default Solid Accent (`.btn-buy-now-accent`)**: Standard theme button conforming to the page's brown/rose palette.
    *   **Option 1: Outline (`.btn-buy-now-opt1-side`)**: Transparent background with a solid borders theme.
    *   **Option 2: Solid Pill (`.btn-buy-now-opt2-side`)**: Rounded pill shape with background fills matching the brand colors.
    *   **Option 3: Minimal Link (`.btn-buy-now-opt3-side`)**: Simple text-link layout with clean bottom borders.

### B. Product Reels Section
Horizontal continuous-scroll short videos carousel styled under `.reels-section`:
1.  **Video Card Container (`.reel-card`)**:
    *   Width-constrained (`200px` desktop, `150px` tablet, `120px` mobile) to maintain aspect ratio and prevent overlaps.
2.  **Media Wrapper (`.reel-media`)**:
    *   Houses the HTML5 auto-loop video (`.reel-video`) or thumbnail (`.reel-thumbnail`).
    *   Includes a mute toggle button overlay (`.reel-mute-btn`) with responsive SVG icons.
3.  **Inline Product Card (`.reel-product-card`)**:
    *   Rendered as an inline horizontal row below each video media container.
    *   **Thumbnail Wrapper (`.reel-product-img-wrap`)**: Tiny square thumbnail container (`50px` on desktop, `44px` on tablet, `36px` on mobile) with soft borders.
    *   **Product Info (`.reel-product-info`)**: Fits the title (`.reel-product-title`), price row (`.reel-product-price-row`), and a black discount badge (`.reel-product-discount-badge`) styled with lowercase label text (e.g. `29% off`).

### C. Ingredients Banner
The natural ingredients highlight section styled under `.ingredients-banner`:
1.  **Grid Wrapper (`.badge-grid`)**:
    *   Displays 3 badges in a single row on all viewports, configured via `repeat(3, 1fr)`.
2.  **Badge Item (`.badge-item`)**:
    *   Combines the icon image and descriptive text labels.
3.  **Badge Icon (`.badge-icon-img`)**:
    *   Sized at `80px` (desktop), `68px` (tablet), and `56px` (mobile).
    *   Colored programmatically via CSS hue-rotate/sepia filters to match the target olive shade (`#7d8427`).

