import chai from 'chai';
import createkeyPair from 'keypair';
import AuthService from '../../services/AuthService';

const expect = chai.expect;
const keyPair = createkeyPair({ bits: 512 });
const user = {
  email: 'testtoken@aol.com',
  username: 'postIt',
  status: 'admin'
};

describe('AuthService.generateToken', () => {
  it('should take user object and rsa key, and create token',
  () => {
    return AuthService.generateToken(user, keyPair.private)
    .then((token) => {
      // eslint-disable-next-line
      expect(token).to.be.a('string').that.is.not.empty;
    });
  });
});

describe('AuthService.verifyTokenGetPayload', () => {
  const promise = AuthService.generateToken(user, keyPair.private);
  it('should verify a jwt and return decoded payload', () => {
    return promise.then((token) => {
      return AuthService.verifyTokenGetPayload(token, keyPair.public)
      .then((decoded) => {
        expect(decoded).to.be.an('object');
        expect(decoded).to.have.property('username');
        expect(decoded).to.have.property('status');
        expect(decoded.iss).to.equal('PostItAPI');
        expect(decoded.username).to.equal(user.username);
      });
    });
  });
  it('should return an error if token is invalid', () => {
    return AuthService.verifyTokenGetPayload('token', keyPair.public)
    .catch((err) => {
      expect(err).to.have.property('name');
      expect(err).to.have.property('message');
      expect(err.name).to.equal('JsonWebTokenError');
      expect(err.message).to.equal('jwt malformed');
    });
  });
});
