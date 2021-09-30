const getTypes = (...actions: (Function | string)[]) => actions.map(fn => fn.toString());

export default getTypes;
