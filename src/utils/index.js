const enterKey = e => e.keyCode === 13 || e.which === 13 || e.key === 13;
// eslint-disable-next-line import/prefer-default-export
export const onEnterKey = func => e => enterKey(e) && func(e);

const escKey = e => e.keyCode === 27 || e.which === 27 || e.key === 27;
// eslint-disable-next-line import/prefer-default-export
export const onEscKey = func => e => escKey(e) && func(e);
