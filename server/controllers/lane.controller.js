import Lane from '../models/lane';
import uuid from 'uuid';
import Note from '../models/note'

export function getSomething(req, res) {
  return res.status(200).end();
}

//create new lane
export function addLane(req, res) {
  if (!req.body.name) {
    res.status(403).end();
  }

  const newLane = new Lane(req.body);

  newLane.notes = [];

  newLane.id = uuid();
  newLane.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
}

//get all lanes
export function getLanes(req, res) {
  Lane.find().exec((err, lanes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ lanes });
  });
}

//delete lane
export function deleteLane(req, res) {
  Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }

    lane.remove(() => {
      res.status(200).end();
    });
  });
}

//edit lane
export function editLane(req, res) {
  Lane.findOne({id: req.params.laneId})
    .then((lane) => {
      lane.name = req.body.name;
      return lane.save();
    })
    .then(() => {
      res.json(200).end();
    })
}