import { Writable, WritableOptions } from "stream"
import { StringDecoder } from "string_decoder"
import { Console } from "console"

class StringWritable extends Writable {
  data = ""
  decoder: StringDecoder
  constructor(options?: WritableOptions) {
    super(options)
    this.decoder = new StringDecoder("utf-8")
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _write(chunk: any, encoding: string, callback: () => void) {
    this.data += this.decoder.write(chunk)
    callback()
  }

  _destroy(err: Error, callback: () => void) {
    this.data += this.decoder.end()
    callback()
  }
}

export class MockCli {
  mocks: [Writable, Writable, Writable["write"]][] = []
  stdout?: StringWritable
  stderr?: StringWritable
  console = global.console
  // eslint-disable-next-line @typescript-eslint/unbound-method

  mock(stream: Writable) {
    const mock = new StringWritable()
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.mocks.push([mock, stream, stream.write])
    // eslint-disable-next-line @typescript-eslint/unbound-method
    stream.write = mock.write.bind(mock)
    return mock
  }

  restore() {
    for (const [mock, stream, write] of this.mocks) {
      mock.destroy()
      // eslint-disable-next-line @typescript-eslint/unbound-method
      stream.write = write.bind(stream)
    }
    global.console = this.console
  }

  setup() {
    this.stdout = this.mock(global.process.stdout)
    this.stderr = this.mock(global.process.stderr)
    this.console = global.console
    global.console = new Console({ stdout: this.stdout, stderr: this.stderr })
  }

  test(func: () => void) {
    try {
      this.setup()
      func()
    } finally {
      this.restore()
    }
  }

  async testAsync<T>(func: () => Promise<T>) {
    this.setup()
    try {
      await func()
    } finally {
      this.restore()
    }
  }
}
