import jwt from 'jsonwebtoken';
const secret = process.env.SECRET;

export default function authorize(roles = []) {
  // roles param can be a single role string (e.g. Role.User or 'User')
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    (req, res, next) => {
      // authenticate JWT token and attach user to request object (req.user)
      const token = req.headers['authorization']?.replace(
        'Bearer ',
        '',
      );
      if (!token)
        return res.status(401).send({ message: 'Pas autorisé !' });

      let decoded;
      try {
        decoded = jwt.verify(token, secret);
      } catch (e) {
        return res.status(400).send({
          message: 'JWT Expired',
        });
      }

      if (!decoded || !decoded.id)
        return res.status(401).send({ message: 'Token mal formé !' });
      res.locals.id = decoded.id;
      next();
    },

    // authorize based on user role
    (req, res, next) => {
      if (roles.length && !roles.includes(req.user.type)) {
        // user's role is not authorized
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // authentication and authorization successful
      next();
    },
  ];
}
