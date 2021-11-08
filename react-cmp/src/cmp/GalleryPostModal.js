import { useEffect, useState, useRef } from "react";
import { isBootstrapAvailable, lazyLoadImages } from "../utils/Tools";

const GalleryPostModal = (props) => {
  const el = useRef(null);
  const bridge = props.bridgeEvent;
  const [modal, setModal] = useState(null);
  const [modalInfos, setModalInfos] = useState(null);
  const [technologies, setTechnologies] = useState(null);

  useEffect(() => {
    if(isBootstrapAvailable("5")){      
      setModal(new window.bootstrap.Modal(el.current,{
        keyboard: false,
        backdrop: false
      }));
    }
    else{
      console.warn('Bootstrap 5 must be loaded to use GalleryPostModal component');
    }
  }, []);

  useEffect(() => {
    //if bridge and modal are set
    if(bridge && modal){
      let allTechnologies;
      const getTechnologies = () => {
        if(!allTechnologies){
          allTechnologies = new Promise(function(resolve, reject){
            (async () => {
              const query = `{
                technologies{
                  data {id, name, link, thumbnail}
                }
              }`;
              const res = await (await fetch(`${process.env.REACT_APP_CDN_URL}/graphql?query=${encodeURIComponent(query)}`)).json();
              resolve(res.data.technologies.data);
            })().catch(reject);
          });
        }
        return allTechnologies;
      };
      bridge.addEventListener("openGalleryModal", (e) => {
        //populate the modal with the item infos
        setModalInfos(e.detail);
        //compute the technologies regarding the ist of IDs
        getTechnologies().then(technologies => {
          setTechnologies(e.detail.technology_ids.map(technologyId => technologies.find(item => item.id === technologyId)));
        })
        .catch(e => {console.log('fail to get technologies', e);})
        .finally(()=>{
          lazyLoadImages(el.current);
        });
        //show the modal and the close button
        modal.show();
        el.current.addEventListener('hidden.bs.modal', function (event) {
          setModalInfos(null);
        }, {once: true});
        document.querySelectorAll('.footer-interface').forEach(item => item.classList.toggle('open'));
      });
    }
  }, [bridge, modal]);

  return ( 
    <div id="modal-portfolio" className="modal modal-interface fade" tabIndex="-1" aria-labelledby="modalPortfolio" aria-hidden="true" ref={el}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            {modalInfos &&
              <div className="card portfolio-focus soft flat rounded border-0 mx-sm-auto">
                <img className="card-img-top rounded-top" src={`${process.env.REACT_APP_CDN_URL}/assets/images/gallery/${modalInfos.thumbnail}`} alt={modalInfos.name}/>
                <div className="card-body bg-white rounded-bottom">
                  <h2 className="card-title text-red">
                    <strong>{modalInfos.name}</strong>
                  </h2>
                  <h4>{modalInfos.client}</h4>
                  {modalInfos.pitch && 
                    <>
                      <h6 className="text-red mb-0">En résumé</h6>
                      <div className="card-text mb-3">{modalInfos.pitch}</div>
                    </>
                  }
                  {modalInfos.description &&
                    <>
                      <h6 className="text-red mb-0">Plus en détails</h6>
                      <div className="card-text mb-3" dangerouslySetInnerHTML={{__html:modalInfos.description}}></div>
                    </>
                  }
                  <div id="portfolio-carousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                      {modalInfos.images && modalInfos.images.map((image, index) => (
                        <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={`carousel-image-${index}`}>
                          <img className="d-block w-100 lazyload fade" data-src={`${process.env.REACT_APP_CDN_URL}/assets/images/gallery/${image}`} alt={`${modalInfos.client}-${index}`} loading="lazy"/>
                        </div>
                      ))}
                    </div>
                    {modalInfos.images && modalInfos.images.length > 0 &&
                      <div className="carousel-control-container">
                        <button className="carousel-control-prev carousel-control rounded-circle m-2" type="button" data-bs-target="#portfolio-carousel" data-bs-slide="prev">
                          <i className="fas fa-chevron-left text-red" aria-hidden="true"></i>
                          <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next carousel-control rounded-circle m-2" type="button" data-bs-target="#portfolio-carousel" data-bs-slide="next">
                          <i className="fas fa-chevron-right text-red" aria-hidden="true"></i>
                          <span className="visually-hidden">Next</span>
                        </button>
                      </div>
                    }
                  </div>
                  {modalInfos.types &&
                    <div className="tags">
                      <ul className="list-inline">
                        {modalInfos.types.map((type, index) => (
                          <li className="list-inline-item" key={`carousel-type-${index}`}>
                            <span className="badge bg-secondary rounded-pill">{type}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  }
                  {technologies &&
                    <div className="techno">
                      <i className="small">Built with</i>
                      <ul className="list-inline mb-0">
                        {technologies.map((technology, index) => (
                          <li className="list-inline-item" key={`carousel-technology-${index}`}>
                            <a href={technology.link} title={technology.name} target="_blank" rel="noopener">
                              <img className="stack-logo bg-white rounded-circle lazyload fade me-2 mb-2" data-src={`${process.env.REACT_APP_CDN_URL}/assets/images/stack/${technology.thumbnail}`} alt={`${technology.name}-${index}`} loading="lazy"/>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  }
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default GalleryPostModal;