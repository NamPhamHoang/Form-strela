import axios from 'axios';
import {
    API_AD_SHOW,
    API_AIR_QUALITY_GET,
    API_AUTH_LOGIN,
    API_EVENTS_INDEX_MAIN_PAGE,
    API_IMAGE_LINKS_INDEX,
    API_MENU_INDEX,
    API_NEWS_SLIDER_INDEX,
    API_NEWS_SMALL_INDEX,
    API_QUESTIONNAIRE_GET,
    API_WEATHER_GET,
} from '../api';

export const FETCH_ERROR = 'FETCH_ERROR';
export const LOGIN = 'LOGIN';
export const SET_AVATAR = 'SET_AVATAR';
export const LOGOUT = 'LOGOUT';
export const FETCH_NEWS_SLIDER = 'FETCH_NEWS_SLIDER';
export const RESET_NEWS_SLIDER = 'RESET_NEWS_SLIDER';
export const FETCH_NEWS_SMALL = 'FETCH_NEWS_SMALL';
export const RESET_NEWS_SMALL = 'RESET_NEWS_SMALL';
export const BASKET_ADD = 'BASKET_ADD';
export const BASKET_REMOVE = 'BASKET_REMOVE';
export const BASKET_CHANGE_QUANTITY = 'BASKET_CHANGE_QUANTITY';
export const ADS_FETCH = 'ADS_FETCH';
export const ADS_RESET = 'ADS_RESET';
export const HAS_CHANGED_DATA_UPDATE = 'HAS_CHANGED_DATA_UPDATE';
export const CHANGE_ACTIVE_COMPANY = 'CHANGE_ACTIVE_COMPANY';
export const FETCH_QUESTIONNAIRE = 'FETCH_QUESTIONNAIRE';
export const RESET_QUESTIONNAIRE = 'RESET_QUESTIONNAIRE';
export const VOTE_QUESTIONNAIRE = `VOTE_QUESTIONNAIRE`;
export const FETCH_IMAGE_LINKS = `FETCH_IMAGE_LINKS`;
export const RESET_IMAGE_LINKS = `RESET_IMAGE_LINKS`;
export const FETCH_MENU = `FETCH_MENU`;
export const RESET_MENU = `RESET_MENU`;
export const FETCH_EVENTS_MAIN = `FETCH_EVENTS_MAIN`;
export const RESET_EVENTS_MAIN = `RESET_EVENTS_MAIN`;
export const FETCH_AIR_QUALITY = `FETCH_AIR_QUALITY`;
export const RESET_AIR_QUALITY = `RESET_AIR_QUALITY`;
export const FETCH_WEATHER = `FETCH_WEATHER`;
export const RESET_WEATHER = `RESET_WEATHER`;
export const SET_TICKETS_TO_BUY = `SET_TICKETS_TO_BUY`;
export const SET_PARKING_TICKETS_TO_BUY = `SET_PARKING_TICKETS_TO_BUY`;
export const SET_BUS_TICKETS_TO_BUY = `SET_BUS_TICKETS_TO_BUY`;
export const SETLOADING = `SETLOADING`;

export const fetchAdsAction = type => dispatch => {
    dispatch({
        type: ADS_RESET,
        payload: {
            loading: true,
        },
    });
    const API = API_AD_SHOW(type);
    axios
        .get(API)
        .then(response => {
            dispatch({
                type: ADS_FETCH,
                payload: {
                    ads: response.data.data,
                    type,
                },
            });
        })
        .catch(() => {});
};

export const basketAddAction = (basketType, item, variantId, quantity, seller, sellerName) => dispatch => {
    dispatch({
        type: BASKET_ADD,
        payload: {
            basketType,
            item,
            variantId,
            quantity,
            seller,
            sellerName,
        },
    });
};

export const basketRemoveAction = (basketType, variantId) => dispatch => {
    dispatch({
        type: BASKET_REMOVE,
        payload: {
            basketType,
            variantId,
        },
    });
};

export const basketChangeQuantityAction = (basketType, variantId, quantity) => dispatch => {
    dispatch({
        type: BASKET_CHANGE_QUANTITY,
        payload: {
            basketType,
            variantId,
            quantity,
        },
    });
};

export const fetchNewsSliderAction = () => dispatch => {
    dispatch({
        type: RESET_NEWS_SLIDER,
        payload: {
            loading: true,
        },
    });
    axios
        .get(API_NEWS_SLIDER_INDEX)
        .then(response => {
            const { news } = response.data;
            dispatch({
                type: FETCH_NEWS_SLIDER,
                payload: {
                    news,
                    loading: false,
                },
            });
        })
        .catch(() => {});
};

export const fetchNewsSmallAction = () => dispatch => {
    dispatch({
        type: RESET_NEWS_SMALL,
        payload: {
            loading: true,
        },
    });
    (async () => {
        try {
            const box1 = await axios.get(`${API_NEWS_SMALL_INDEX}?boxName=box1`);
            const box2 = await axios.get(`${API_NEWS_SMALL_INDEX}?boxName=box2`);
            const box3 = await axios.get(`${API_NEWS_SMALL_INDEX}?boxName=box3`);
            const box4 = await axios.get(`${API_NEWS_SMALL_INDEX}?boxName=box4`);
            const news = {
                box1: box1.data.news,
                box2: box2.data.news,
                box3: box3.data.news,
                box4: box4.data.news,
            };
            dispatch({
                type: FETCH_NEWS_SMALL,
                payload: {
                    news,
                    loading: false,
                },
            });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    })();
};

export const fetchQuestionnaireAction = hash => dispatch => {
    dispatch({
        type: RESET_QUESTIONNAIRE,
        payload: {
            loading: true,
        },
    });
    const fd = {
        // eslint-disable-next-line camelcase
        questionnaire_cookie_identifier: hash,
    };
    axios
        .post(API_QUESTIONNAIRE_GET, fd)
        .then(response => {
            dispatch({
                type: FETCH_QUESTIONNAIRE,
                payload: response.data,
            });
        })
        .catch(() => {});
};

export const voteQuestionnaireAction = () => dispatch => {
    dispatch({
        type: VOTE_QUESTIONNAIRE,
        payload: null,
    });
};

export const fetchImageLinksAction = () => dispatch => {
    dispatch({
        type: RESET_IMAGE_LINKS,
        payload: {
            loading: true,
        },
    });
    axios
        .get(API_IMAGE_LINKS_INDEX)
        .then(response => {
            const { imageLinks } = response.data;
            dispatch({
                type: FETCH_IMAGE_LINKS,
                payload: {
                    imageLinks,
                    loading: false,
                },
            });
        })
        .catch(() => {});
};

export const fetchMenuAction = () => dispatch => {
    dispatch({
        type: RESET_MENU,
        payload: {
            loading: true,
        },
    });
    axios
        .get(API_MENU_INDEX)
        .then(response => {
            const { menuItems } = response.data;
            dispatch({
                type: FETCH_MENU,
                payload: {
                    menu: menuItems,
                    loading: false,
                },
            });
        })
        .catch(() => {});
};

export const fetchEventsMainAction = () => dispatch => {
    dispatch({
        type: RESET_EVENTS_MAIN,
        payload: {
            loading: true,
        },
    });
    axios
        .get(API_EVENTS_INDEX_MAIN_PAGE)
        .then(response => {
            const { events } = response.data;
            dispatch({
                type: FETCH_EVENTS_MAIN,
                payload: {
                    events,
                    loading: false,
                },
            });
        })
        .catch(() => {});
};

export const fetchAirQualityAction = () => dispatch => {
    dispatch({
        type: RESET_AIR_QUALITY,
        payload: {
            loading: true,
        },
    });
    axios
        .get(API_AIR_QUALITY_GET)
        .then(response => {
            dispatch({
                type: FETCH_AIR_QUALITY,
                payload: {
                    airQuality: response.data,
                    loading: false,
                },
            });
        })
        .catch(() => {});
};

export const fetchWeatherAction = () => dispatch => {
    dispatch({
        type: RESET_WEATHER,
        payload: {
            loading: true,
        },
    });
    axios
        .get(API_WEATHER_GET)
        .then(response => {
            dispatch({
                type: FETCH_WEATHER,
                payload: {
                    weather: response.data,
                    loading: false,
                },
            });
        })
        .catch(() => {});
};

export const logInAction = (email, password) => dispatch => {
    const fd = {
        email,
        password,
    };
    axios
        .post(API_AUTH_LOGIN, fd)
        .then(response => {
            const {
                access_token: token,
                hasChangedData,
                role,
                isUserCityMember,
                expires_in: expiresIn,
                daysLeftToActivate,
                avatar,
            } = response.data;
            dispatch({
                type: LOGIN,
                payload: {
                    hasChangedData,
                    role,
                    token,
                    isUserCityMember,
                    expiresIn,
                    daysLeftToActivate,
                    avatar,
                },
            });
        })
        .catch(() => {
            dispatch({
                type: FETCH_ERROR,
                payload: 'Niepoprawny email lub hasło',
            });
        });
};

export const logOutAction = () => dispatch => {
    dispatch({
        type: LOGOUT,
        payload: {},
    });
};

export const updateHasChangedDataAction = bool => dispatch => {
    dispatch({
        type: HAS_CHANGED_DATA_UPDATE,
        payload: bool,
    });
};

export const changeActiveCompanyAction = (id, name, categoryId) => dispatch => {
    dispatch({
        type: CHANGE_ACTIVE_COMPANY,
        payload: { id, name, categoryId },
    });
};

export const newLogInAction = async data => {
    try {
        const response = await axios.post(API_AUTH_LOGIN, data);
        return response.data;
    } catch (e) {
        return e;
    }
};
