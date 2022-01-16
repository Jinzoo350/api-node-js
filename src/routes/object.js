import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import object from '../models/object';
import authorize from '../middlewares';
import { Op } from 'sequelize';

const router = Router();

router.post('/create', async (req, res) => {
  const id = uuidv4();
  const create = await req.context.models.Object.create({
    id: id,
    name: req.body.name,
  });
  res.status(201).send(create);
});

router.put('/update/:id', async (req, res) => {
  const update = await req.context.models.Object.update(
    {
      name: req.body.name,
    },
    {
      where: {
        id: req.params.id,
      },
    },
  );
  res.status(201).send(update);
});

router.post('/delete', async (req, res) => {
  await req.context.models.Object.destroy({
    where: {
      id: req.body.id,
    },
  });
  res.status(204).send();
});

router.get('/', async (req, res) => {
  const list = await req.context.models.Object.findAll();
  res.send(list);
});

router.get('/:id', async (req, res) => {
  const getById = await req.context.models.Object.findByPk(
    req.params.id,
  );
  res.send(getById);
});

export default router;
