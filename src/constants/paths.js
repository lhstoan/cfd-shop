const PRODUCTS_PATH = "/products";
const PROFILE_PATH = "/profile";
const PROFILE_ORDER = "/profile/order";
const PROFILE_ADDRESS = "/profile/address";
const PROFILE_WISHLIST = "/profile/wishlist";

const PATHS = {
	HOME: "/",
	PRODUCTS: {
		INDEX: PRODUCTS_PATH,
		DETAIL: PRODUCTS_PATH + '/:slug',
	},
	PROFILE: {
		INDEX: PROFILE_PATH,
		ORDER: PROFILE_ORDER,
		WISHLIST: PROFILE_WISHLIST,
		ADDRESS: PROFILE_ADDRESS
	},
	CART: "/cart",
	CHECKOUT: "/checkout",
	CHECKOUT_SUCCESS: "/checkout-success",
	DASHBOARD: "/dashboard",
	FAQ: "/faq",
	PAYMENT_METHOD: "/payment",
	PRIVACY: "/privacy",
	RETURN: "/return",
	SHIPPING: "/shipping",
	BLOG: "/blog",
	CONTACT: "/contact",
	ABOUT: "/about"
};

export default PATHS;