export const within = (num, minNum, maxNum) => {
  return Math.min(Math.max(num, minNum), maxNum);
};

export const toSignedNumber = (num, zeroPrefix = '') => {
  let str = String(num);
  if (num === 0) {
    str = zeroPrefix + str;
  } else if (num > 0) {
    str = '+' + str;
  }
  return str;
};

export const preventDefaultEvent = (event) => {
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;  // For IE
  }
};

export const preventEvents = (event) => {
  preventDefaultEvent(event);
  event.stopPropagation();
};

/*
 * Create class-based resources
 *
 * Mainly use this when you define the game data from JSON
 *
 * TODO: I want to set function.name
 *
 * @param {Function} BaseResource
 * @param {Array<object>} sourceDataList
 * @return {Array<Function>} - Sub class list
 */
export const createClassBasedResourceList = (BaseResource, sourceDataList) => {
  return sourceDataList.map(({ constants = {}, properties = {} }) => {
    class Resource extends BaseResource {
      constructor(...args) {
        super(...args);
        Object.assign(this, properties);
      }
    };
    Object.assign(Resource, constants);
    return Resource;
  });
};
