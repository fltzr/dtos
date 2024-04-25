import { type Request, type Response, Router } from 'express';

import { validateBody } from './middleware/validate-body.middleware';
import { validateParams } from './middleware/validate-params.middleware';

import { CCCreateSchema, CCUpdateSchema } from './schemas/p/cc.dto';
import {
  createCC,
  readCC,
  readCCByResourceId,
  updateCC,
  deleteCC,
} from './controllers/cc.controller';

import { MCreateSchema, MUpdateSchema } from './schemas/p/m.dto';
import {
  createM,
  readMs,
  readMByResourceId,
  updateM,
  deleteM,
} from './controllers/m.controller';

import { PTCreateSchema, PTUpdateSchema } from './schemas/p/pt.dto';
import {
  createPT,
  readPTs,
  readPTByResourceId,
  updatePT,
  deletePT,
} from './controllers/pt.controller';

// Define routes
export const routes = Router();

routes
  /* [C]reate */
  .post('/cc', validateBody(CCCreateSchema, 'CREATE'), createCC)

  /* [R]ead  all catalog categories */
  .get('/cc', readCC)

  /* [R]ead by catalog_category_id or uuid */
  .get('/cc/:id', validateParams, readCCByResourceId)

  /* [U]pdate */
  .patch('/cc/:id', validateParams, validateBody(CCUpdateSchema, 'UPDATE'), updateCC)

  /* [D]elete */
  .delete('/cc/:id', validateParams, deleteCC);

routes
  /* [C]reate */
  .post('/m', validateBody(MCreateSchema, 'CREATE'), createM)

  /* [R]ead  all catalog categories */
  .get('/m', readMs)

  /* [R]ead by catalog_category_id or uuid */
  .get('/m/:id', validateParams, readMByResourceId)

  /* [U]pdate */
  .patch('/m/:id', validateParams, validateBody(MUpdateSchema, 'UPDATE'), updateM)

  /* [D]elete */
  .delete('/m/:id', validateParams, deleteM);

routes
  /* [C]reate */
  .post('/pt', validateBody(PTCreateSchema, 'CREATE'), createPT)

  /* [R]ead  all catalog categories */
  .get('/pt', readPTs)

  /* [R]ead by catalog_category_id or uuid */
  .get('/pt/:id', validateParams, readPTByResourceId)

  /* [U]pdate */
  .patch('/pt/:id', validateParams, validateBody(PTUpdateSchema, 'UPDATE'), updatePT)

  /* [D]elete */
  .delete('/pt/:id', validateParams, deletePT);
