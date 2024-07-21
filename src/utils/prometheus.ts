import {collectDefaultMetrics, Registry} from 'prom-client';

class PrometheusClient {
  private registry: Registry
  constructor(prefix: string) {
    this.registry = new Registry();
    collectDefaultMetrics({
      register: this.registry,
      prefix
    })
  }

  getRegistry(): Registry{
    return this.registry
  }
}

export { PrometheusClient }
