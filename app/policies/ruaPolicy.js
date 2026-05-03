const isAdmin = (user) => {
    return user && user.isAdmin === true;
};

exports.viewAny = (user) => {
    return !!user;
};

exports.view = (user, rua) => {
    return !!user && !!rua;
};

exports.create = isAdmin;
exports.update = isAdmin;
exports.delete = isAdmin;
exports.restore = isAdmin;
exports.forceDelete = isAdmin;