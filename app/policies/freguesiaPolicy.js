const isAdmin = (user) => {
    return user && user.isAdmin === true;
};

exports.viewAny = (user) => {
    return !!user;
};

exports.view = (user, freguesia) => {
    return !!user && !!freguesia;
};

exports.create = isAdmin;
exports.update = isAdmin;
exports.delete = isAdmin;
exports.restore = isAdmin;
exports.forceDelete = isAdmin;