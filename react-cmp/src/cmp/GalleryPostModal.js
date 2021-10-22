import { useEffect, useState } from "react";
import { isBootstrapAvailable } from "../utils/Tools";

const GalleryPostModal = (props) => {
  const bridge = props.bridgeEvent;
  const [modal, setModal] = useState(null);
  const [modalInfos, setModalInfos] = useState(null);
  
  bridge.addEventListener("openGalleryModal", (e) =>{
    setModalInfos(e.detail);
    if(modal){
      modal.show();
    }
  });
  useEffect(() => {
    if(isBootstrapAvailable("5")){      
      setModal(new window.bootstrap.Modal(document.getElementById('post-gallery-modal')));
    }
    else{
      console.warn('Bootstrap 5 must be loaded to use GalleryPostModal component');
    }
  }, []);
  
  return ( 
    <div id="post-gallery-modal" className="modal fade">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{modalInfos && modalInfos.title}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default GalleryPostModal;