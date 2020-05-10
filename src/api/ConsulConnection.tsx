import axios, { AxiosInstance } from 'axios';

class ConsulConnection {
  #host: string;

  #port: string;

  #connection: AxiosInstance;

  /**
   * Creates an instance of consul connection.
   * Fallback to localhost if env variables is undefined
   */
  constructor() {
    if (typeof process.env.REACT_APP_CONSUL_URL !== 'undefined') {
      this.#host = process.env.REACT_APP_CONSUL_URL;
    } else {
      this.#host = '127.0.0.1';
    }
    if (typeof process.env.REACT_APP_CONSUL_PORT !== 'undefined') {
      this.#port = process.env.REACT_APP_CONSUL_PORT;
    } else {
      this.#port = '8500';
    }
    this.#connection = axios.create({
      baseURL: `http://${this.#host}:${this.#port}`,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  /**
   * Gets connection
   * @returns the axios connection
   */
  getConnection() {
    return this.#connection;
  }
}
export default ConsulConnection;
