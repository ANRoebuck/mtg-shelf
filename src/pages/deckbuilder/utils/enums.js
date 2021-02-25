import resources from '../resources';

export const face = {
  FRONT: 0,
  BACK: 1,
}

export const rowsBy = {
  none: 'none',
  creatures: 'creatures',
}
export const rowIcons = {
  [rowsBy.none]: resources.optionGroupCombined,
  [rowsBy.creatures]: resources.optionGroupSplit,
}

export const columnsBy = {
  cmc: 'cmc',
  colour: 'colour',
  type: 'type',
}
export const columnIcons = {
  [columnsBy.cmc]: resources.optionSortCmc,
  [columnsBy.colour]: resources.optionSortColour,
  [columnsBy.type]: resources.optionSortType,
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

export const assignLandPositionBy = {
  default: 'default',
  bottom: 'bottom',
}
export const landPositionIcons = {
  [assignLandPositionBy.bottom]: resources.optionPositionBottom,
  [assignLandPositionBy.default]: resources.optionPositionDefault,
}
