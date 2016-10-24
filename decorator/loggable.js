var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Message = (function () {
    function Message(text, level) {
        if (level === void 0) { level = 0; }
        this.text = text;
        this.level = level;
    }
    Message.prototype.getText = function () {
        return this.text;
    };
    Message.prototype.getLevel = function () {
        return this.level;
    };
    return Message;
}());
var LoggableDecorator = (function () {
    function LoggableDecorator(loggable) {
        this.loggable = loggable;
    }
    LoggableDecorator.prototype.getLoggable = function () {
        return this.loggable;
    };
    LoggableDecorator.prototype.getText = function () {
        return this.getLoggable().getText();
    };
    LoggableDecorator.prototype.getLevel = function () {
        return this.getLoggable().getLevel();
    };
    return LoggableDecorator;
}());
var TimestampDecorator = (function (_super) {
    __extends(TimestampDecorator, _super);
    function TimestampDecorator() {
        _super.apply(this, arguments);
    }
    TimestampDecorator.prototype.getText = function () {
        var time = new Date().toLocaleString();
        return "[" + time + "] " + _super.prototype.getText.call(this);
    };
    return TimestampDecorator;
}(LoggableDecorator));
var LevelAugmentationDecorator = (function (_super) {
    __extends(LevelAugmentationDecorator, _super);
    function LevelAugmentationDecorator(loggable, augmentationLevels) {
        if (augmentationLevels === void 0) { augmentationLevels = 1; }
        _super.call(this, loggable);
        this.augmentationLevels = augmentationLevels;
    }
    LevelAugmentationDecorator.prototype.getLevel = function () {
        return _super.prototype.getLevel.call(this) + this.augmentationLevels;
    };
    return LevelAugmentationDecorator;
}(LoggableDecorator));
var Logger = (function () {
    function Logger() {
    }
    Logger.log = function (loggable) {
        console.log(loggable.getLevel() + ": " + loggable.getText());
    };
    return Logger;
}());
// Log some decorated messages
Logger.log(new LevelAugmentationDecorator(new TimestampDecorator(new Message('Coffe machine is out of sugar')), 999));
Logger.log(new LevelAugmentationDecorator(new Message('Servers are down'), -20));
