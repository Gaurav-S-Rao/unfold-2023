import { BackgroundType } from '../types';


export const varBgKenburns = (props?: BackgroundType) => {
  const duration = props?.duration || 5;
  const ease = props?.ease || 'easeOut';

  return {
    top: {
      animate: {
        scale: [1, 1.25],
        y: [0, -15],
        transformOrigin: ['50% 16%', '50% top'],
        transition: { duration, ease },
      },
    },
    bottom: {
      animate: {
        scale: [1, 1.25],
        y: [0, 15],
        transformOrigin: ['50% 84%', '50% bottom'],
        transition: { duration, ease },
      },
    },
    left: {
      animate: {
        scale: [1, 1.25],
        x: [0, 20],
        y: [0, 15],
        transformOrigin: ['16% 50%', '0% left'],
        transition: { duration, ease },
      },
    },
    right: {
      animate: {
        scale: [1, 1.25],
        x: [0, -20],
        y: [0, -15],
        transformOrigin: ['84% 50%', '0% right'],
        transition: { duration, ease },
      },
    },
  };
};
