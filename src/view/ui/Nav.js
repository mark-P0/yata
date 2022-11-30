import { InstanceIDs } from 'src/model/ids.js';
import BrandIcon from 'src/assets/icon.png';
import ListToggles, {
  ListToggleLabel,
  ListTogglesContainerID,
} from './ListToggles.js';
import { E } from '../__dom__.js';
import { Events } from 'src/controller/pubsub.js';

let attributes;

const NavBrand = E('img', {
  src: BrandIcon,
  class: 'navbar-brand m-0 filter-invert',
  alt: 'Brand icon',
});

const NavCollapseToggleID = InstanceIDs.generate('HTML');
attributes = {
  type: 'button',
  class: 'navbar-toggler',
  'data-bs-toggle': 'collapse',
  'data-bs-target': '#' + ListTogglesContainerID,
  'aria-controls': ListTogglesContainerID,
  'aria-expanded': false,
  'aria-label': 'Toggle navigation',
  id: NavCollapseToggleID,
};
const NavCollapseToggle = E('button', attributes, [
  E('span', { class: 'navbar-toggler-icon' }),
]);

const NavLabel = () => {
  const label = E('label', {
    class: 'flex-grow-1 text-truncate fs-smaller fw-semibold',
  });
  Events.UPDATE_LABEL_TEXT.subscribe((text) => {
    label.textContent = text;
  });

  return E('div', { class: 'w-100 d-flex pt-1 pb-3' }, [label]);
};

attributes = {
  class: 'navbar navbar-dark navbar-expand-sm bg-dark text-white p-3',
};
const Nav = E('nav', attributes, [
  NavBrand,
  ListToggleLabel(NavCollapseToggleID),
  NavCollapseToggle,
  ListToggles,
  NavLabel(),
]);

export default Nav;
