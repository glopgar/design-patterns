
abstract class Message {

    abstract getText(): string;

    abstract getLevel(): number;

}

class OutOfSugarEmergency extends Message {

    getText(): string {
        return 'Coffee machine is out of sugar!';
    }

    getLevel(): number {
        return 5;
    }

}

class SiteDownWarning extends Message {

    getText(): string {
        return 'Site\'s been down for 5 minutes!';
    }

    getLevel(): number {
        return 3;
    }

}

abstract class MessageDecorator extends Message {

    abstract getText(): string;

    abstract getLevel(): number;
    
}

class TimestampDecorator extends MessageDecorator {

    private message: Message;

    constructor(message: Message) {
        super();
        this.message = message;
    }

    getText(): string {
        const time = new Date().toLocaleString();
        return `[${time}] ${this.message.getText()}`;
    }

    getLevel(): number {
        return this.message.getLevel();
    }
}

class LevelAugmentationDecorator extends MessageDecorator {

    private message: Message;

    constructor(message: Message) {
        super();
        this.message = message;
    }

    getText(): string {
        return this.message.getText();
    }

    getLevel(): number {
        return this.message.getLevel() + 1;
    }
}

class Logger {

    static log(message: Message) {
        console.log(`${message.getLevel()}: ${message.getText()}`);
    }
}

const siteDown = new LevelAugmentationDecorator(new TimestampDecorator(new SiteDownWarning()));
const noSugar = new TimestampDecorator(new OutOfSugarEmergency());

Logger.log(siteDown);
Logger.log(noSugar);
