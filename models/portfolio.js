const db = require('../lib/db');
const Tools = require('../utils/tools');
const { formatPagingInfos, getPageInfo, generateFilterQuery, generateOrderAndFilterQuery } = require('../utils/graphql-util');

module.exports = {
  getByCursor: function(id, fields, pagingInfos){
    return new Promise(function(resolve, reject) {
      (async function(){
        _logger.verbose('pagingInfos', pagingInfos)
        const { first, after, last, before, limit, cursor } = formatPagingInfos(pagingInfos);
        let randomSeed;

        const defaultFields = [
          'portfolio.id',
          'portfolio.name',
          'portfolio.description'
        ];
        if(fields){
          //ensure that id is requested
          fields.push('id');
          //format fields to map them with the DB fields
          fields = fields.map(field => 'portfolio.'+field);
        }
        const requestedFields = fields || defaultFields;

        //select the ordered fields to get their values for further paging
        //map the fields if necessary
        if(pagingInfos.orderBy){
          pagingInfos.orderBy.forEach(ordering => {
            ordering.sort = ordering.sort.toLowerCase();
            ordering.field = 'portfolio.'+ordering.sort.toLowerCase();
            ordering.direction = ordering.direction.toUpperCase();
            if(ordering.sort === 'rand'){
              randomSeed = (isFinite(ordering.seed)) ? parseInt(ordering.seed) : "";
            }
            else{
              requestedFields.push(ordering.field);
            }
          });
        }
        //map the filtering fields if necessary
        if(pagingInfos.filtering){
          pagingInfos.filtering.forEach(filter => {
            filter.field = 'portfolio.'+filter.field.toLowerCase();
          });
        }
        
        const query = db('portfolio');
        //dedup required fields upon selection
        query.select([...new Set(requestedFields)]);
        //generate a random (but unique and predictible) uuid if a random sorting is required
        if(randomSeed !== undefined){
          query.select(db.raw(`CONCAT(RAND(${randomSeed}), BIN_TO_UUID(portfolio.uuid, true)) as uuid`))
        }
        else{
          query.select(db.raw('BIN_TO_UUID(portfolio.uuid, true) as uuid'))
        }

        if(id){
          query.where('portfolio.id', id);
        }
        else{
          //declare the types with JSON data as the requests will use JSON functions
          const jsonFields = ['portfolio.types'];
          //get limit + 1 to check if there id a next/previous page available
          query.limit(limit+1);
          generateOrderAndFilterQuery(query, pagingInfos.orderBy, pagingInfos.filtering, 'portfolio.uuid', cursor, !!last, jsonFields);
        }
        
        let portfolio = await query;
        //parse JSON objects
        const JSONFields = ['types', 'images', 'technology_ids'];
        if(requestedFields.some(item => item.split('.').some(field => JSONFields.indexOf(field) !== -1))){
          Tools.parseKeys(portfolio, JSONFields);
        }

        if(id){
          resolve(portfolio[0]);
        }
        else{
          _logger.verbose('portfolio', portfolio);
          const { pageInfo, data } = getPageInfo(portfolio, {first: first, last: last, limit: limit, cursor: cursor, orderBy: pagingInfos.orderBy});
          resolve({data: data, pageInfo: pageInfo});
        }
      })().catch(reject);
    });
  },
  getCount: function(filtering){
    return new Promise(function(resolve, reject) {
      const query = db('portfolio')
      .count('id as count')
      .first();

      generateFilterQuery(query, filtering);

      query.then(function(result){
        resolve(result.count);
      }, reject);
    });
  },
  getTechnologies: function(fields){
    return new Promise(function(resolve, reject) {
      (async function(){
        const defaultFields = [
          'technologies.id',
          'technologies.name'
        ];
        if(fields){
          //ensure that id is requested
          fields.push('id');
          //format fields to map them with the DB fields
          fields = fields.map(field => 'technologies.'+field);
        }
        const requestedFields = fields || defaultFields;

        const query = db('technologies')
        //dedup required fields upon selection
        .select([...new Set(requestedFields)]);

        const technologies = await query;
        resolve(technologies);
      })().catch(reject);
    });
  },
  getPortfolioSearchFields: function(fields){
    return new Promise(function(resolve, reject) {
      (async function(){
        const defaultFields = [
          'clients',
          'types'
        ];
        const requestedFields = fields || defaultFields;
        const searchFields = {};
        if(requestedFields.indexOf('clients') !== -1){
          const clientsQuery = await db('portfolio')
          .distinct('client')
          .orderBy('client', 'ASC');
          searchFields.clients = clientsQuery.map(item => item.client);
        }
        if(requestedFields.indexOf('types') !== -1){
          const clientsQuery = await db('portfolio')
          .distinct('types');
          searchFields.types = [...new Set(clientsQuery.map(item => JSON.parse(item.types)).reduce((prev, curr) => prev.concat(curr), []))].sort((a, b) => a.localeCompare(b));
        }
        resolve(searchFields);
      })().catch(reject);
    });
  }
}