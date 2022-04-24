
export const homePage = (req, res) => {
    res.render('layout', {template:"home"});
};

export const shopPage = (req, res) => {
    res.render('layout', {template:"shop"});
};

