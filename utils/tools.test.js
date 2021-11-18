const v8 = require('v8');
const {logger} = require('./log');
const tools = require('./tools');

describe('parseKeys', () => {
  const refObject = {
    "number": 1,
    "numberAsString": "1",
    "string": "hey",
    "array": [1, 2, 3],
    "arrayAsString": JSON.stringify([1, 2, 3]),
    "object": {"val1":"var1", "val2":"var2"},
    "objectAsString": JSON.stringify({"val1":"var1", "val2":"var2"})
  };

  it('parse only specific properties of the object', () => {
    const objectToBeParsed = JSON.parse(JSON.stringify(refObject));
    tools.parseKeys(objectToBeParsed,["arrayAsString"]);
    expect(objectToBeParsed.arrayAsString).toEqual(expect.arrayContaining([1, 2, 3]));
    expect(objectToBeParsed.objectAsString).toEqual(expect.any(String));
  });
  it('doesn‘t parse any property if no keys are provided', () => {
    const objectToBeParsed = JSON.parse(JSON.stringify(refObject));
    tools.parseKeys(objectToBeParsed);
    expect(objectToBeParsed.arrayAsString).toEqual(JSON.stringify([1, 2, 3]));
  });
  it('parse an array of objects', () => {
    const objectToBeParsed_1 = JSON.parse(JSON.stringify(refObject));
    const objectToBeParsed_2 = JSON.parse(JSON.stringify(refObject));
    tools.parseKeys([objectToBeParsed_1, objectToBeParsed_2], ["arrayAsString"]);

    expect(objectToBeParsed_1.arrayAsString).toEqual(expect.arrayContaining([1, 2, 3]));
    expect(objectToBeParsed_2.arrayAsString).toEqual(expect.arrayContaining([1, 2, 3]));
  });
  it('ignores a non-parsable value', () => {
    const objectToBeParsed = JSON.parse(JSON.stringify(refObject));
    tools.parseKeys(objectToBeParsed, ["array"]);
    expect(objectToBeParsed.array).toEqual(expect.any(Array));
  });
});

describe('randomBetween', () => {
  it('should be between 3 and 10', () => {
    const randomValue = tools.randomBetween(3, 10);
    expect(randomValue).toBeGreaterThanOrEqual(3);
    expect(randomValue).toBeLessThanOrEqual(10);
  });
  const randomValues = [];
  randomValues.push([undefined, undefined]);
  randomValues.push([NaN, undefined]);
  randomValues.push([NaN, NaN]);
  randomValues.push([3, NaN]);
  randomValues.push([NaN, 3]);
  randomValues.push(["a string", undefined]);
  randomValues.push(["a string", "another string"]);
  test.each(randomValues)('should return NaN with invalid values : %s and %s', (a, b) => {
    expect(tools.randomBetween(a, b)).toBeNaN();
  });
});

describe('randomString', () => {
  it('should have the wanted length', () => {
    expect(tools.randomString(10)).toHaveLength(10);
  });
  it('should be a empty string if no valid length is provided', () => {
    expect(tools.randomString()).toHaveLength(0);
    expect(tools.randomString('')).toHaveLength(0);
    expect(tools.randomString(0)).toHaveLength(0);
    expect(tools.randomString(NaN)).toHaveLength(0);
    expect(tools.randomString(false)).toHaveLength(0);
  });
});

describe('safeUndefined', () => {
  const expected = {'nullValue': null, 'undefinedValue': undefined};
  it('should not contain undefined values', () => {
    expect({'undefinedValue': undefined}).toEqual(expect.not.objectContaining(tools.safeUndefined(expected)));
  });
  it('should should replace undefined values by null values', () => {
    expect(tools.safeUndefined(expected).undefinedValue).toBeNull();
  });
});

describe('isObjectLiteral', () => {
  const litteralObjects = [
    {},
    {"var": "val"},
    new Object(),
    Object.assign({}),
    v8.deserialize(v8.serialize({"var" : "val"}))
  ];
  test.each(litteralObjects)('%s should be a litteral object', (obj) => {
    expect(tools.isObjectLiteral(obj)).toBeTruthy();
  });

  function CustomObject(prop){
    this.prop = prop;
    this.toString = function(){
      return `CustomObject with prop ${this.prop}`;
    }
  };
  const nonLitteralObjects = [
    null,
    undefined,
    Infinity,
    new Date(),
    true,
    new RegExp(/loof/g),
    5,
    "5",
    [],
    console,
    function(){console.log('I‘m a function')},
    new CustomObject("myProp")
  ];
  test.each(nonLitteralObjects)('%s shouldn‘t be a litteral object', (obj) => {
    expect(tools.isObjectLiteral(obj)).toBeFalsy();
  });
});

describe('cloneObject', () => {
  it('shouldn‘t update the target', () => {
    const target = {a:"val", b: [1, 2, 3], c:{a:"val", b: [1, 2, 3]}};
    const clone = tools.cloneObject(target);
    clone.a = "newval";
    clone.b.push(4);
    clone.c.a = "newval";
    clone.c.b.push(4);
    
    expect(target.a).toEqual('val');
    expect(target.b).toEqual([1, 2, 3]);
    expect(target.c.a).toEqual('val');
    expect(target.c.b).toEqual([1, 2, 3]);

    expect(clone.a).toEqual('newval');
    expect(clone.b).toEqual([1, 2, 3, 4]);
    expect(clone.c.a).toEqual('newval');
    expect(clone.c.b).toEqual([1, 2, 3, 4]);
  });
  it('should set undefined object properties or array elements that are Functions', () => {
    const target = {
      a:()=>{console.log('in object !');}, 
      b:[()=>{console.log('in array !');}], 
      c:[{
        d:()=>{console.log('in obj in array !');}
      }]
    };
    const clone = tools.cloneObject(target);

    expect(clone.a).toBeUndefined();
    expect(clone.b[0]).toBeUndefined();
    expect(clone.c[0].d).toBeUndefined();
  });
  it('should preserve Date objects', () => {
    const target = {a:new Date(2021, 1, 1)};
    const clone = tools.cloneObject(target);
    expect(clone.a.getFullYear()).toEqual(2021);
  });
});

describe('mergeObjects', () => {
  it('should have properties of both objects', () => {
    const target = {"var1":"val1"};
    const source = {"var2":"val2"};
    expect(tools.mergeObjects(target, source)).toEqual(expect.objectContaining({"var1":"val1", "var2":"val2"}));
  });
  it('should override the properties of the target object', () => {
    const target = {"var1":"val1"};
    const source = {"var1":"newval1"};
    expect(tools.mergeObjects(target, source).var1).toEqual("newval1");
  });
  it('shouldn‘t mutate the target and source object if noMutation is required', () => {
    const target = {"var1":"val1"};
    const source = {"var2":"val2", "var3":[1,2,3]};
    const merged = tools.mergeObjects(target, source, true);
    merged.var3.push(4);

    expect(target.var2).toBeUndefined();
    expect(source.var3).toEqual([1, 2, 3]);
  });
  it('should override the whole object if isDeepClone isn‘t required', () => {
    const target = {a: {
      b: 'val1'
    }};
    const source = {a: {
      c: 'val2'
    }};
    const merged = tools.mergeObjects(target, source, true);

    expect(merged.a.b).toBeUndefined();
    expect(merged.a.c).toEqual('val2');
  });
  it('should add the nested properties of source to target if isDeepClone is required', () => {
    const target = {a: {
      b: 'val1'
    }};
    const source = {a: {
      c: 'val2',
      d: 'val3',
    }};
    const merged = tools.mergeObjects(target, source, true, true);

    expect(merged.a.b).toEqual('val1');
    expect(merged.a.c).toEqual('val2');
    expect(merged.a.d).toEqual('val3');
  });
  it('should should replace the whole array if isMergingArrays isn‘t required', () => {
    const target = {a: [1, 2 ,3]};
    const source = {a: [4, 5]};
    const merged = tools.mergeObjects(target, source, true, true, false);

    expect(merged.a).toEqual([4, 5]);
  });
  it('should only replace the array‘s items if isMergingArrays is required', () => {
    const target = {a: [1, 2 ,3]};
    const source = {a: [4, 5]};
    const merged = tools.mergeObjects(target, source, true, true, true);

    expect(merged.a).toEqual([4, 5, 3]);
  });
  it('should replace the whole array‘s items if isMergingArrays is required and source.length >= target.length', () => {
    const target = {a: [1, 2 ,3]};
    const source = {a: [4, 5, 6, 7, 8]};
    const merged = tools.mergeObjects(target, source, true, true, true);

    expect(merged.a).toEqual([4, 5, 6, 7, 8]);
  });
});

describe('pingURL', () => {
  it('schedule a ping in specific number of seconds', (done) => {
    const spy = jest.spyOn(global, 'setTimeout');
    const delay = 5000;

    tools.pingURL("", delay, undefined, function(err, timeoutId){
      clearTimeout(timeoutId);
      // At this point in time, there should have been a single call to setTimeout to schedule the next ping in delay seconds.
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), delay);
      spy.mockRestore();
      done();
    });
  });
  it('stops scheduling after specific number of failures', (done) => {
    const delay = 10;
    const retries = 2;
    const callback = jest.fn();
    const pingCallback = function(err, timeoutId){
      callback();
      if(err && err.message === 'too_many_fails'){
        //callback have been called the first schedule + the number of retries
        expect(callback).toHaveBeenCalledTimes((retries+1));
        done();
      }
    };

    tools.pingURL("", delay, retries, pingCallback);
  });
});