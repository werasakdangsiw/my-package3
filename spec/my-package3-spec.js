'use babel';

import MyPackage3 from '../lib/my-package3';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('MyPackage3', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('my-package3');
  });

  describe('when the my-package3:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.my-package3')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'my-package3:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.my-package3')).toExist();

        let myPackage3Element = workspaceElement.querySelector('.my-package3');
        expect(myPackage3Element).toExist();

        let myPackage3Panel = atom.workspace.panelForItem(myPackage3Element);
        expect(myPackage3Panel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'my-package3:toggle');
        expect(myPackage3Panel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.my-package3')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'my-package3:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let myPackage3Element = workspaceElement.querySelector('.my-package3');
        expect(myPackage3Element).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'my-package3:toggle');
        expect(myPackage3Element).not.toBeVisible();
      });
    });
  });
});
