const db = require('../lib/db');

const Util = {
  formatPagingInfos: function(infos, defaultLimit){
    const pagingInfos = infos || {};
    //set priority to forward paging by default with limit items
    if(pagingInfos.after){
      pagingInfos.first = (Number.isInteger(pagingInfos.first) && pagingInfos.first > 0) ? pagingInfos.first : defaultLimit;
      delete pagingInfos.last;
      delete pagingInfos.before;
    }
    else if(pagingInfos.before){
      pagingInfos.last = (Number.isInteger(pagingInfos.last) && pagingInfos.last > 0) ? pagingInfos.last : defaultLimit;
      delete pagingInfos.first;
    }
    else if(pagingInfos.last && !pagingInfos.first){
      pagingInfos.last = (Number.isInteger(pagingInfos.last) && pagingInfos.last > 0) ? pagingInfos.last : defaultLimit;
    }
    else{
      pagingInfos.first = (Number.isInteger(pagingInfos.first) && pagingInfos.first > 0) ? pagingInfos.first : defaultLimit;
      delete pagingInfos.last;
    }
    pagingInfos.limit = (pagingInfos.last && pagingInfos.last > 0) ? pagingInfos.last : pagingInfos.first;
    pagingInfos.cursor = (pagingInfos.after || pagingInfos.before) ? JSON.parse(new Buffer.from(pagingInfos.after || pagingInfos.before, 'base64').toString('ascii')) : null;

    return pagingInfos;
  },
  /**
   * 
   * @param {Array} data An array of items, that have at least an uuid
   * @param {Object} pagingInfos An object that represent have the first, last, limit and cursor properties of the current request, previously generated by this function.
   * @returns {Object} An object with the formatted data and the pageInfo object as defined by the Relay specification.
   */
  getPageInfo: function(data, {first, last, limit, cursor, orderBy}){
    //set default next/previous page
    _logger.verbose('first', first)
    const hasNextPage = !!(first && data.length > limit);
    const hasPreviousPage = !!(last && data.length > limit);
    data = data.slice(0, limit);
    if(last){
      data.reverse();
    }

    const dataLength = data.length;
    const firstItem = data[0];
    const lastItem = data[dataLength-1];

    const startCursor = {
      uuid: (dataLength > 0) ? firstItem.uuid : null,
      //if this request has some posts, the previous one will have a next page, with this very result
      hasNextPage: (dataLength > 0)
    }
    const endCursor = {
      uuid: (dataLength > 0) ? lastItem.uuid : null,
      //if this request has some posts, the next one will have a previous page, with this very result
      hasPreviousPage: (dataLength > 0)
    }
    
    if(orderBy && orderBy.length > 0){
      //build the orderBy reference for further paging
      startCursor.lastOrderingValues = {};
      endCursor.lastOrderingValues = {};
      orderBy.forEach(item => {
        startCursor.lastOrderingValues[item.sort] = firstItem[item.sort];
        endCursor.lastOrderingValues[item.sort] = lastItem[item.sort];
      });
    }
    _logger.verbose("startCursor", startCursor, "endCursor", endCursor);
    const pageInfo = {
      hasNextPage: (dataLength > 0 && last && cursor) ? (cursor.hasNextPage || false) : hasNextPage,
      hasPreviousPage: (dataLength > 0 && first && cursor) ? (cursor.hasPreviousPage || false) : hasPreviousPage,
      startCursor: new Buffer.from(JSON.stringify(startCursor)).toString('base64'),
      endCursor: new Buffer.from(JSON.stringify(endCursor)).toString('base64') 
    }
    _logger.verbose("pageInfo", pageInfo);
    return {data: data, pageInfo: pageInfo};
  },
  /**
   * Generate the "where" clauses of the query that matches the wanted filtering.
   * @param {Object} query A Knex Query Builder object
   * @param {Array} filtering An array of filters to apply to the query, with format [{operator:OPERATOR<String>, field:FIELDNAME<String>, value:VALUE<Array>}]
   * @param {String} uuidField The name of the uuid field of the table (tie breaker)
   * @param {Object} cursor The cursor that have the uuid value in its "uuid" property
   */
  generateFilterQuery: function(query, filtering, uuidField, cursor){
    //generate filtering rules, regarding the filtering array elements
    if(filtering && filtering.length > 0){
      filtering.forEach(filter => {
        if(filter.value && Array.isArray(filter.value) && filter.value.length > 0){
          switch(filter.operator){
            case "EQUAL":
              query.where(filter.field, filter.value[0]);
            break;
            case "NOT_EQUAL":
              query.where(filter.field, "!=", filter.value[0]);
            break;
            case "IN":
              query.whereIn(filter.field, filter.value);
            break;
            case "NOT_IN":
              query.whereNotIn(filter.field, filter.value);
            break;
            case "GREATER_THAN":
              query.where(filter.field, ">", filter.value[0]);
            break;
            case "LESS_THAN":
              query.where(filter.field, "<", filter.value[0]);
            break;
          }
        }
      });
    }
    //in any case, discard the cursor element from the result set
    if(cursor && cursor.uuid){
      query.where(db.raw(`BIN_TO_UUID(${uuidField}, true)`), "!=", cursor.uuid);
    }
  },
  /**
   * Generate the "orberBy" clauses of the query that matches the wanted ordering, and the "where" regarding the last result, if any.
   * @param {Object} query A Knex Query Builder object
   * @param {Array} orderBy An array of filters to apply to the query, with format [{operator:OPERATOR<String>, field:FIELDNAME<String>, value:VALUE<Array>}]
   * @param {String} uuidField The name of the uuid field of the table (tie breaker)
   * @param {Object} cursor The cursor that have the uuid value in its "uuid" property, and the previous ordering values in its "lastOrderingValues" property, with format Object.SORT_FIELD_NAME = "LAST_VALUE"
   * @param {Boolean} isInverted Boolean that tells if the ordering must be inverted (backwards pagination) or not (forward pagination)
   */
  generateOrderQuery: function(query, orderBy, uuidField, cursor, isInverted){
    //handle orderBy
    if(orderBy && orderBy.length > 0){
      //generate orderBy rules, regarding the orderBy array elements order
      orderBy.forEach(order => {
        const orderDirection = (isInverted) ? ((order.direction === 'ASC') ? 'DESC' : 'ASC') : order.direction;
        query.orderBy(order.sort, orderDirection);
      });
      //the implementation is described here : https://stackoverflow.com/questions/56989560/how-to-get-a-cursor-for-pagination-in-graphql-from-a-database
      function loop(currentQuery, index){
        const ordering = orderBy[index];

        if(cursor && cursor.lastOrderingValues[ordering.sort]){
          const lastValue = cursor.lastOrderingValues[ordering.sort];
          const direction = (ordering.direction === "ASC") ? ((isInverted) ? '<' : '>') : ((isInverted) ? '>' : '<');

          currentQuery.where(ordering.field, direction, lastValue)
          .orWhere(function(){
            this.where(ordering.field, lastValue);
            if(index < (orderBy.length - 1)){
              loop(this, (index+1));
            }
            else{
              //generate the tie breaker as the last orderBy rule
              this.where(uuidField, (isInverted) ? '>' : '<', db.raw(`UUID_TO_BIN("${cursor.uuid}", true)`));
            }
          });
        }
      };
      //launch the recursive generation
      loop(query, 0);
    }
    else if(cursor && cursor.uuid){
      //generate the default tie breaker orderBy rule from the cursor UUID
      query.where(uuidField, (isInverted) ? '>' : '<', db.raw(`UUID_TO_BIN("${cursor.uuid}", true)`))
    }
    //in any case, order the tie breaker regarding the direction of the query
    query.orderBy(uuidField, (isInverted) ? 'ASC' : 'DESC');
  },
  /**
   * Generate the "where" clauses of the query that matches the wanted filtering, the "orberBy" clauses of the query that matches the wanted ordering, and the "where" regarding the last result, if any.
   * @param {Object} query A Knex Query Builder object
   * @param {Array} orderBy An array of filters to apply to the query, with format [{operator:OPERATOR<String>, field:FIELDNAME<String>, value:VALUE<Array>}]
   * @param {Array} filtering An array of filters to apply to the query, with format [{operator:OPERATOR<String>, field:FIELDNAME<String>, value:VALUE<Array>}]
   * @param {String} uuidField The name of the uuid field of the table (tie breaker)
   * @param {Object} cursor The cursor that have the uuid value in its "uuid" property, and the previous ordering values in its "lastOrderingValues" property, with format Object.SORT_FIELD_NAME = "LAST_VALUE"
   * @param {Boolean} isInverted Boolean that tells if the ordering must be inverted (backwards pagination) or not (forward pagination)
   */
  generateOrderAndFilterQuery: function(query, orderBy, filtering, uuidField, cursor, isInverted){
    Util.generateFilterQuery(query, filtering, uuidField, cursor);
    Util.generateOrderQuery(query, orderBy, uuidField, cursor, isInverted);
  }
}
module.exports = Util;