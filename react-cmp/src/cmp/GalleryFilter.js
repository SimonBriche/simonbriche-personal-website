import { useEffect, useState, useCallback } from "react";
import { isBootstrapAvailable, isJQueryAvailable, randomBetween } from "../utils/Tools";

const GalleryFilter = (props) => {
  const bridge = props.bridgeEvent;
  const [seed, setSeed] = useState(null);
  const [searchFields, setSearchFields] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isFirstSearch, setIsFirstSearch] = useState(false);

  useEffect(() => {
    if(isBootstrapAvailable("5") && isJQueryAvailable("3")){
      (async () => {
        const query = `{
          portfolioSearchFields{
            clients, types
          }
        }`;
        const res = await (await fetch(`${process.env.REACT_APP_CDN_URL}/graphql?query=${encodeURIComponent(query)}`)).json();
        setSearchFields(res.data.portfolioSearchFields);
        window.$('.selectfilter').selectpicker();
      })().catch(e => {console.log('getSearchFields error', e)});
    }
    else{
      console.warn('Bootstrap 5 and jQuery 3 must be loaded to use GalleryFilter component');
    }
  }, []);

  const search = useCallback((afterCursor, newSeed) => {
    (async () => {
      setIsFirstSearch(true);
      setIsPending(true);
      const res = await fetchPortfolio(afterCursor, (newSeed || seed));
      const event = new CustomEvent("onGalleryTilesEvent", {
        detail: {
          tiles: res.tiles,
          after: res.after,
          hasNextPage: res.hasNextPage,
          isTilesAppended: !!afterCursor
        }
      });
      bridge.dispatchEvent(event);
      setIsPending(false);
      if(newSeed){
        setSeed(newSeed);
      }
    })().catch((e) => console.log(e));
  }, [bridge, seed]);

  useEffect(() => {
    const onShowMoreTilesHandler = (e) => {
      if(e.detail && e.detail.after){
        search(e.detail.after);
      }
      else{
        search(null, randomBetween(1, 1000));
      }
    }
    bridge.addEventListener("onShowMoreTilesEvent", onShowMoreTilesHandler);
    return () => {
      bridge.removeEventListener("onShowMoreTilesEvent", onShowMoreTilesHandler);
    }
  }, [bridge, search]);

  const onSearchHandler = () => {
    if(!isPending){
      search(null, randomBetween(1, 1000));
    }
  }

  const fetchPortfolio = (afterCursor, seed) => {
    return new Promise((resolve, reject) => {
      (async () => {
        const filtering = [];
        const clientsFiltering = window.$('#clients-search').val();
        const projectsFiltering = window.$('#projects-search').val();
        let ordering = `orderBy:{sort:RAND, direction:ASC, seed:"${seed}"}`;

        if(clientsFiltering.length > 0){
          filtering.push(`{field: "client", operator:IN, value:${JSON.stringify(clientsFiltering)}}`);
        }
        if(projectsFiltering.length > 0){
          filtering.push(`{field: "types", operator:IN, value:${JSON.stringify(projectsFiltering)}}`);
        }
        if(clientsFiltering.length > 0 || projectsFiltering.length > 0){
          ordering = `orderBy:{sort:CLIENT, direction:ASC}`;
        }

        const query = `{
          portfolio(
            first: 12
            ${ordering}
            ${afterCursor ? `after:"${afterCursor}"` : ''}
            ${filtering.length > 0 ? `filtering:[${filtering.join(',')}]` : ''}
          ){
            data{id, name, client, pitch, description, thumbnail, types, images, technology_ids},
            pageInfo{
              endCursor,
              hasNextPage
            }
          }
        }`;
        const res = await (await fetch(`${process.env.REACT_APP_CDN_URL}/graphql?query=${encodeURIComponent(query)}`)).json();
        if(res.data.portfolio.data){
          resolve({
            tiles: res.data.portfolio.data,
            after: (res.data.portfolio.pageInfo) ? res.data.portfolio.pageInfo.endCursor : null,
            hasNextPage: (res.data.portfolio.pageInfo) ? res.data.portfolio.pageInfo.hasNextPage : null
          });
        }
        else{
          reject(new Error(res.errors));
        }
      })().catch(reject);
    });
  }

  return ( 
    <>
      {searchFields ?
        <div id="gallery-filters" className="d-flex flex-column flex-sm-row justify-content-center">
          <select id="clients-search" className="selectfilter mb-3 mb-sm-0 mx-auto ms-sm-0 me-sm-3" data-style="btn-soft" data-none-selected-text="Tous les clients" data-actions-box="true" data-select-all-text="Cocher" data-deselect-all-text="Décocher" multiple>
            {searchFields.clients.map((client, index) => (
              <option key={`client-${index}`}>{client}</option>
            ))}
          </select>
          <select id="projects-search" className="selectfilter mb-3 mb-sm-0 mx-auto ms-sm-0 me-sm-3" data-style="btn-soft" data-none-selected-text="Tous les projets" data-actions-box="true" data-select-all-text="Cocher" data-deselect-all-text="Décocher" multiple>
            {searchFields.types.map((type, index) => (
              <option key={`type-${index}`}>{type}</option>
            ))}
          </select>
          {isFirstSearch &&
            <button onClick={onSearchHandler} className={`btn btn-custom btn-soft text-red ${isPending ? 'pending' : ''}`} disabled={isPending}>
              <span className="pending-spinner">
                <i className="fas fa-spinner fa-spin"></i>
              </span>
              <i className="fas fa-search"></i>
            </button>
          }
        </div>
        : <div className="cmp-loader"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>
      }
    </>
  );
}
 
export default GalleryFilter;