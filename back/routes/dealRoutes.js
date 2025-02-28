import express from 'express';
import { fetchDeals } from '../controller/deals.js';

const dealRouter = express.Router();

dealRouter.get('/', fetchDeals)

export default dealRouter;
