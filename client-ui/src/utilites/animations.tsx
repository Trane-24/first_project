export const textAnimation = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: (custom: number)=> ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.2}
  })
};

export const textAnimationRight = {
  hidden: {
    x: 100,
    opacity: 0,
  },
  visible: (custom: number)=> ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.2}
  })
};

export const textAnimationTop = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: (custom: number)=> ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.2}
  })
};

export const ItemAnimation = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: (custom: number)=> ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.2}
  })
}