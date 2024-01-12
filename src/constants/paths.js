const PRODUCTS_PATH = "/product";
const PROFILE_PATH = "/profile";
const BLOG_PATH = "/blog";

const PATHS = {
	HOME: "/",
	PRODUCTS: {
		INDEX: PRODUCTS_PATH,
		DETAIL: PRODUCTS_PATH + '/:slug',
		ORDER: '/course-order/:slug',
	},
	BLOG: {
		INDEX: BLOG_PATH,
		DETAIL: BLOG_PATH + '/:slug'
	},
	PROFILE: {
		INDEX: PROFILE_PATH,
		MY_COURSE: PROFILE_PATH + "/my-course",
		MY_PAYMENT: PROFILE_PATH + "/my-payment"
	},
	PAYMENT: "/payment-method",
	CONTACT: "/contact",
	ABOUT: "/about",
	PRIVACY: "/privacy"
};

export default PATHS;