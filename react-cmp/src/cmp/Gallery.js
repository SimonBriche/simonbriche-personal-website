import { useEffect, useState } from 'react';

function Gallery(props) {
  const bridge = props.bridgeEvent;
  const section = props.section;
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    (async () => {
      const query = `{
        portfolio(filtering:{field: "section", operator:EQUAL,value:"${section}"}){
          data{id, name, client, pitch, description, thumbnail, types, images, technology_ids}
        }
      }`;
      const res = await (await fetch(`/graphql?query=${encodeURIComponent(query)}`)).json();
      setPosts(res.data.portfolio.data);
    })().catch(e => {console.log('fail to fetch', e)});
  }, [section]);
  
  const postClickHandler = (e, item) => {
    const postEvent = new CustomEvent("openGalleryModal", {
      detail: item
    });
    bridge.dispatchEvent(postEvent);
  }

  return (
    <ul className="list-unstyled text-nowrap d-flex align-items-stretch">
      {posts && posts.map(item => (
        <li className="d-inline-block mb-3" key={item.id}>
          <div className="card gallery-item mt-3 mx-3 rounded border-0 shadow h-100" onClick={(e) => postClickHandler(e, item)}>
            <img className="card-img-top rounded-top" src={`${process.env.REACT_APP_CDN_URL}assets/images/gallery/${item.thumbnail}`} alt={item.name}/>
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
        </li>
      ))}
    </ul>
  );
}
export default Gallery;
