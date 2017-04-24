import { browser, by, element } from 'protractor';

import { Header } from './header';
import { ModelEditForm } from './ModelEditForm';
import { FormsForModals } from './FormsForModals';
import { ModelInfo } from './ModelInfo';
import { NodeList } from './NodeList';
import { TwigletFilters } from './TwigletFilters';
import { TwigletGraph } from './twigletGraph';
import { TwigletModel } from './twigletModel';
import { User } from './user';

export class TwigPage {
  header = new Header();
  formForModals = new FormsForModals();
  modelInfo = new ModelInfo();
  modelEditForm = new ModelEditForm();
  nodeList = new NodeList();
  twigletFilters = new TwigletFilters();
  user = new User();
  twigletGraph = new TwigletGraph();
  twigletModel = new TwigletModel();

  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
