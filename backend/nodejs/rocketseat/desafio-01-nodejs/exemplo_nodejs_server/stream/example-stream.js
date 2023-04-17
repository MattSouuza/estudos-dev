import { Readable, Writable, Transform } from 'node:stream';

class OneToHundredStream extends Readable {
    index = 1;

    _read() {

        setTimeout(() => {
            if (this.index > 100) {
                this.push(null);

                return;
            }

            const buffer = Buffer.from(String(this.index++) + " ");
            this.push(buffer);
        }, 1000)
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, enconding, callback) {
        console.log(Number(chunk.toString()) * 10);
        callback();
    }
}

class InvertNumberStream extends Transform {
    _transform(chunk, enconding, callback) {
        const transformed = Number(chunk.toString() * -1);

        callback(null, Buffer.from(String(transformed)));
    }
}

new OneToHundredStream()
    .pipe(new InvertNumberStream())
    .pipe(new MultiplyByTenStream())