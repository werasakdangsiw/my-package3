'use babel';

import MyPackage3View from './my-package3-view';
import { CompositeDisposable } from 'atom';

export default {

  myPackage3View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.myPackage3View = new MyPackage3View(state.myPackage3ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.myPackage3View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'my-package3:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.myPackage3View.destroy();
  },

  serialize() {
    return {
      myPackage3ViewState: this.myPackage3View.serialize()
    };
  },

  toggle() {
    console.log('MyPackage3 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
