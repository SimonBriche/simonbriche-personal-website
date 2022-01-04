import { useEffect, useState, useRef } from 'react';
import { lazyLoadImages } from "../utils/Tools";

const GalleryTiles = (props) => {
  const el = useRef(null);
  const bridge = props.bridgeEvent;
  const [galleryTiles, setGalleryTiles] = useState(null);
  const [showMore, setShowMore] = useState(null);
  const [afterCursor, setAfterCursor] = useState(null);

  const postClickHandler = (e, item) => {
    const postEvent = new CustomEvent("openGalleryModal", {
      detail: item
    });
    bridge.dispatchEvent(postEvent);
  }

  const showMoreHandler = (afterCursor) => {
    const moreEvent = new CustomEvent("onShowMoreTilesEvent", {
      detail: {
        after: afterCursor
      }
    });
    bridge.dispatchEvent(moreEvent);
  }

  const scrollToFilters = () => {
    const target = window.pageYOffset + document.getElementById('gallery-filters').getBoundingClientRect().top - 20;
    window.scrollTo(0, target);
  }
  
  useEffect(() => {
    const onGalleryTilesHandler = (e) => {
      setGalleryTiles(prevTiles => ((e.detail.isTilesAppended) ? prevTiles.concat(e.detail.tiles) : e.detail.tiles));
      setShowMore(e.detail.hasNextPage);
      setAfterCursor(e.detail.after);
      lazyLoadImages(el.current);
    }
    bridge.addEventListener("onGalleryTilesEvent", onGalleryTilesHandler);
    return () => {
      bridge.removeEventListener("onGalleryTilesEvent", onGalleryTilesHandler);
    }
  }, [bridge]);

  return (
    <div className="gallery-container container-fluid">
      <div className="row justify-content-center" ref={el}>
        {galleryTiles ? 
          galleryTiles.length > 0 ? 
            galleryTiles.map(item => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3" key={item.id}>
                <div className="card gallery-item noselect mt-3 mx-auto rounded border-0 shadow h-100" onClick={(e) => postClickHandler(e, item)}>
                  <img className="card-img-top rounded-top lazyload fade" data-src={`${process.env.REACT_APP_CDN_URL}/assets/images/gallery/${item.thumbnail}`} alt={item.name} loading="lazy"/>
                  <div className="card-body text-start rounded-bottom pb-0">
                    <ul className="list-unstyled text-wrap">
                      <li>
                        <h5 className="mb-0">
                          <small>client: </small>
                          <span className="text-red">{item.client}</span>
                        </h5>
                      </li>
                      <li>
                        <small>name: </small>
                        <strong>{item.name}</strong>
                      </li>
                      <li>
                        <small>types: </small>
                        <span>{item.types.join(', ')}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              ))
            : <div className="col-12 text-center">
                <div className="soft d-inline-block my-2 p-3 rounded">Z...zut ! Aucune réalisation ne correspond à cette recherche 😅</div>
              </div>
          : <div className="col-12 text-center">
              <button onClick={() => showMoreHandler()} className="btn btn-custom btn-soft">Lancez une première recherche 🔍</button>
            </div>
        }
      </div>
      <div className="text-center mt-3">
        {galleryTiles && galleryTiles.length > 0 &&
          <button onClick={scrollToFilters} className="btn btn-custom btn-soft m-3">Retour au filtres</button>
        }
        {showMore &&
          <button onClick={() => showMoreHandler(afterCursor)} className="btn btn-custom btn-soft m-3">Plus de projets</button>
        }
      </div>
    </div>
  );
}
 
export default GalleryTiles;