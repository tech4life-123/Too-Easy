
# BuyLiberia — Product Requirements Document

**Tagline:** The Marketplace for Everyone.  
**Product:** BuyLiberia  
**Development status:** Initial development  
**Repository:** Too-Easy  
**Branch:** feature/buyliberia-marketplace

## 1. Product Vision

BuyLiberia is a Liberia-first, multi-vendor online marketplace that allows customers to discover and buy products from different sellers in one place.

The platform will help Liberian businesses establish an online presence, reach more customers, and manage their stores digitally.

Too Easy Wine will remain an independent seller storefront within BuyLiberia.

## 2. Brand Identity

- Brand name: BuyLiberia
- Tagline: The Marketplace for Everyone.
- Navy: #0B2D6B
- Red: #E10600
- White: #FFFFFF
- Brand personality: confident, professional, welcoming and distinctly Liberian.

The design should be premium, modern, mobile-first and easy to use, with strong Liberian identity.

## 3. Target Users

### Customers
- Browse products and seller stores.
- Search and filter products.
- Add products from multiple sellers to a cart.
- Place orders and communicate with sellers.
- Track order status.

### Sellers
- Register and manage a store.
- Upload products, images and product variations.
- Manage inventory and orders.
- Share their store link and QR code.
- Communicate with customers.

### Administrators
- Manage users, sellers, stores and products.
- Review and verify sellers.
- Moderate listings.
- Monitor orders and platform activity.

## 4. Marketplace Features

### Storefronts
Every approved seller should have an independent storefront with:
- Store name, logo and description.
- Contact and business information.
- Product catalogue.
- Store availability status.
- Shareable store URL.

### Seller QR Codes
Every seller receives a unique, permanent QR code at no additional cost.

Requirements:
- QR code links to the seller's storefront, not an individual product.
- QR identity remains valid if the store name or URL slug changes.
- Sellers can view, download and share their QR code.
- Support PNG and print-ready SVG formats.
- Suspended or closed stores should display an appropriate unavailable page.
- Future analytics should measure scans, visits and QR-attributed orders.

### Product Catalogue
- Product names and descriptions.
- Product images and categories.
- Prices and stock quantities.
- Product variations where applicable.
- Search, sorting and filtering.
- Seller identification on every listing.

### Shopping Cart and Orders
Customers must be able to add products from multiple sellers.

The platform must split a multi-seller checkout into separate seller orders, with correct item totals, delivery arrangements and order statuses for each seller.

## 5. Payments and Checkout

### Initial release
- WhatsApp-assisted checkout for each seller.
- Cash on delivery where supported by the seller.
- Mobile money integration only when a suitable provider and merchant access are available.

WhatsApp handoff must not automatically mean an order is accepted or paid.

### Future release
- Online card payments.
- International payment options.
- Secure payment confirmation and reconciliation.

## 6. Design and User Experience

- Mobile-first and responsive.
- Support iOS, Android, tablets and desktop.
- Day, Dark and Evening themes.
- Fast loading and low-bandwidth friendly.
- Clear typography and generous spacing.
- Accessible forms, search and navigation.
- Consistent product cards and seller profiles.

## 7. Technology and Architecture

The existing Too Easy Wine repository will serve as the starting point for development.

BuyLiberia will use a separate Supabase project.

Core database entities:
- profiles
- stores
- categories
- products
- product_images
- product_variants
- orders
- order_items

Security requirements:
- Enable Row Level Security on public tables.
- Customers may access their own account and orders.
- Sellers may manage only their authorized stores, products and orders.
- Public visitors may view active stores and products.
- Administrative privileges must be restricted.
- Never expose Supabase service-role credentials in frontend code.
- Order creation and inventory updates must use secure server-side logic.

## 8. Development Phases

### Phase 1 — Foundation
- Brand and responsive marketplace interface.
- Authentication and user profiles.
- Seller onboarding.
- Storefront creation.
- Product management.
- Public product catalogue.

### Phase 2 — Marketplace Operations
- Multi-vendor cart.
- Seller-specific orders.
- WhatsApp-assisted checkout.
- Order management.
- Seller QR-code generation and downloads.

### Phase 3 — Growth
- Advanced search and filtering.
- Store and QR analytics.
- Ratings and reviews.
- Promotions and featured sellers.
- Improved seller dashboards.

### Phase 4 — Payments and Expansion
- Online payment integrations.
- Secure payment reconciliation.
- Delivery integrations.
- Advanced marketplace reporting.
- Expansion to additional markets.

## 9. Initial Acceptance Criteria

The first usable marketplace release must allow:

1. A customer to browse active stores and products.
2. A seller to manage their own storefront and products.
3. A customer to add products from different sellers to a cart.
4. The system to create separate orders for each seller securely.
5. A seller to receive and manage their orders.
6. Every seller to have a permanent storefront QR code.
7. Unauthorized users to be prevented from accessing restricted data.

## 10. Important Development Rules

- All BuyLiberia development must happen on `feature/buyliberia-marketplace`.
- Do not modify the `main` branch or production website during initial development.
- Preserve Too Easy Wine as an independent seller storefront.
- Prioritize security, reliability and mobile usability.
- Test features before production deployment.
- Do not enable live checkout until secure order processing and inventory handling are implemented.

## 11. Open Decisions

The following require confirmation before implementation:
- Final domain and hosting arrangements.
- Seller verification requirements.
- Delivery and shipping arrangements.
- Supported mobile money providers.
- Seller commissions and marketplace fees.
- Customer support and dispute resolution.
