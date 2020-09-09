import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { UseAuth } from '../../hooks/useAuth';
import Notifications from './Notifications';
import Settings from './Settings';
// import ReportProblem from './ReportProblem';
// import OrderFoodPanel from './OrderFoodPanel';
// import BuyTicketPanel from './BuyTicketPanel';
// import CitizenCardPanel from './CitizenCardPanel';
import EMarketPanelObserved from './EMarketPanelObserved';
import EMarketPanelMy from './EMarketPanelMy';
// import Rubbish from './Rubbish';
import CompleteData from './CompleteData';
import { CompanyRoute } from './Company/CompanyRoute';
// import {MyParkingTickets} from './Tickets/Parking';
// import {EMail} from './EMail';
import { Dashboard } from './Dashboard';

export const PanelRoute = () => {
    return (
        <>
            <UseAuth />
            {/* <UseChangeData /> */}
            <Switch>
                <Route path="/panel" exact component={Dashboard} />
                <Route path="/panel/powiadomienia" component={Notifications} />
                <Route path="/panel/ustawienia" component={Settings} />
                {/* <Route path="/panel/zglos-problem" component={ReportProblem} /> */}
                {/* <Route path="/panel/moje-zamowienia" component={OrderFoodPanel} /> */}
                {/* <Route path="/panel/kupione-bilety" component={BuyTicketPanel} /> */}
                {/* <Route path="/panel/karta-mieszkanca" component={CitizenCardPanel} /> */}
                <Route path="/panel/e-targ/obserwowane" component={EMarketPanelObserved} />
                <Route path="/panel/e-targ/moj" component={EMarketPanelMy} />
                {/* <Route path="/panel/odpady" component={Rubbish} /> */}
                <Route path="/panel/uzupelnij-dane" component={CompleteData} />
                <Route path="/panel/firma" component={CompanyRoute} />

                {/* <Route path="/panel/bilety/parking" component={MyParkingTickets} /> */}
                {/* <Route path="/panel/poczta" component={EMail} /> */}
            </Switch>
        </>
    );
};
