module.exports = {
    welcomeTemplate: {
        bodyText: "Hey Fam! ✌🏼\nThanks for reaching out, how can we help you today?",
        buttons: {
            inquiry: "Inquiry",
            returnexchangestracking: "Order Issues",
            support: "Support"
        },
        template: true
    },
    welcome: {
        bodyText: "Hey Fam! ✌🏼\nThanks for reaching out, how can we help you today?",
        buttons: {
            inquiry: "Inquiry",
            returnexchangestracking: "Order Issues",
            support: "Support"
        }
    },
    invalidInput: {
        bodyText: "You have provided an invalid input. Please select main menu",
        buttons: {
            menu: "Menu"
        }
    },
    stage_0_0: {
        bodyText: "Please specify the type of inquiry",
        buttons: {
            personalinquiry: "Personal Inquiry",
            businessinquiry: "Business Inquiry"
        }
    },
    stage_0_0_0: {
        bodyText: "If you have any personal questions or concerns, please submit the following form and our team will get back to you as soon as possible: https://proudangeles.com/pages/customer-support",
        buttons: {
            menu: "Menu"
        }
    },
    stage_0_0_1: {
        bodyText: "If you have a business inquiry, please submit the following form and our team will get back to you as soon as possible: https://proudangeles.com/pages/business-inquires",
        buttons: {
            menu: "Menu"
        }
    },
    stage_0_1: {
        bodyText: "Please specify the type of request:",
        buttons: {
            returns: "Returns",
            exchanges: "Exchanges",
            tracking: "Tracking"
        }
    },
    stage_0_1_0: {
        bodyText: "Please enter your email and order number on the following link to process your return request: https://app.returnx.io/returns/proud-angeles-ksa",
        buttons: {
            menu: "Menu"
        }
    },
    stage_0_1_1: {
        bodyText: "Please enter your email and order number on the following link to process your exchange request: https://app.returnx.io/returns/proud-angeles-ksa",
        buttons: {
            menu: "Menu"
        }
    },
    stage_0_1_2: {
        bodyText: "Once your order leaves our warehouse, a third-party courier will be delivering your order. If you would like to track your order, please check your email and visit the courier's link.",
        buttons: {
            menu: "Menu"
        }
    },
    stage_0_2: {
        bodyText: "Please click on this link to talk to our agent. https://wa.me/966501300048?text=hi%2C%20Can%20you%20please%20assist%20me%3F",
        buttons: {
            menu: "Menu"
        }
    },
    unhandledMessage: {
        bodyText: "Some error occured, Please select Menu button",
        buttons: {
            menu: "Menu"
        }
    }
};
