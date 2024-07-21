import {collectDefaultMetrics, Registry} from 'prom-client';

function setupPrometheusRegistry(prefix: string): Registry {
  const registry =  new Registry();
  
  collectDefaultMetrics({
    register: registry,
    prefix
  })

  return registry
}

export { setupPrometheusRegistry }
