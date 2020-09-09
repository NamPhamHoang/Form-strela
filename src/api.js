export const gate = `${process.env.REACT_APP_API_URL}`;

/*
 *  FRONT
 * */
export const API_SITES_SHOW = slug => `${gate}/sites/${slug}`;

export const API_PHARMACIES = `${gate}/pharmacies`;

export const API_EVENTS_INDEX = `${gate}/events`;
export const API_EVENTS_INDEX_MAIN_PAGE = `${gate}/events/main-page`;
export const API_EVENTS_SHOW = slug => `${gate}/events/${slug}`;

export const API_NEWS_INDEX = `${gate}/news`;
export const API_NEWS_SHOW = slug => `${gate}/news/${slug}`;
export const API_NEWS_SLIDER_INDEX = `${gate}/news/slider`;
export const API_NEWS_SMALL_INDEX = `${gate}/news/box`;

export const API_COMPANIES_MAIN_PAGE = `${gate}/companies/random`;
export const API_COMPANIES_CATEGORIES = `${gate}/companies/categories`;
export const API_COMPANIES_INDEX = categorySlug => `${gate}/companies/categories/${categorySlug}`;
export const API_COMPANIES_SHOW = slug => `${gate}/companies/${slug}`;

export const API_RESTAURANT_INDEX = `${gate}/restaurants`;
export const API_RESTAURANT_SHOW = slug => `${gate}/restaurants/${slug}`;
export const API_RESTAURANT_PAYMENT = `${gate}/makeRestaurantPayment`;

export const API_ESTATES = `${gate}/institutions/estates`;
export const API_SCHOOLS = `${gate}/institutions/schools`;
export const API_INSTITUTION_SHOW = slug => `${gate}/institutions/${slug}`;

export const API_INSTITUTION_NEWS_SHOW = (slug, newsSlug) => `${gate}/institutions/${slug}/news/${newsSlug}`;
export const API_COMMUNITY_COMPANIES_INDEX = `${gate}/municipal-companies`;

export const API_COMMUNITY_COMPANIES_SHOW = slug => `${gate}/municipal-companies/${slug}`;

export const API_AD_TYPE_INDEX = `${gate}/advertisements/types`;
export const API_AD_CHECK_FROM = `${gate}/advertisements/check-from`;
export const API_AD_CHECK_TO = `${gate}/advertisements/check-to`;
export const API_AD_COUNT = `${gate}/advertisements/countPrice`;
export const API_AD_SHOW = type => `${gate}/advertisements/types/${type}`;
export const API_AD_PAYMENT = `${gate}/makeAdvertisementPayment`;

export const API_EMARKET_INDEX = `${gate}/e-market`;
export const API_EMARKET_MAIN_PAGE = `${gate}/e-market/last`;
export const API_EMARKET_SHOW = slug => `${gate}/e-market/${slug}`;
export const API_EMARKET_FILTERS = `${gate}/e-market/filters`;
export const API_EMARKET_CATEGORIES = `${gate}/e-market/categories`;
export const API_EMARKET_SEND_MAIL = id => `${gate}/e-market/${id}/sendMail`;

export const API_EOFFICE_FIND_CONTACT = `${gate}/e-office/findContact`;

export const API_INVESTMENT_MAP_INDEX = `${gate}/investmentsMap`;
export const API_INVESTMENT_MAP_CATEGORIES_INDEX = `${gate}/investmentsMap/categories`;

export const API_QUESTIONNAIRE_GET = `${gate}/questionnaires`;
export const API_QUESTIONNAIRE_VOTE = id => `${gate}/questionnaires/${id}`;

export const API_IMAGE_LINKS_INDEX = `${gate}/imageLinks`;

export const API_MENU_INDEX = `${gate}/menu`;

export const API_AIR_QUALITY_GET = `${gate}/airQuality`;

export const API_WEATHER_GET = `${gate}/weather`;

export const API_SEARCH = search => `${gate}/search/${search}`;

/*
 *   PANEL
 * */
export const API_AUTH_LOGIN = `${gate}/login`;
export const API_REFRESH_TOKEN = `${gate}/refresh`;
export const API_AUTH_REGISTER = `${gate}/register`;

export const API_USER_CHANGE_PASSWORD = `${gate}/auth/changePassword`;
export const API_USER_DATA_SHOW = `${gate}/auth/user`;

export const API_USER_DATA_STORE = `${gate}/auth/storeData`;
export const API_USER_DATA_UPDATE = `${gate}/auth/updateData`;

export const API_USER_CARD_GET = `${gate}/auth/getCard`;
export const API_USER_CARD_REQUEST = `${gate}/auth/requestCard`;
export const API_USER_CARD_REVOKE = `${gate}/auth/revokeCard`;

export const API_REPORT_PROBLEM_INDEX = `${gate}/auth/user/reports`;
export const API_REPORT_PROBLEM_STORE = `${gate}/auth/user/reports`;
export const API_REPORT_PROBLEM_CATEGORIES_INDEX = `${gate}/auth/user/reports/categories`;

export const API_COMPANY_INDEX = `${gate}/auth/companies`;
export const API_COMPANY_STORE = `${gate}/auth/companies`;
export const API_COMPANY_EDIT = id => `${gate}/auth/companies/${id}`;
export const API_COMPANY_UPDATE = id => `${gate}/auth/companies/${id}`;

export const API_COMPANY_PHOTO_STORE = id => `${gate}/auth/companies/${id}/photo`;
export const API_COMPANY_PHOTO_REORDER = id => `${gate}/auth/companies/${id}/photo/order`;
export const API_COMPANY_PHOTO_DELETE = (id, photoId) => `${gate}/auth/companies/${id}/photo/${photoId}`;

export const API_COMPANY_RESTAURANT_ORDERS = id => `${gate}/auth/restaurant/${id}/orders`;
export const API_COMPANY_RESTAURANT_ORDERS_UPDATE = (id, order) => `${gate}/auth/restaurant/${id}/orders/${order}`;

export const API_COMPANY_RESTAURANT_DATA_EDIT = id => `${gate}/auth/restaurant/${id}`;
export const API_COMPANY_RESTAURANT_DATA_UPDATE = id => `${gate}/auth/restaurant/${id}`;

export const API_COMPANY_RESTAURANT_MENU_EDIT = id => `${gate}/auth/restaurant/${id}/menu`;
export const API_COMPANY_RESTAURANT_MENU_UPDATE = id => `${gate}/auth/restaurant/${id}/menu`;

export const API_COMPANY_RESTAURANT_MENU_CATEGORY_STORE = id => `${gate}/auth/restaurant/${id}/category`;
export const API_COMPANY_RESTAURANT_MENU_CATEGORY_DELETE = (id, categoryId) =>
    `${gate}/auth/restaurant/${id}/category/${categoryId}`;

export const API_COMPANY_RESTAURANT_MENU_CATEGORY_ITEM_STORE = (id, categoryId) =>
    `${gate}/auth/restaurant/${id}/category/${categoryId}/dish`;
export const API_COMPANY_RESTAURANT_MENU_CATEGORY_ITEM_DELETE = (id, categoryId, itemId) =>
    `${gate}/auth/restaurant/${id}/category/${categoryId}/dish/${itemId}`;
export const API_COMPANY_RESTAURANT_MENU_CATEGORY_ITEM_PHOTO_UPDATE = (id, categoryId, itemId) =>
    `${gate}/auth/restaurant/${id}/category/${categoryId}/dish/${itemId}/photo`;

export const API_COMPANY_RESTAURANT_MENU_CATEGORY_ITEM_VARIANT_STORE = (id, categoryId, itemId) =>
    `${gate}/auth/restaurant/${id}/category/${categoryId}/dish/${itemId}/variant`;
export const API_COMPANY_RESTAURANT_MENU_CATEGORY_ITEM_VARIANT_DELETE = (id, categoryId, itemId, variantId) =>
    `${gate}/auth/restaurant/${id}/category/${categoryId}/dish/${itemId}/variant/${variantId}`;

export const API_AD_COMPANY_INDEX = `${gate}/auth/advertisements`;

export const API_COMPANY_RESTAURANT_ORDERS_USER = `${gate}/auth/restaurant/usersOrderList`;

export const API_GARBAGE_DISPOSALS_INDEX = (location, month) => `${gate}/auth/garbage/${location}/disposal/${month}`;
export const API_GARBAGE_USER_LOCATION_INDEX = `${gate}/auth/garbage`;
export const API_GARBAGE_USER_LOCATION_CREATE = `${gate}/auth/garbage`;
export const API_GARBAGE_USER_LOCATION_DESTROY = id => `${gate}/auth/garbage/${id}`;

export const API_EMARKET_PANEL_INDEX = `${gate}/auth/e-market`;
export const API_EMARKET_PANEL_STORE = `${gate}/auth/e-market`;
export const API_EMARKET_PANEL_EDIT = id => `${gate}/auth/e-market/${id}`;
export const API_EMARKET_PANEL_UPDATE = id => `${gate}/auth/e-market/${id}`;
export const API_EMARKET_PANEL_DELETE = id => `${gate}/auth/e-market/${id}`;
export const API_EMARKET_PANEL_EXTEND = id => `${gate}/auth/e-market/extend/${id}`;
export const API_EMARKET_PANEL_RENEW = id => `${gate}/auth/e-market/renew/${id}`;

export const API_EMARKET_PANEL_FAV_INDEX = `${gate}/auth/e-market/favourites`;
export const API_EMARKET_PANEL_FAV_TOGGLE = `${gate}/auth/e-market/favourites/toggle`;

export const API_NOTIFICATIONS = `${gate}/auth/notifications`;

/**/
export const API_TICKETS_EVENTS = `${gate}/tickets/events`;
export const API_TICKETS_EVENT_BY_SLUG = slug => `${gate}/tickets/events/${slug}`;
export const API_TICKETS_EVENT_BUY = `${gate}/tickets/events/buyTicket`;
export const API_GET_EVENTS_TICKETS = `${gate}/auth/tickets/events`;

export const API_PARKING_ZONES = `${gate}/tickets/parking/zones`;
export const API_PARKING_ZONES_TICKETS = id => `${gate}/tickets/parking/zones/${id}/tickets`;
export const API_PARKING_CHECK_PRICE = `${gate}/tickets/parking/checkPrice`;
export const API_PARKING_GET_TICKET_DATA = `${gate}/tickets/parking/getTicketData`;
export const API_PARKING_BUY = `${gate}/tickets/parking/buy`;
export const API_GET_PARKING_TICKETS = `${gate}/auth/tickets/parking`;
export const API_PARKING_PIGGY_BANK_BALANCE = `${gate}/auth/tickets/parking/piggy-bank/balance`;
export const API_PARKING_REFUND_TICKET = id => `${gate}/auth/tickets/parking/refund/${id}`;

export const API_VEHICLES = `${gate}/auth/vehicles`;

export const API_BUS_TICKETS_AREAS = `${gate}/tickets/bus/areas`;
export const API_BUS_TICKETS_DISCOUNTS = `${gate}/tickets/bus/discounts`;
export const API_BUS_TICKETS_STATIONS = `${gate}/tickets/bus/stations`;
export const API_BUS_TICKETS_STATIONS_AVAILABLE = id => `${gate}/tickets/bus/stations/${id}`;
export const API_BUS_TICKETS_PRICES = (from, to) => `${gate}/tickets/bus/prices/${from}/${to}`;
export const API_BUS_TICKETS_LINES = (from, to) => `${gate}/tickets/bus/lines/${from}/${to}`;
export const API_BUS_TICKETS_BUY = `${gate}/tickets/bus/buy`;

export const API_GET_MARQUEE = `${gate}/marquee`;
