const TestComponent = (props) => {
  console.log('props', props);
  const bridge = props.bridgeEvent;
  bridge.addEventListener("myEvent", function(e){
    console.log('e', e.detail);
  });
  bridge.addEventListener("myPrivateEvent", function(e){
    
    console.log('e private', e.detail);
  });
  return ( 
    <div>
      Je suis le component test
    </div>
  );
}
 
export default TestComponent;