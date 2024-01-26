export const MODAL_TYPES = { login: "Login", register: "Register", pass: "Pass", consult: "Consult" }

export const SORT_OPTIONS = {
	popularity: {
		value: "popularity",
		label: "Most Popular",
		queryObject: { orderBy: undefined, order: undefined },
	},
	pricelow: {
		value: "pricelow",
		label: "Price Low to High",
		queryObject: { orderBy: "price", order: "1" },
	},
	pricehigh: {
		value: "pricehigh",
		label: "Price Hight to Low",
		queryObject: { orderBy: "price", order: "-1" },
	},
	newest: {
		value: "newest",
		label: "Newest",
		queryObject: { orderBy: "createdAt", order: "-1" },
	},
	rating: {
		value: "rating",
		label: "Most Rated",
		queryObject: { orderBy: "rating", order: "-1" },
	},
};

export const TYPESHIP = {
	free: {
		text: "Free Shipping",
		value: 0
	},
	standart: {
		text: "Standart",
		value: 10
	},
	express: {
		text: "Express",
		value: 20
	}
}

export const PAYMENTS = [{
	id: "bank",
	label: "Direct bank transfer",
	description: `Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.`,
},
{
	id: "cash",
	label: "Cash on delivery",
	description: `Quisque volutpat mattis eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros.`,
}
];