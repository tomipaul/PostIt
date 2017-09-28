import React from 'react';
import { mount } from 'enzyme';
import UploadPictureModal from
'../../components/presentation/Modals/UploadPictureModal';

jest.mock('../../components/container/ShowPreloader');
const setup = () => {
  const props = {
    updateProfilePicture: jest.fn()
  };
  const enzymeWrapper = mount(<UploadPictureModal {...props} />);
  return {
    props,
    enzymeWrapper
  };
};

describe('components', () => {
  describe('UploadPictureModal component', () => {
    const { enzymeWrapper, props } = setup();
    it('should render self and subcomponents', () => {
      expect(enzymeWrapper.exists()).toBe(true);
      expect(enzymeWrapper.find('#user1').exists()).toBe(true);
    });

    it('should trigger file select when button is clicked', () => {
      enzymeWrapper.instance().fileinput.click = jest.fn();
      enzymeWrapper.update();
      enzymeWrapper.find('.upload').simulate('click');
      expect(enzymeWrapper.instance().fileinput.click).toBeCalled();
    });

    it('should set state when file input changes', () => {
      enzymeWrapper.find('#upload-input').simulate('change', {
        target: { files: [{ name: 'upload.jpg' }] }
      });
      expect(enzymeWrapper.state('filename'))
      .toEqual('upload.jpg');
    });

    it('should render subcomponent that dislays name of selected file',
    () => {
      expect(enzymeWrapper.find('.selected-file-intro').exists()).toBe(true);
      expect(enzymeWrapper.find('.fileName').exists()).toBe(true);
    });

    it('should call updateProfilePicture when upload button is clicked',
    () => {
      enzymeWrapper.find('a.btn-flat').simulate('click');
      expect(props.updateProfilePicture.mock.calls.length).toBe(1);
    });
  });
});

