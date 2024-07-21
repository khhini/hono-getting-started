import { Hono } from "hono";
import { setupPrometheusRegistry } from "../../../utils/prometheus";
import MetricHandler from '../handlers/metricHandler';
import config from "../../../../config";

const metricHandler = new MetricHandler(
  setupPrometheusRegistry(`${config.service.name.replace('-','_')}_${config.env}_`)
); 
metricHandler.init();

const router = new Hono();

router.route('/', metricHandler.getHandler())

export default router
