const { parse, simplify } = require('graphql-parse-resolve-info');
const PortfolioModel = require('../../models/portfolio');

const resolvers = {
  Query: {
    portfolioItem: (root, args, context, info) => {
      const {fields} = simplify(parse(info), info.returnType);
      const requestedFields = Object.keys(fields).filter(key => Object.keys(fields[key].fieldsByTypeName).length === 0);

      return PortfolioModel.get(args.id, requestedFields);
    },
    portfolio: async (root, args, context, info) => {
      const {fields} = simplify(parse(info), info.returnType);
      
      let requestedFields;
      if(fields.data){
        const portfolioFields = fields.data.fieldsByTypeName.PortfolioItem;
        if(portfolioFields){
          requestedFields = Object.keys(portfolioFields).filter(key => Object.keys(portfolioFields[key].fieldsByTypeName).length === 0);
        }
      }
      const portfolioData = await PortfolioModel.getByCursor(null, requestedFields, args);
      const portfolioTotalCount = (fields.totalCount) ? await PortfolioModel.getCount(args.filtering) : undefined;
      return {
        totalCount: portfolioTotalCount,
        data: portfolioData.data,
        pageInfo: portfolioData.pageInfo
      }
    },
    technologies: async (root, args, context, info) => {
      const {fields} = simplify(parse(info), info.returnType);
      
      let requestedFields;
      if(fields.data){
        const technologyFields = fields.data.fieldsByTypeName.Technology;
        if(technologyFields){
          requestedFields = Object.keys(technologyFields).filter(key => Object.keys(technologyFields[key].fieldsByTypeName).length === 0);
        }
      }
      const technologiesData = await PortfolioModel.getTechnologies(requestedFields);
      return {
        data: technologiesData,
        totalCount: technologiesData.length
      }
    },
  }
}

module.exports = resolvers