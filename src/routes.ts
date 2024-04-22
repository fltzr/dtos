import { type Request, type Response, Router } from 'express';

import { validateBody } from './middleware/validate-body.middleware';
import { validateParams } from './middleware/validate-params.middleware';

import {
  CatalogCategoryCreateSchema,
  CatalogCategoryUpdateSchema,
} from './schemas/products/catalog-category.dto';
import {
  createCatalogCategory,
  readCatalogCategories,
  readCatalogCategoriesByResourceId,
  updateCatalogCategory,
  deleteCatalogCategory,
} from './controllers/catalog-categories.controller';

import {
  ManufacturerCreateSchema,
  ManufacturerUpdateSchema,
} from './schemas/products/manufacturers.dto';
import {
  createManufacturer,
  readManufacturers,
  readManufacturerByResourceId,
  updateManufacturer,
  deleteManufacturer,
} from './controllers/manufacturers.controller';

import {
  ProductTypeCreateSchema,
  ProductTypeUpdateSchema,
} from './schemas/products/product-types.dto';
import {
  createProductType,
  readProductTypes,
  readProductTypeByResourceId,
  updateProductType,
  deleteProductType,
} from './controllers/product-types.controller';

// Define routes
export const routes = Router();

routes
  /* [C]reate */
  .post('/cc', validateBody(CatalogCategoryCreateSchema, 'CREATE'), createCatalogCategory)

  /* [R]ead  all catalog categories */
  .get('/cc', readCatalogCategories)

  /* [R]ead by catalog_category_id or uuid */
  .get('/cc/:id', validateParams, readCatalogCategoriesByResourceId)

  /* [U]pdate */
  .patch(
    '/cc/:id',
    validateParams,
    validateBody(CatalogCategoryUpdateSchema, 'UPDATE'),
    updateCatalogCategory
  )

  /* [D]elete */
  .delete('/cc/:id', validateParams, deleteCatalogCategory);

routes
  /* [C]reate */
  .post('/m', validateBody(ManufacturerCreateSchema, 'CREATE'), createManufacturer)

  /* [R]ead  all catalog categories */
  .get('/m', readManufacturers)

  /* [R]ead by catalog_category_id or uuid */
  .get('/m/:id', validateParams, readManufacturerByResourceId)

  /* [U]pdate */
  .patch(
    '/m/:id',
    validateParams,
    validateBody(ManufacturerUpdateSchema, 'UPDATE'),
    updateManufacturer
  )

  /* [D]elete */
  .delete('/m/:id', validateParams, deleteManufacturer);

routes
  /* [C]reate */
  .post('/pt', validateBody(ProductTypeCreateSchema, 'CREATE'), createProductType)

  /* [R]ead  all catalog categories */
  .get('/pt', readProductTypes)

  /* [R]ead by catalog_category_id or uuid */
  .get('/pt/:id', validateParams, readProductTypeByResourceId)

  /* [U]pdate */
  .patch(
    '/pt/:id',
    validateParams,
    validateBody(ProductTypeUpdateSchema, 'UPDATE'),
    updateProductType
  )

  /* [D]elete */
  .delete('/pt/:id', validateParams, deleteProductType);
