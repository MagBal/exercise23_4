import { Router } from 'express';
import * as LaneController from '../controllers/lane.controller';

const router = new Router();

// get all Lanes
router.route('/lanes').get(LaneController.getLanes);

// add new Lane
router.route('/lanes').post(LaneController.addLane);

// delete lane
router.route('/lanes/:laneId').delete(LaneController.deleteLane);

// edit lane
router.route('/lanes/:laneId').put(LaneController.editLane);

export default router;
