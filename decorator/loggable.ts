
interface Loggable {

    getText(): string;

    getLevel(): number;

}

class Message implements Loggable {

    private text: string;
    private level: number;

    constructor(text: string, level: number = 0) {
        this.text = text;
        this.level = level;
    }

    getText(): string {
        return this.text;
    }

    getLevel(): number {
        return this.level;
    }
}

abstract class LoggableDecorator implements Loggable {

    private loggable: Loggable;

    constructor(loggable: Loggable) {
        this.loggable = loggable;
    }

    protected getLoggable() {
        return this.loggable;
    }

    getText(): string {
        return this.getLoggable().getText();
    }

    getLevel(): number {
        return this.getLoggable().getLevel();
    }
}

class TimestampDecorator extends LoggableDecorator {

    getText(): string {
        const time = new Date().toLocaleString();
        return `[${time}] ${super.getText()}`;
    }
}

class LevelAugmentationDecorator extends LoggableDecorator {

    private augmentationLevels: number;

    constructor(loggable: Loggable, augmentationLevels: number = 1) {
        super(loggable);
        this.augmentationLevels = augmentationLevels;
    }

    getLevel(): number {
        return super.getLevel() + this.augmentationLevels;
    }
}



class Logger {

    static log(loggable: Loggable) {
        console.log(
            `${loggable.getLevel()}: ${loggable.getText()}`
        );
    }
}

// Log some decorated messages

Logger.log(
    new LevelAugmentationDecorator(
        new TimestampDecorator(
            new Message('Coffe machine is out of sugar')
        ),
        999
    )
);

Logger.log(
    new LevelAugmentationDecorator(
        new Message('Servers are down'),
        -20
    )
);
