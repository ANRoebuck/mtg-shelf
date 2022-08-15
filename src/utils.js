export const pushToObjectOfArrays = (object, key, value) => {
  if (!object[key]) object[key] = [value];
  else object[key].push(value);
  return object;
}

export const incrementObjectOfNumbers = (object, key) => {
  if (!object[key]) object[key] = 1;
  else object[key] += 1;
  return object;
}

export const validateObjectProperties = (object, key, isValid) => {
  if (!object.hasOwnProperty(key)) object[key] = isValid;
  if (object[key] && !isValid) object[key] = isValid;
  return object;
}

export const nextInArray = (array: [], current: any) => {
  const i = array.indexOf(current);
  if (i === -1) return null;
  if (i === array.length - 1) return array[0];
  return array[i + 1];
};

export const mousePositionRelativeToContainer = (event: MouseEvent) => {
  const boundingRect = event.target.getBoundingClientRect();
  const x = event.clientX - boundingRect.left + event.target.scrollLeft;
  const y = event.clientY - boundingRect.top + event.target.scrollTop;
  return {
    x: Math.round(x),
    y: Math.round(y),
  };
};

export const randomSubSet = (superArray: [], size: number) => {
  let superSet = [...superArray];
  let subSet = [];
  for(let i = 0; i < size; i ++) {
    const randomIndex = randomIntBetween(0, superSet.length - 1);
    const randomEle = superSet.splice(randomIndex, 1);
    subSet.push(randomEle[0]);
  }
  return subSet;
}

const randomIntBetween = (min, max) => Math.floor(Math.random() * (max - min) + min);