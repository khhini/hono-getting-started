import { Hono } from "hono";
import { PrometheusClient } from "../../../utils/prometheus";
import MetricHandler from '../handlers/metricHandler';
import config from "../../../../config";

const promClient = new PrometheusClient(config.prometheus.metricPrefix);

const metricHandler = new MetricHandler(promClient.getRegistry()); 
metricHandler.init();

const router = new Hono();

router.route('/', metricHandler.getHandler())

export default router
