import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import PreloaderIcon, { ICON_TYPE } from 'react-preloader-icon';
import {
  getUsersWithMessageRead
} from '../../../../actions/actionCreators/GroupActions';

/**
 * Message component
 * @class
 * @extends React.Component
 */
class Message extends React.Component {
  /**
   * @constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.getUsersThatReadMessage =
    this.getUsersThatReadMessage.bind(this);
    this.displayUsersThatReadMessage =
    this.displayUsersThatReadMessage.bind(this);
  }

  /**
   * get users that have read message with messageId
   * @method getUsersThatReadMessage
   * @memberof Message
   * @param {string} messageId
   * @returns {function} event handler; handles mouse over
   * event on the element that displays the users
   */
  getUsersThatReadMessage(messageId) {
    return (event) => {
      event.preventDefault();
      const {
        getUsers,
        usersWithMessageRead
      } = this.props;
      if (!usersWithMessageRead[messageId]) {
        return getUsers(messageId);
      }
    };
  }

  /**
   * display all users that have read a message
   * @method displayUsersThatReadMessage
   * @memberof Message
   * @param {string} messageId
   * @returns {array} an array of all users that have
   * read a message with messageId
   */
  displayUsersThatReadMessage(messageId) {
    const {
      usersWithMessageRead,
      user
    } = this.props;
    const usersThatReadMessage = usersWithMessageRead[messageId];
    if (usersThatReadMessage) {
      if (usersThatReadMessage.length === 0) {
        return ['Oops! no one has read this message'];
      }
      const users = [];
      usersWithMessageRead[messageId]
      .forEach((username) => {
        if (username === user.username) {
          return users.unshift('@You ');
        }
        return users.push(`@${username} `);
      });
      return users;
    }
    return false;
  }

  /**
   * render component
   * @method render
   * @memberof Message
   * @returns {object} Component
   */
  render() {
    const {
      messageId,
      Author,
      priority,
      text,
      createdAt
    } = this.props;
    const matched = text.split(/<\/?p>/);
    const renderedComponent =
      this.displayUsersThatReadMessage(messageId) ?
        (<div>
          {this.displayUsersThatReadMessage(messageId)
          .map(user => (user))}
        </div>) :
        (<div className="users-load">
          <PreloaderIcon
            type={ICON_TYPE.OVAL}
            size={20}
            strokeWidth={8}
            strokeColor="#84e1e1"
            duration={800}
          />
        </div>);
    return (
      <div className="message-text">
        <a href=""><span className="author-name">{Author}</span></a>
        <span className="created-at">{createdAt}</span>
        <div className="priority-tag">
          <span>{priority}</span>
          <i className="fa fa-tags" aria-hidden="true" />
          <i
            className="fa fa-check-circle"
            onMouseOver={this.getUsersThatReadMessage(messageId)}
            data-tip=""
            data-for={messageId}
            data-place="top"
            data-class="extra"
            data-delay-hide="0"
          />
          <ReactTooltip
            id={messageId}
            type="dark"
            effect="float"
            getContent={[() => (renderedComponent), 2000]}
          />
        </div>
        {
          /* eslint-disable */
          (matched.length > 1) ?
          (
            <div
              dangerouslySetInnerHTML={{ __html: matched[1]}}
              className="message"
            />
          ) : (
            <div
              dangerouslySetInnerHTML={{ __html: matched[0]}}
              className="message"
            />
          )
        }
      </div>
    );
  }
}

Message.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    phoneNo: PropTypes.string,
    status: PropTypes.string
  }).isRequired,
  text: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  Author: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  messageId: PropTypes.string.isRequired,
  getUsers: PropTypes.func.isRequired,
  usersWithMessageRead: PropTypes.objectOf(PropTypes.array)
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  isAuthenticated: state.auth.isAuthenticated,
  usersWithMessageRead: state.usersWithMessageRead,
  user: state.auth.user
});

export default connect(mapStateToProps,
{ getUsers: getUsersWithMessageRead })(Message);

