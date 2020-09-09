import {
    ADS_FETCH,
    ADS_RESET,
    BASKET_ADD,
    BASKET_CHANGE_QUANTITY,
    BASKET_REMOVE,
    CHANGE_ACTIVE_COMPANY,
    FETCH_AIR_QUALITY,
    FETCH_ERROR,
    FETCH_EVENTS_MAIN,
    FETCH_IMAGE_LINKS,
    FETCH_MENU,
    FETCH_NEWS_SLIDER,
    FETCH_NEWS_SMALL,
    FETCH_QUESTIONNAIRE,
    FETCH_WEATHER,
    HAS_CHANGED_DATA_UPDATE,
    LOGIN,
    LOGOUT,
    RESET_AIR_QUALITY,
    RESET_EVENTS_MAIN,
    RESET_IMAGE_LINKS,
    RESET_MENU,
    RESET_NEWS_SLIDER,
    RESET_NEWS_SMALL,
    RESET_WEATHER,
    VOTE_QUESTIONNAIRE,
    SET_TICKETS_TO_BUY,
    SET_PARKING_TICKETS_TO_BUY,
    SET_BUS_TICKETS_TO_BUY,
    SETLOADING,
    SET_AVATAR,
} from '../actions';

const initialState = {
    token: localStorage.getItem('token'),
    hasChangedData: localStorage.getItem('hasChangedData') === 'true',
    isUserCityMember: localStorage.getItem('isUserCityMember') === 'true',
    role: parseInt(localStorage.getItem('role'), 10),
    expiresIn: localStorage.getItem('expiresIn'),
    avatar: localStorage.getItem('avatar'),
    daysLeftToActivate: parseInt(localStorage.getItem('daysLeftToActivate'), 10),
    error: '',
    newsSlider: {
        news: [],
        loading: true,
        date: null,
    },
    newsSmall: {
        news: {
            box1: {},
            box2: {},
        },
        loading: true,
        date: null,
    },
    questionnaire: {
        questionnaire: {
            options: [],
            title: '',
        },
        canVote: null,
        loading: true,
        date: null,
    },
    baskets: {
        orderFood: {
            name: 'Zamów jedzenie',
            href: '/zamow-jedzenie/koszyk',
            seller: null,
            sellerName: '',
            items: [],
            sum: `0,00`,
            ship: '0,00',
        },
    },
    ads: {
        ads: {},
        loading: true,
        date: null,
    },
    panelCompany: {
        id: null,
        categoryId: null,
        name: 'brak',
    },
    imageLinks: {
        imageLinks: {
            1: null,
            2: null,
            3: null,
        },
        loading: true,
        date: null,
    },
    menu: {
        menu: {
            1: [],
            2: [],
            3: [],
            4: [],
        },
        loading: true,
        date: null,
    },
    events: {
        events: [],
        loading: true,
        date: null,
    },
    airQuality: {
        airQuality: {
            name: '',
        },
        loading: true,
        date: null,
    },
    weather: {
        weather: {
            icon: null,
            wind: '',
            temperature: '',
        },
        loading: true,
        date: null,
    },
    ticketsData: {},
    parkingTicketsData: {},
    busTicketsData: {},
    loadingPage: false,
};

const countBasketSum = items => {
    const sum = items.reduce((value, item) => value + item.price * item.quantity, 0);
    return sum.toFixed(2).replace('.', ',');
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            const {
                token,
                hasChangedData,
                role,
                isUserCityMember,
                expiresIn,
                daysLeftToActivate,
                avatar,
            } = action.payload;
            localStorage.setItem('token', token);
            localStorage.setItem('hasChangedData', hasChangedData);
            localStorage.setItem('role', role);
            localStorage.setItem('isUserCityMember', isUserCityMember);
            localStorage.setItem('daysLeftToActivate', daysLeftToActivate);
            localStorage.setItem('avatar', avatar);
            localStorage.setItem('expiresIn', new Date(Date.now() + expiresIn * 1000).getTime());
            return { ...state, token, hasChangedData, role, isUserCityMember, daysLeftToActivate, error: null, avatar };
        }
        case SET_AVATAR: {
            const { avatar } = action.payload;
            localStorage.setItem('avatar', avatar);
            return { ...state, avatar };
        }
        case FETCH_ERROR: {
            return { ...state, error: action.payload };
        }
        case HAS_CHANGED_DATA_UPDATE: {
            localStorage.setItem('hasChangedData', action.payload);
            return { ...state, hasChangedData: action.payload };
        }
        case LOGOUT: {
            localStorage.removeItem('token');
            localStorage.removeItem('hasChangedData');
            localStorage.removeItem('role');
            localStorage.removeItem('expiresIn');
            localStorage.removeItem('isUserCityMember');
            localStorage.removeItem('daysLeftToActivate');
            localStorage.removeItem('avatar');
            return {
                ...state,
                token: null,
                hasChangedData: null,
                isUserCityMember: null,
                role: null,
                expiresIn: null,
                daysLeftToActivate: null,
                avatar: null,
            };
        }
        case FETCH_NEWS_SLIDER: {
            const { news, loading } = action.payload;
            const date = new Date();
            const newsSlider = {
                news,
                loading,
                date,
            };
            return { ...state, newsSlider };
        }
        case FETCH_QUESTIONNAIRE: {
            const { questionnaire: questionnaireP, canVote } = action.payload;
            const date = new Date();
            const questionnaire = {
                questionnaire: questionnaireP,
                loading: false,
                canVote,
                date,
            };
            return { ...state, questionnaire };
        }
        case VOTE_QUESTIONNAIRE: {
            const { questionnaire } = state;
            questionnaire.canVote = false;
            return { ...state, questionnaire };
        }
        case RESET_NEWS_SLIDER: {
            const newsSlider = {
                ...state.newsSlider,
                loading: true,
            };
            return { ...state, newsSlider };
        }
        case FETCH_NEWS_SMALL: {
            const { news, loading } = action.payload;
            const date = new Date();
            const newsSmall = {
                news,
                loading,
                date,
            };
            return { ...state, newsSmall };
        }
        case RESET_NEWS_SMALL: {
            const newsSmall = {
                ...state.newsSmall,
                loading: true,
            };
            return { ...state, newsSmall };
        }
        case FETCH_IMAGE_LINKS: {
            const { imageLinks: data, loading } = action.payload;
            const date = new Date();
            const imageLinks = {
                imageLinks: data,
                loading,
                date,
            };
            return { ...state, imageLinks };
        }
        case RESET_IMAGE_LINKS: {
            const newsSmall = {
                ...state.newsSmall,
                loading: true,
            };
            return { ...state, newsSmall };
        }
        case FETCH_MENU: {
            const { menu: data, loading } = action.payload;
            const date = new Date();
            const menu = {
                menu: data,
                loading,
                date,
            };
            return { ...state, menu };
        }
        case RESET_MENU: {
            const menu = {
                ...state.menu,
                loading: true,
            };
            return { ...state, menu };
        }
        case FETCH_EVENTS_MAIN: {
            const { events: data, loading } = action.payload;
            const date = new Date();
            const events = {
                events: data,
                loading,
                date,
            };
            return { ...state, events };
        }
        case RESET_EVENTS_MAIN: {
            const events = {
                ...state.events,
                loading: true,
            };
            return { ...state, events };
        }
        case ADS_FETCH: {
            const { ads, type } = action.payload;
            const date = new Date();
            let { ads: adsFetch } = state;
            adsFetch.ads[type] = ads;
            adsFetch = {
                ...adsFetch,
                loading: false,
                date,
            };
            return { ...state, ads: adsFetch };
        }
        case ADS_RESET: {
            const ads = {
                ...state.ads,
                loading: true,
            };
            return { ...state, ads };
        }
        case FETCH_AIR_QUALITY: {
            const { airQuality } = action.payload;
            const date = new Date();
            let { airQuality: airQualityFetch } = state;
            airQualityFetch.airQuality = airQuality;
            airQualityFetch = {
                ...airQualityFetch,
                loading: false,
                date,
            };
            return { ...state, airQuality: airQualityFetch };
        }
        case RESET_AIR_QUALITY: {
            const airQuality = {
                ...state.airQuality,
                loading: true,
            };
            return { ...state, airQuality };
        }
        case FETCH_WEATHER: {
            const { weather } = action.payload;
            const date = new Date();
            let { weather: weatherFetch } = state;
            weatherFetch.weather = weather;
            weatherFetch = {
                ...weatherFetch,
                loading: false,
                date,
            };
            return { ...state, weather: weatherFetch };
        }
        case RESET_WEATHER: {
            const weather = {
                ...state.weather,
                loading: true,
            };
            return { ...state, weather };
        }
        case BASKET_ADD: {
            const { basketType, item, variantId, quantity, seller, sellerName } = action.payload;
            const baskets = { ...state.baskets };
            const basket = baskets[basketType];

            if (basket.seller && basket.seller !== seller) {
                basket.seller = seller;
                basket.sellerName = sellerName;
                basket.items = [];
            } else if (!basket.seller) {
                basket.seller = seller;
                basket.sellerName = sellerName;
            }

            const basketItem = {
                ...item.variants.find(variant => variant.id === variantId),
            };

            basketItem.id = variantId;
            basketItem.quantity = quantity;
            basketItem.name = basketItem.name ? `${item.name} - ${basketItem.name}` : item.name;

            const duplicate = basket.items.findIndex(variant => variantId === variant.id);
            if (duplicate !== -1) basket.items.splice(duplicate, 1);
            basket.items.push(basketItem);
            basket.sum = countBasketSum(basket.items);

            return { ...state, baskets };
        }
        case BASKET_REMOVE: {
            const { basketType, variantId } = action.payload;
            const baskets = { ...state.baskets };
            const basket = baskets[basketType];
            const index = basket.items.findIndex(item => variantId === item.id);
            basket.items.splice(index, 1);
            basket.sum = countBasketSum(basket.items);

            return { ...state, baskets };
        }
        case BASKET_CHANGE_QUANTITY: {
            const { basketType, variantId, quantity } = action.payload;
            const baskets = { ...state.baskets };
            const basket = baskets[basketType];
            const item = basket.items.find(it => variantId === it.id);
            item.quantity = quantity;
            basket.sum = countBasketSum(basket.items);

            return { ...state, baskets };
        }
        case CHANGE_ACTIVE_COMPANY: {
            const panelCompany = action.payload;

            return { ...state, panelCompany };
        }
        case SET_TICKETS_TO_BUY: {
            const ticketsData = action.payload;

            return { ...state, ticketsData };
        }
        case SET_PARKING_TICKETS_TO_BUY: {
            const parkingTicketsData = action.payload;

            return { ...state, parkingTicketsData };
        }
        case SET_BUS_TICKETS_TO_BUY: {
            const busTicketsData = action.payload;

            return { ...state, busTicketsData };
        }
        case SETLOADING: {
            const loadingPage = action.payload;

            return { ...state, loadingPage };
        }
        default:
            return state;
    }
};

export default rootReducer;
