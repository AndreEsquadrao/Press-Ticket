const rules = {
	user: {
		static: [],
	},
	admin: {
		static: [
			"drawer-admin-items:view",
			"tickets-manager:showall",
			"user-modal:editProfile",
			"user-modal:editQueues",
			"ticket-options:deleteTicket",
			"ticket-options:transferWhatsapp",
			"contacts-page:deleteContact",
		],
	},
	supervisor: {
		static: [
			
			"tickets-manager:showall",
			"user-modal:editProfile",
			
			
			
			
			
		],
	},
};

export default rules;