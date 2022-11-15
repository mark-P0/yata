import { ListToggleData } from './ListToggles.js';
import { E, buildTree } from '../__dom__.js';
import { FormInput, FormLabel, FormLabelRequiredHint } from './Forms.js';
import { Events } from '../../controller/pubsub.js';
import { format } from '../../../node_modules/date-fns/esm/index.js';

const ModalContentHeader = (title) => {
  const heading = E('h1', { class: 'fw-semibold' }, title);
  const closer = E('button', {
    type: 'button',
    class: 'btn-close',
    'aria-label': 'Close modal',
    'data-bs-dismiss': 'modal',
  });

  return E('div', { class: 'modal-header' }, [heading, closer]);
};

const ModalContentBody = (elements) => {
  return E('div', { class: 'modal-body' }, elements);
};

const ModalContent = (toggleId, title, elements) => {
  const attributes = {
    class: 'modal-content',
    'data-for-toggle': toggleId,
  };
  const children = [ModalContentHeader(title), ModalContentBody(elements)];

  return E('div', attributes, children);
};

const NewTodoModalContentForm = (() => {
  const flavorText = 'Create a New Todo';
  const currentDate = format(new Date(), 'yyyy-LL-dd');

  /* prettier-ignore */
  const form = E('form', { method: 'dialog', class: 'vstack' }, [
    FormLabel('Title', [
      FormLabelRequiredHint,
      FormInput('title', { type: 'text', required: true }),
    ]),
    FormLabel('Description', [
      FormInput('description', { type: 'text' }),
    ]),
    FormLabel('Due Date', [
      FormInput('dueDate', { type: 'date', value: currentDate }),
    ]),
    FormLabel('Priority', [
      FormInput('priority', { type: 'number', value: '0', min: '0', max: '6' }),
    ]),
    E('button', 'Create', {
      type: 'submit',
      class: 'btn btn-dark mt-3',
      'aria-label': flavorText,
    }),
  ]);

  const modalContent = buildTree(
    ModalContent(ListToggleData.TODO_LIST.id, flavorText, [form])
  );
  const closerElement = modalContent.querySelector('.btn-close');
  const formElement = modalContent.querySelector('form');

  formElement.addEventListener('submit', () => {
    const formData = new FormData(formElement);
    const todoProps = Object.fromEntries(formData);

    Events.CREATE_TODO.publish(todoProps);
    closerElement.click();
    formElement.reset();
  });

  return modalContent;
})();

export { NewTodoModalContentForm };
