import jwt from 'jsonwebtoken';

/**
 * @class AuthService
 */
class AuthService {
  /**
   * Generate json web token
   * @method
   * @static
   * @memberof AuthService
   * @param {Object} user a User model instance
   * @param {String} rsaKey PEM encoded RSA private key
   * @param {String} expiresIn a time span e.g '20d', '2h'
   * @returns {Promise.string} promise that fulfills with
   * a json web token or rejects with an error
   */
  static generateToken(user, rsaKey, expiresIn = '30d') {
    return new Promise((resolve, reject) => {
      const options = {
        expiresIn,
        algorithm: 'RS256',
        issuer: 'PostItAPI',
        subject: user.email
      };
      const { username, status, email, phoneNo, photoURL } = user;
      const auth = { username, status, email, phoneNo, photoURL };
      return jwt.sign(auth, rsaKey, options,
      (err, token) => {
        return (err) ? reject(err) : resolve(token);
      });
    });
  }

  /**
   * Verify token's signature and get decoded payload
   * @method
   * @static
   * @memberof AuthService
   * @param {String} token JSON web token
   * @param {String} rsaKey PEM encoded RSA public key
   * @param {String} maxAge lifespan of token
   * @returns {Promise.object} promise that fulfills with
   * the decoded payload or rejects with an error
   */
  static verifyTokenGetPayload(token, rsaKey, maxAge = '30d') {
    return new Promise((resolve, reject) => {
      const options = {
        maxAge,
        algorithms: ['RS256'],
        issuer: 'PostItAPI',
      };
      jwt.verify(token, rsaKey, options, (err, decoded) => {
        return (err) ? reject(err) : resolve(decoded);
      });
    });
  }
}
export default AuthService;
