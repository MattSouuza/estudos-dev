import { Readable } from 'node:stream';

class OneToHundredStream extends Readable {
    index = 1;

    _read() {

        setTimeout(() => {
            if (this.index > 3) {
                this.push(null);

                return;
            }

            const buffer = Buffer.from(String(this.index++) + " ");
            this.push(buffer);
        }, 1000)
    }
}

fetch("http://localhost:3001", {
    method: "POST",
    body: new OneToHundredStream()
})
    .then(res => res.text())
    .then(res => {
        console.log(res);
    })