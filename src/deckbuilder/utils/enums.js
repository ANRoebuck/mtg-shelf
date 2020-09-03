import resources from '../resources/index';

export const face = {
  FRONT: 0,
  BACK: 1,
}

export const sortBy = {
  cmc: 'cmc',
  colour: 'colour',
  type: 'type',
}
export const sortIcons = {
  [sortBy.cmc]: resources.optionSortCmc,
  [sortBy.colour]: resources.optionSortColour,
  [sortBy.type]: resources.optionSortType,
}

export const splitBy = {
  none: 'none',
  spells: 'spells',
}
export const splitIcons = {
  [splitBy.none]: resources.optionGroupCombined,
  [splitBy.spells]: resources.optionGroupSplit,
}

export const viewBy = {
  images: 'images',
  printable: 'printable',
  stats: 'stats',
}
export const viewIcons = {
  [viewBy.images]: resources.optionViewCards,
  [viewBy.printable]: resources.optionViewList,
  [viewBy.stats]: resources.optionViewStats
}

