const routes = {
    'mainPage': '/',
    'communityCompanies.index': '/spolki-gminne',
    'communityCompanies.show': '/spolki-gminne/{slug}',
    'institutionEstate.index': '/osiedla-i-solectwa',
    'institution.show': '/instytucje/{slug}',
    'institution.show.news.index': '/instytucje/{slug}/aktualnosci',
    'institution.show.news.show': '/instytucje/{slug}/aktualnosci/{newsSlug}',
};


export default function route(name, parameters = []) {
    let item = routes[name];
    if (!item) throw new Error("This route name doesn't exist");

    let itemParams = item.match(/{[^{}]+}/g);
    if (!itemParams) itemParams = [];

    if (itemParams.length !== parameters.length) throw new Error('Length of given parameters is not exact with length of URL parameters');

    if (itemParams.length !== 0) {
        parameters.forEach((param, index) => {
            item = item.replace(itemParams[index], param);
        })
    }

    return item;
};