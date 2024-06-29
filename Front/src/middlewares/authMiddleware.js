import { checkTokenAndSetUser } from '@/middlewares/checkTokenAndSetUser';

export const authMiddleware = (to, from, next) => {
  const isAuthenticated = checkTokenAndSetUser();

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isAuthenticated) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
};
