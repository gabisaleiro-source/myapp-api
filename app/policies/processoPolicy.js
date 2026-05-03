exports.viewAny = (user) => {
    return !!user;
};

exports.create = (user) => {
    return !!user;
};

exports.view = (user, processo) => {
    if (!user || !processo) return false;

    const userId = user._id || user.id;

    return (
        user.isAdmin === true ||
        userId.toString() === processo.user.toString()
    );
};

exports.update = exports.view;
exports.delete = exports.view;
exports.restore = exports.view;
exports.forceDelete = exports.view;