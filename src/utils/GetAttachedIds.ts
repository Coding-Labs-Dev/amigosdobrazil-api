type GetAttachedIds = (
  ids: Array<number>,
  oldIds: Array<number>,
) => { newIds: Array<number>; removedIds: Array<number> };

const getAttachedIds: GetAttachedIds = (ids, oldIds) => {
  const newIds = ids.filter(id => !oldIds.includes(id));
  const removedIds = oldIds.filter(id => !ids.includes(id));
  return { newIds, removedIds };
};

export default getAttachedIds;
