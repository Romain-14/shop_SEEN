import parseurl from "parseurl";

const protectedPath = [
    "/admin",
    "/add_post",
    "/edit_post",
    "/delete_post",
    "/add_author",
    "/edit_author",
    "/delete_author",
    "/add_category",
    "/edit_category",
    "/delete_category",
];

const adminPath = ["/admin"];

export default (req, res, next) => {
    console.log(req.session);
    const pathname = parseurl(req).pathname;
    
    let {user, isLogged} = req.session;

    if (!user) {
        user = null;
        isLogged = false;
    }

    if (protectedPath.indexOf(pathname) !== -1 && isLogged === false) {
        res.redirect("/login");
    } else if (adminPath.indexOf(pathname) !== -1 && user.role !== "admin") {
        res.redirect("/");
    } else {
        next();
    }
};
