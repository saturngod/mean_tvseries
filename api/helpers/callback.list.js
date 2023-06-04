const callbackify = require("util").callbackify;

const ModelFindAllCallback = callbackify(function (model,offset, count) {
    return model.find().skip(offset).limit(count).exec();
});

const ModelFindWithSlectAllCallback = callbackify(function (model,objectId,select) {
    return model.findById(objectId).select(select).exec();
});

const ModelAddCallback = callbackify(function (model,series) {
    return model.create(series);
});

const ModelFindOneCallback = callbackify(function (model,objectId) {
    return model.findById(objectId).exec();
});

const ModelDeleteCallback = callbackify(function (model,objectId) {
    return model.findByIdAndDelete(objectId).exec();
});

const ModelSaveCallback = callbackify(function (model) {
    return model.save();
});

module.exports = {
    ModelFindAllCallback,
    ModelAddCallback,
    ModelFindOneCallback,
    ModelDeleteCallback,
    ModelSaveCallback,
    ModelFindWithSlectAllCallback
}