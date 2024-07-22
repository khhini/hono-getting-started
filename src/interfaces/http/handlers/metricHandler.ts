import { Hono } from "hono";
import { Registry } from "prom-client";
import { logger } from "../../../utils/logger";

class MetricHandler {
  private registry: Registry
  private handler: Hono

  constructor(promRegistry: Registry) { 
    this.registry = promRegistry;
    this.handler = new Hono();
  }

  init(){
    this.handler.get('/', async (c) => {
      c.header('Content-Type', this.registry.contentType);
      return c.body(await this.registry.metrics());
    });
  }

  getHandler(): Hono {
    return this.handler
  }
}

export default MetricHandler
