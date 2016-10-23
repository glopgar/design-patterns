var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Message = (function () {
    function Message() {
    }
    return Message;
}());
var OutOfSugarEmergency = (function (_super) {
    __extends(OutOfSugarEmergency, _super);
    function OutOfSugarEmergency() {
        _super.apply(this, arguments);
    }
    OutOfSugarEmergency.prototype.getText = function () {
        return 'Coffee machine is out of sugar!';
    };
    OutOfSugarEmergency.prototype.getLevel = function () {
        return 5;
    };
    return OutOfSugarEmergency;
}(Message));
var SiteDownWarning = (function (_super) {
    __extends(SiteDownWarning, _super);
    function SiteDownWarning() {
        _super.apply(this, arguments);
    }
    SiteDownWarning.prototype.getText = function () {
        return 'Site\'s been down for 5 minutes!';
    };
    SiteDownWarning.prototype.getLevel = function () {
        return 3;
    };
    return SiteDownWarning;
}(Message));
var MessageDecorator = (function (_super) {
    __extends(MessageDecorator, _super);
    function MessageDecorator() {
        _super.apply(this, arguments);
    }
    return MessageDecorator;
}(Message));
var TimestampDecorator = (function (_super) {
    __extends(TimestampDecorator, _super);
    function TimestampDecorator(message) {
        _super.call(this);
        this.message = message;
    }
    TimestampDecorator.prototype.getText = function () {
        var time = new Date().toLocaleString();
        return "[" + time + "] " + this.message.getText();
    };
    TimestampDecorator.prototype.getLevel = function () {
        return this.message.getLevel();
    };
    return TimestampDecorator;
}(MessageDecorator));
var LevelAugmentationDecorator = (function (_super) {
    __extends(LevelAugmentationDecorator, _super);
    function LevelAugmentationDecorator(message) {
        _super.call(this);
        this.message = message;
    }
    LevelAugmentationDecorator.prototype.getText = function () {
        return this.message.getText();
    };
    LevelAugmentationDecorator.prototype.getLevel = function () {
        return this.message.getLevel() + 1;
    };
    return LevelAugmentationDecorator;
}(MessageDecorator));
var Logger = (function () {
    function Logger() {
    }
    Logger.log = function (message) {
        console.log(message.getLevel() + ": " + message.getText());
    };
    return Logger;
}());
var siteDown = new LevelAugmentationDecorator(new TimestampDecorator(new SiteDownWarning()));
var noSugar = new TimestampDecorator(new OutOfSugarEmergency());
Logger.log(siteDown);
Logger.log(noSugar);
