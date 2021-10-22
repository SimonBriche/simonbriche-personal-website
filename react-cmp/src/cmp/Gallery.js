import { useEffect, useState } from 'react';

function Gallery(props) {
  const bridge = props.bridgeEvent;
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    console.log('has mounted hey');
    (async () => {
      const query = `{paginatedPosts(last: 3){data{id, title, rate, type}, pageInfo {endCursor}}}`;
      const res = await (await fetch(`/graphql?query=${encodeURIComponent(query)}`)).json();
      console.log('fetch data', res.data.paginatedPosts.data);
      setPosts(res.data.paginatedPosts.data);
    })().catch(e => {console.log('fail to fetch', e)});
  }, []);
  
  const postClickHandler = (e, item) => {
    console.log('post clicked',e.target, item);
    const postEvent = new CustomEvent("openGalleryModal", {
      detail: item
    });
    bridge.dispatchEvent(postEvent);
  }
  
  return (
    <div className="gallery">
      {posts && posts.map(item => (
        <div className="post" onClick={(e) => postClickHandler(e, item)} key={item.id}>
          <h2>{item.title}</h2>
        </div>
      ))}
    </div>
  );
}
export default Gallery;
