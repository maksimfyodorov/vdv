import { BehaviorSubject } from 'rxjs';

export class ButtonPositionChanger {
  public buttonsBlock;
  public navPanel;

  private readonly buttonBlockClassName;
  private readonly navPanelClassName;

  constructor(buttonBlockClassName, navPanelClassName) {
    this.buttonBlockClassName = buttonBlockClassName;
    this.navPanelClassName = navPanelClassName;
  }

  moveButtonBlockToTabPanel(): boolean {
    this.getButtonsBlock();
    this.getNavPanel();
    return this.setNewParentForButtonBlock();
  }

  getButtonsBlock(): void {
    this.buttonsBlock = document.getElementsByClassName(this.buttonBlockClassName)[0];
  }

  getNavPanel(): void {
    this.navPanel = document.getElementsByClassName(this.navPanelClassName)[0];
  }

  setNewParentForButtonBlock(): boolean {
    if (this.buttonsBlock && this.navPanel) {
      this.navPanel.appendChild(this.buttonsBlock);
      return true;
    } else {
      return false;
    }
  }

  deleteCurrentButtonBlock(): void {
    if (this.buttonsBlock) {
      this.buttonsBlock.remove();
    }
  }
}
