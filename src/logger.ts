
class Logger {
    private elem: JQuery<HTMLPreElement> = <any>null;

    private container() {
        if (this.elem) {
            this.elem = $("#errorLog");
        }

        return this.elem;
    }

    log(message: string) {
        let content = this.container().text();
        if (content) {
            content += "\n";
        }

        this.container().text(content + message);
    }

    clear() {
        this.container().text("");
    }
}

export const logger = new Logger();