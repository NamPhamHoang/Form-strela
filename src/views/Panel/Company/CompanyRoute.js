import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import requireAuth from '../../../middlewares/require_auth';
// import AdPanelCompany from "../AdPanelCompany";
import PanelCompanyIndex from '../PanelCompanyIndex';
import PanelCompanyEdit from '../PanelCompanyEdit';
// import RestaurantOrders from "../RestaurantOrders";
// import RestaurantSettings from "../RestaurantSettings";
// import RestaurantMenu from "../RestaurantMenu";
import { UseCompany } from '../../../hooks/useCompany';

export const CompanyRoute = () => {
    const redirect = UseCompany();
    return (
        <>
            {redirect && <Redirect to={redirect} />}
            <Switch>
                {/* <Route
                    path="/panel/firma/miejsca-reklamowe"
                    component={requireAuth(AdPanelCompany, 'user')}
                /> */}
                <Route path="/panel/firma/firmy" exact component={requireAuth(PanelCompanyIndex, 'user')} />
                <Route path="/panel/firma/firmy/edytuj" exact component={requireAuth(PanelCompanyEdit, 'user')} />
                {/*    <Route
                    path="/panel/firma/restauracja/zamowienia"
                    component={requireAuth(RestaurantOrders, 'user')}
                />
                <Route
                    path="/panel/firma/restauracja/ustawienia"
                    component={requireAuth(RestaurantSettings, 'user')}
                />
                <Route
                    path="/panel/firma/restauracja/menu"
                    component={requireAuth(RestaurantMenu, 'user')}
                /> */}
            </Switch>
        </>
    );
};
